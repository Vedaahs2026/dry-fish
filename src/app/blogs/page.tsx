"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, Calendar, User, FileText, ArrowRight } from "lucide-react";

interface Blog {
  id: number;
  title: string;
  slug: string;
  summary: string;
  coverImage: string;
  publishedAt: string;
  author: string;
}

export default function BlogsPage() {
  const [blogsList, setBlogsList] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        if (data.success) {
          setBlogsList(data.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-48 w-full">
        <Loader2 className="animate-spin text-[#8c6239] mb-4" size={48} strokeWidth={1.5} />
        <p className="text-black/40 font-black uppercase tracking-[0.3em] text-[10px]">Loading our stories...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF6ED] text-[#3b2314] font-sans selection:bg-[#8c6239]/20 pb-24">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-12 border-b border-[#8c6239]/10">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h1 className="text-3xl md:text-5xl font-serif font-black text-[#8c6239] leading-tight">
            Our Blog &amp; Recipes
          </h1>
          <p className="text-xs md:text-sm text-black/60 font-medium leading-relaxed">
            Discover traditional dry fish recipes, culinary tips, and stories directly from the Godavari coastal kitchens.
          </p>
        </div>
      </section>

      {/* Blogs Listings Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {blogsList.length === 0 ? (
          <div className="py-24 text-center bg-white rounded-[3rem] border border-[#8c6239]/10 shadow-sm max-w-xl mx-auto px-8 space-y-4">
            <div className="w-16 h-16 bg-[#8c6239]/5 rounded-full flex items-center justify-center mx-auto text-[#8c6239]">
              <FileText size={28} />
            </div>
            <h3 className="text-xl font-serif font-black text-black">New Stories Coming Soon</h3>
            <p className="text-black/60 leading-relaxed text-xs max-w-sm mx-auto">
              We are currently preparing authentic recipes and articles. Please check back shortly!
            </p>
            <Link 
              href="/" 
              className="inline-block px-8 py-3.5 bg-[#8c6239] hover:bg-[#734f2d] text-[#FAF6ED] rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all shadow-md active:scale-95"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogsList.map((blog) => (
              <article
                key={blog.id}
                className="bg-white rounded-[2rem] border border-[#8c6239]/15 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                <Link href={`/blogs/${blog.slug}`} className="aspect-[16/10] w-full bg-brand/5 relative overflow-hidden block">
                  <img
                    src={blog.coverImage || "/images/placeholder.png"}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/placeholder.png";
                    }}
                  />
                </Link>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-4 text-[10px] font-black text-black/40 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <User size={12} className="text-[#8c6239]" />
                        {blog.author}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-[#8c6239]" />
                        {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </span>
                    </div>
                    
                    <Link href={`/blogs/${blog.slug}`} className="block">
                      <h2 className="text-lg font-serif font-black text-[#3b2314] hover:text-[#8c6239] transition-colors leading-tight line-clamp-2">
                        {blog.title}
                      </h2>
                    </Link>
                    
                    <p className="text-xs text-black/65 font-medium leading-relaxed line-clamp-3">
                      {blog.summary}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-brand/5">
                    <Link 
                      href={`/blogs/${blog.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-[#8c6239] group-hover:text-[#734f2d] hover:underline"
                    >
                      <span>Read Story</span>
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

    </main>
  );
}
