"use client";

import { useState, useEffect } from "react";
import { Loader2, Plus, Trash2, Star, Check, AlertCircle, MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";

interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  designation: string | null;
  createdAt: string | null;
}

export default function AdminReviewsPage() {
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Form State
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [designation, setDesignation] = useState("Verified Buyer");

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/admin/reviews");
      const data = await res.json();
      if (data.success) {
        setReviews(data.data || []);
      } else {
        setError(data.error || "Failed to load reviews");
      }
    } catch (err) {
      setError("An unexpected error occurred while loading reviews.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !comment.trim()) return;

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, rating, comment, designation }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess("Review added successfully!");
        setUserName("");
        setComment("");
        setRating(5);
        setDesignation("Verified Buyer");
        fetchReviews();
        router.refresh();
      } else {
        setError(data.error || "Failed to add review.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = async (id: number) => {
    if (!confirm("Are you sure you want to delete this review?")) return;

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("Review deleted successfully!");
        fetchReviews();
        router.refresh();
      } else {
        setError(data.error || "Failed to delete review.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 text-[#C5A059] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-10">
      <div className="mb-10 text-center flex flex-col items-center">
        <h1 className="text-4xl font-playfair font-bold text-black">Customer Reviews</h1>
        <p className="mt-2 text-black/60 font-medium tracking-tight flex items-center justify-center">
          <MessageSquare size={16} className="text-[#C5A059] mr-2" />
          Manage reviews displayed on the website homepage.
        </p>
      </div>

      {/* Alerts */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-100 rounded-xl flex items-center space-x-3 text-green-600 animate-in fade-in">
          <Check size={20} />
          <span className="text-sm font-bold uppercase tracking-wider">{success}</span>
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center space-x-3 text-red-500 animate-in fade-in">
          <AlertCircle size={20} />
          <span className="text-sm font-bold uppercase tracking-wider">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Form Column */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-brand/5">
            <h2 className="text-xl font-playfair font-bold text-black mb-6 border-b border-brand/5 pb-4">Add Customer Review</h2>
            
            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-black/40 uppercase tracking-[0.2em] mb-2 ml-1">Customer Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full bg-brand/5 border border-transparent focus:border-[#C5A059]/50 rounded-2xl px-5 py-3.5 text-xs font-semibold text-black outline-none transition-all placeholder:text-black/20"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-black/40 uppercase tracking-[0.2em] mb-2 ml-1">Designation / Subtext</label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="e.g. Verified Buyer"
                  className="w-full bg-brand/5 border border-transparent focus:border-[#C5A059]/50 rounded-2xl px-5 py-3.5 text-xs font-semibold text-black outline-none transition-all placeholder:text-black/20"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-black/40 uppercase tracking-[0.2em] mb-2 ml-1">Rating</label>
                <div className="flex items-center gap-1.5 ml-1 my-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-black hover:scale-110 transition-transform"
                    >
                      <Star
                        size={20}
                        className={star <= rating ? "fill-[#C5A059] text-[#C5A059]" : "text-black/20"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-black/40 uppercase tracking-[0.2em] mb-2 ml-1">Customer Feedback / Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Paste the customer review comment here..."
                  rows={4}
                  className="w-full bg-brand/5 border border-transparent focus:border-[#C5A059]/50 rounded-2xl px-5 py-3.5 text-xs font-semibold text-black outline-none transition-all placeholder:text-black/20 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 bg-[#8c6239] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#734f2d] transition-all shadow-lg disabled:opacity-50 mt-2"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Plus size={16} />
                )}
                <span>Save Review</span>
              </button>
            </form>
          </div>
        </div>

        {/* List Column */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-brand/5">
            <h2 className="text-xl font-playfair font-bold text-black mb-6 border-b border-brand/5 pb-4">Configured Reviews ({reviews.length})</h2>

            {reviews.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-brand/10 rounded-[2rem] text-black/30">
                <MessageSquare className="mx-auto mb-4 text-black/20 animate-bounce" size={40} />
                <p className="text-sm font-bold uppercase tracking-widest">No customer reviews configured yet</p>
                <p className="text-xs mt-2 text-black/40">Use the form on the left to add your first customer review.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map((review) => (
                  <div key={review.id} className="p-6 bg-brand/5 border border-brand/5 rounded-3xl flex flex-col justify-between relative group hover:bg-brand/10 transition-colors">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="text-sm font-bold text-black">{review.userName}</h4>
                          {review.designation && (
                            <p className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest mt-0.5">{review.designation}</p>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteReview(review.id)}
                          className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors md:opacity-0 md:group-hover:opacity-100"
                          title="Delete Review"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-0.5 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < review.rating ? "fill-[#C5A059] text-[#C5A059]" : "text-black/10"}
                          />
                        ))}
                      </div>

                      <p className="text-xs text-black/75 italic leading-relaxed">
                        "{review.comment}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
