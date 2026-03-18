"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/utils/api';
import { FaGavel, FaArrowRight, FaCalendarAlt } from 'react-icons/fa';
import SharedHero from './SharedHero';

export default function BlogClient() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await api.get('/blogs');
                setBlogs(res.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh] bg-law-cream">
                <div className="w-12 h-12 border-2 border-law-navy border-t-law-gold rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-law-cream min-h-screen">
            <SharedHero 
                label="Knowledge & Insights" 
                title="Our Blogs"
            >
                <div className="flex justify-center items-center gap-2 mt-6 text-white/80 text-sm font-medium tracking-wide" style={{ fontFamily: 'var(--font-inter)' }}>
                    <Link href="/" className="hover:text-law-gold transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-law-gold">Blogs</span>
                </div>
            </SharedHero>

            {/* Blog List */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    {blogs.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 bg-law-navy/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaGavel className="text-law-gold" size={32} />
                            </div>
                            <h2 className="text-3xl font-bold text-law-text mb-4" style={{ fontFamily: 'var(--font-cormorant)' }}>
                                Articles Coming Soon
                            </h2>
                            <p className="text-law-muted text-sm leading-relaxed max-w-2xl mx-auto mb-8" style={{ fontFamily: 'var(--font-inter)' }}>
                                Our attorneys are preparing insightful articles on legal developments, landmark judgments, and practical legal guides. Check back soon.
                            </p>
                            <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                                Subscribe for Updates <FaArrowRight size={12} />
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((blog) => (
                                <Link
                                    href={`/blog/${blog.slug}`}
                                    key={blog._id}
                                    className="group bg-white border border-law-cream-dark hover:border-law-gold transition-all duration-300 hover:shadow-xl flex flex-col h-full"
                                >
                                    {blog.image ? (
                                        <div className="h-48 overflow-hidden relative">
                                            <img
                                                src={blog.image}
                                                alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-law-navy/60 to-transparent" />
                                        </div>
                                    ) : (
                                        <div className="h-48 bg-law-navy border-b border-law-gold flex items-center justify-center relative overflow-hidden">
                                            <FaGavel className="text-law-gold/20 absolute -right-4 -bottom-4" size={100} />
                                            <span className="text-law-gold font-bold text-2xl" style={{ fontFamily: 'var(--font-cormorant)' }}>ASTROXADV</span>
                                        </div>
                                    )}
                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex items-center gap-2 text-law-muted text-xs font-semibold tracking-wider uppercase mb-3" style={{ fontFamily: 'var(--font-inter)' }}>
                                            <FaCalendarAlt className="text-law-gold" size={12} />
                                            {new Date(blog.createdAt).toLocaleDateString()}
                                        </div>
                                        <h2 className="text-2xl font-bold text-law-text group-hover:text-law-navy transition-colors mb-4 line-clamp-2" style={{ fontFamily: 'var(--font-cormorant)' }}>
                                            {blog.title}
                                        </h2>
                                        <div
                                            className="text-law-muted text-sm leading-relaxed flex-grow mb-6 line-clamp-3"
                                            style={{ fontFamily: 'var(--font-inter)' }}
                                            dangerouslySetInnerHTML={{ __html: blog.content.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...' }}
                                        />
                                        <div className="flex items-center gap-2 text-law-gold text-xs font-semibold tracking-wider uppercase group-hover:gap-3 transition-all" style={{ fontFamily: 'var(--font-inter)' }}>
                                            Read Article <FaArrowRight size={10} />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
