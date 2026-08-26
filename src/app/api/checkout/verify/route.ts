import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/db";
import { orders, cartItems } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = await req.json();

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json(
        { success: false, error: "Missing required verification parameters" },
        { status: 400 }
      );
    }

    // Cryptographic signature verification
    const secret = process.env.RAZORPAY_API_SECRET!;
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (generatedSignature !== razorpaySignature) {
      return NextResponse.json(
        { success: false, error: "Signature verification failed" },
        { status: 400 }
      );
    }

    // Retrieve order in db
    const orderRows = await db
      .select()
      .from(orders)
      .where(eq(orders.razorpayOrderId, razorpayOrderId))
      .limit(1);

    if (!orderRows.length) {
      return NextResponse.json(
        { success: false, error: "Order not found in local system" },
        { status: 404 }
      );
    }
    const order = orderRows[0];

    // Update order status to 'pending' (placed, awaiting admin confirmation) and paymentStatus to 'paid'
    await db
      .update(orders)
      .set({
        status: "pending",
        paymentStatus: "paid",
        razorpayPaymentId: razorpayPaymentId,
        razorpaySignature: razorpaySignature,
      })
      .where(eq(orders.id, order.id));

    // Clear cart items for the user who placed this order
    if (order.userId) {
      await db.delete(cartItems).where(eq(cartItems.userId, order.userId));
    }

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error: any) {
    console.error("Razorpay Verification Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal verification error" },
      { status: 500 }
    );
  }
}
