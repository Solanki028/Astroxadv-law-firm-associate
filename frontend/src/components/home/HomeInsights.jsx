"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';

export default function HomeInsights({ blogs }) {
    if (!blogs || blogs.length === 0) return null;

    return (
        <section className="py-24 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <span className="section-label">Legal Insights</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-law-text mt-3" style={{ fontFamily: 'var(--font-cormorant)' }}>
                            Latest From Our Desk
                        </h2>
                        <div className="divider-gold mt-4" />
                    </div>
                    <Link href="/blog" className="btn-outline-dark hidden md:inline-flex">
                        View All Articles
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Featured Post (Left, 7 columns) */}
                    {blogs[0] && (
                        <Link href={`/blog/${blogs[0].slug}`} className="lg:col-span-7 group relative h-[500px] overflow-hidden bg-law-navy flex shadow-xl">
                            <Image
                                src={blogs[0].image || 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80'}
                                alt={blogs[0].title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 1024px) 100vw, 60vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-law-navy via-law-navy/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white z-10 w-full xl:w-5/6 pointer-events-none">
                                <div className="flex items-center gap-3 text-law-gold text-xs font-bold tracking-widest uppercase mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                                    <span>Featured</span>
                                    <span className="w-1 h-1 bg-law-gold rounded-full" />
                                    <span>{new Date(blogs[0].createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                </div>
                                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight group-hover:text-law-gold transition-colors" style={{ fontFamily: 'var(--font-cormorant)' }}>
                                    {blogs[0].title}
                                </h3>
                                <div className="text-white/80 line-clamp-2 md:line-clamp-3 text-sm leading-relaxed mb-8 font-light" style={{ fontFamily: 'var(--font-inter)' }} dangerouslySetInnerHTML={{ __html: blogs[0].content.replace(/<[^>]*>?/gm, '').substring(0, 180) + '...' }} />
                                <span className="inline-flex items-center gap-2 text-law-gold text-xs font-bold uppercase tracking-wider group-hover:gap-4 transition-all" style={{ fontFamily: 'var(--font-inter)' }}>
                                    Read Full Article <FaArrowRight size={10} />
                                </span>
                            </div>
                        </Link>
                    )}

                    {/* Secondary Posts Stack (Right, 5 columns) */}
                    <div className="lg:col-span-5 flex flex-col gap-8">
                        {blogs.slice(1, 3).map((blog) => (
                            <Link href={`/blog/${blog.slug}`} key={blog._id} className="group flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-6 h-full bg-law-cream border border-law-cream-dark p-6 hover:border-law-gold hover:shadow-xl transition-all duration-300">
                                {blog.image && (
                                    <div className="w-full sm:w-1/3 lg:w-full xl:w-2/5 aspect-[4/3] shrink-0 overflow-hidden relative shadow-md">
                                        <Image 
                                            src={blog.image} 
                                            alt={blog.title} 
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 30vw"
                                            className="object-cover group-hover:scale-110 transition-transform duration-700" 
                                        />
                                    </div>
                                )}
                                <div className="flex flex-col justify-center flex-grow py-2">
                                    <div className="text-law-muted text-xs font-semibold tracking-wider uppercase mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-inter)' }}>
                                        <span className="w-4 h-[1px] bg-law-gold"></span>
                                        {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                    <h3 className="text-xl font-bold text-law-text group-hover:text-law-navy leading-snug mb-4 line-clamp-3" style={{ fontFamily: 'var(--font-cormorant)' }}>
                                        {blog.title}
                                    </h3>
                                    <span className="inline-flex items-center gap-2 text-law-gold text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all mt-auto" style={{ fontFamily: 'var(--font-inter)' }}>
                                        Read Entry <FaArrowRight size={10} />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-12 md:hidden">
                    <Link href="/blog" className="btn-outline inline-block">
                        View All Articles
                    </Link>
                </div>
            </div>
        </section>
    );
}
