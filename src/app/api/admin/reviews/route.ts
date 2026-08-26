import { db } from "@/db";
import { reviews } from "@/db/schema";
import { verifyAdminRequest } from "@/utils/auth";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

async function isAdmin(request?: Request) {
  return !!(await verifyAdminRequest(request));
}

// GET: Fetch all reviews
export async function GET(request: Request) {
  try {
    const list = await db.select()
      .from(reviews)
      .orderBy(desc(reviews.id)); // Newest first

    return NextResponse.json({ success: true, data: list });
  } catch (error: any) {
    console.error("Fetch Reviews Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to fetch reviews" }, { status: 500 });
  }
}

// POST: Add a new review
export async function POST(request: Request) {
  if (!await isAdmin(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { userName, rating, comment, designation } = body;

    if (!userName || !comment) {
      return NextResponse.json({ success: false, error: "User Name and Comment are required" }, { status: 400 });
    }

    const newReview = await db.insert(reviews).values({
      userName,
      rating: Number(rating) || 5,
      comment,
      designation: designation || "Verified Buyer",
    }).returning();

    return NextResponse.json({ success: true, data: newReview[0] });
  } catch (error: any) {
    console.error("Add Review Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to add review" }, { status: 500 });
  }
}

// DELETE: Remove a review
export async function DELETE(request: Request) {
  if (!await isAdmin(request)) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Review ID is required" }, { status: 400 });
    }

    await db.delete(reviews).where(eq(reviews.id, Number(id)));

    return NextResponse.json({ success: true, message: "Review deleted successfully" });
  } catch (error: any) {
    console.error("Delete Review Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to delete review" }, { status: 500 });
  }
}
