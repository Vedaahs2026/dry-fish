import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import Razorpay from "razorpay";
import { db } from "@/db";
import { orders, orderItems, users, cartItems } from "@/db/schema";
import { getVerifiedPhoneFromCookie } from "@/db/auth-helper";
import { eq } from "drizzle-orm";
import { validateAndCalculateCoupon } from "@/utils/coupon";

let razorpayInstance: Razorpay | null = null;

function getRazorpayClient() {
  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY || "dummy_key",
      key_secret: process.env.RAZORPAY_API_SECRET || "dummy_secret",
    });
  }
  return razorpayInstance;
}

export async function POST(req: Request) {
  try {
    const { items, shippingAddress, couponCode } = await req.json();
    const phoneNumber = await getVerifiedPhoneFromCookie("auth_session");

    if (!phoneNumber) {
      return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
    }

    // Find user
    const userRows = await db.select().from(users).where(eq(users.phoneNumber, phoneNumber)).limit(1);
    if (!userRows.length) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }
    const user = userRows[0];

    // Validate Coupon securely if provided
    let discountAmount = 0;
    if (couponCode) {
      const couponValidation = await validateAndCalculateCoupon(couponCode, items, user.id);
      if (!couponValidation.valid) {
        return NextResponse.json({ success: false, error: couponValidation.error || "Invalid coupon" }, { status: 400 });
      }
      discountAmount = couponValidation.discountAmount;
    }

    // Recalculate subtotal and final expected amount securely
    const subtotal = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
    const expectedTotal = Math.max(0, subtotal - discountAmount);

    if (expectedTotal <= 0) {
      return NextResponse.json({ success: false, error: "Invalid order total amount" }, { status: 400 });
    }

    const directOrderId = `direct_${Date.now()}`;

    // Save order in database with status 'pending' and paymentStatus: 'paid'
    const [newOrder] = await db.insert(orders).values({
      userId: user.id,
      totalAmount: expectedTotal,
      status: "pending",
      shippingAddress: shippingAddress,
      couponCode: couponCode || null,
      discountAmount: discountAmount || 0,
      razorpayOrderId: directOrderId,
      paymentStatus: "paid",
      createdAt: new Date().toISOString(),
    }).returning();

    // Insert order items
    for (const item of items) {
      await db.insert(orderItems).values({
        orderId: newOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
        color: item.color,
        customizations: JSON.stringify(item.customizations),
      });
    }

    // Also update saved addresses on user profile if address is provided
    if (shippingAddress) {
      let addresses: string[] = [];
      if (user.address) {
        try {
          addresses = JSON.parse(user.address);
          if (!Array.isArray(addresses)) addresses = [user.address];
        } catch {
          addresses = [user.address];
        }
      }
      if (!addresses.includes(shippingAddress)) {
        addresses.push(shippingAddress);
        await db.update(users)
          .set({ address: JSON.stringify(addresses) })
          .where(eq(users.id, user.id));
      }
    }
    
    // Clear cart items for the user who placed this order
    await db.delete(cartItems).where(eq(cartItems.userId, user.id));

    return NextResponse.json({
      success: true,
      direct: true,
      dbOrderId: newOrder.id,
    });
  } catch (error: any) {
    console.error("Razorpay Order Endpoint Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
