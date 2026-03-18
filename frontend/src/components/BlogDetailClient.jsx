"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import api from '@/utils/api';
import Link from 'next/link';
import { FaCalendarAlt, FaArrowLeft, FaLinkedin, FaTwitter, FaLink } from 'react-icons/fa';
import SharedHero from './SharedHero';

export default function BlogDetailClient() {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [latestBlogs, setLatestBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [blogRes, allBlogsRes] = await Promise.all([
                    api.get(`/blogs/${slug}`),
                    api.get('/blogs')
                ]);
                setBlog(blogRes.data);
                if (allBlogsRes.data) {
                    const recent = allBlogsRes.data.filter(b => b.slug !== slug).slice(0, 3);
                    setLatestBlogs(recent);
                }
            } catch (error) {
                console.error('Error fetching blog details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchData();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[80vh] bg-law-cream">
                <div className="w-12 h-12 border-2 border-law-navy border-t-law-gold rounded-full animate-spin" />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="flex flex-col justify-center items-center h-[80vh] bg-law-cream text-law-text">
                <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-cormorant)' }}>Article Not Found</h1>
                <Link href="/blog" className="text-law-gold font-semibold uppercase tracking-wider hover:underline flex items-center gap-2">
                    <FaArrowLeft /> Back to Insights
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-law-cream min-h-screen pb-24">
            <SharedHero 
                label="Knowledge & Insights" 
                title="Our Blogs"
            >
                <div className="flex justify-center items-center gap-2 mt-6 text-white/80 text-sm font-medium tracking-wide" style={{ fontFamily: 'var(--font-inter)' }}>
                    <Link href="/" className="hover:text-law-gold transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/blog" className="hover:text-law-gold transition-colors">Blogs</Link>
                    <span>/</span>
                    <span className="text-law-gold truncate max-w-[200px]">{blog.slug}</span>
                </div>
            </SharedHero>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Left Area: Blog Article Content */}
                <div className="lg:col-span-8">
                    {/* Article Heading */}
                    <h1 className="text-3xl md:text-5xl font-bold text-law-text leading-tight mb-6" style={{ fontFamily: 'var(--font-cormorant)' }}>
                        {blog.title}
                    </h1>
                    <div className="flex items-center gap-6 text-law-muted text-sm tracking-wide font-medium mb-10 border-b border-law-border/50 pb-6" style={{ fontFamily: 'var(--font-inter)' }}>
                        <span className="flex items-center gap-2 border-r border-law-gold/30 pr-6 uppercase tracking-widest text-xs">
                            <FaCalendarAlt className="text-law-gold" />
                            {new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <span className="uppercase tracking-widest text-law-gold text-xs">
                            Est. Reading Time: 4 mins
                        </span>
                    </div>

                    {/* Featured Image */}
                    {blog.image && (
                        <div className="w-full aspect-[21/9] mb-12 shadow-md overflow-hidden bg-law-navy border border-law-border/20">
                            <img 
                                src={blog.image} 
                                alt={blog.title} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Article Body */}
                    <article className="prose prose-lg max-w-none text-law-muted leading-loose
                            prose-headings:font-bold prose-headings:text-law-navy prose-headings:font-['var(--font-cormorant)'] prose-headings:mb-6 prose-headings:mt-10
                            prose-p:font-['var(--font-inter)'] prose-p:mb-6
                            prose-a:text-law-gold prose-a:no-underline hover:prose-a:underline
                            prose-blockquote:border-l-4 prose-blockquote:border-law-gold prose-blockquote:bg-law-navy/5 prose-blockquote:p-6 prose-blockquote:italic prose-blockquote:text-law-navy
                            prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
                            prose-li:mb-2"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    {/* Footer Actions */}
                    <div className="mt-16 flex flex-col md:flex-row justify-between items-center border-t border-b border-law-border/50 py-8 bg-white px-8 shadow-sm">
                        <div className="text-law-navy font-bold text-xl mb-6 md:mb-0" style={{ fontFamily: 'var(--font-cormorant)' }}>
                            Share This Article
                        </div>
                        <div className="flex gap-4">
                            <button className="w-10 h-10 rounded-full bg-law-navy text-white flex items-center justify-center hover:bg-law-gold transition-colors">
                                <FaLinkedin size={18} />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-law-navy text-white flex items-center justify-center hover:bg-law-gold transition-colors">
                                <FaTwitter size={18} />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-law-navy text-white flex items-center justify-center hover:bg-law-gold transition-colors">
                                <FaLink size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Area: Sidebar */}
                <aside className="lg:col-span-4 space-y-12">
                    {/* Tags Widget */}
                    <div className="bg-white border border-law-cream-dark p-8 shadow-sm">
                        <h3 className="text-2xl font-bold text-law-navy mb-6 pb-4 border-b border-law-gold/30" style={{ fontFamily: 'var(--font-cormorant)' }}>
                            Categories
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {['Corporate Law', 'Litigation', 'Intellectual Property', 'Real Estate', 'Criminal Defense'].map(tag => (
                                <span key={tag} className="px-3 py-1 bg-law-gold/10 text-law-gold text-xs font-bold tracking-wider uppercase rounded-sm border border-law-gold/20 cursor-pointer hover:bg-law-gold hover:text-white transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Latest Posts Widget */}
                    {latestBlogs.length > 0 && (
                        <div className="bg-white border border-law-cream-dark p-8 shadow-sm">
                            <h3 className="text-2xl font-bold text-law-navy mb-6 pb-4 border-b border-law-gold/30" style={{ fontFamily: 'var(--font-cormorant)' }}>
                                Latest Posts
                            </h3>
                            <div className="flex flex-col gap-6">
                                {latestBlogs.map((lb) => (
                                    <Link href={`/blog/${lb.slug}`} key={lb._id} className="group flex gap-4 items-center">
                                        <div className="w-20 h-20 rounded-sm overflow-hidden shrink-0 bg-law-navy relative border border-law-border/20">
                                            {lb.image ? (
                                                <img src={lb.image} alt={lb.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            ) : (
                                                <FaCalendarAlt className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-law-gold/50" size={24} />
                                            )}
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h4 className="text-sm font-bold text-law-text group-hover:text-law-gold leading-snug line-clamp-2 transition-colors" style={{ fontFamily: 'var(--font-cormorant)' }}>
                                                {lb.title}
                                            </h4>
                                            <span className="text-xs text-law-muted mt-2 font-semibold uppercase tracking-widest" style={{ fontFamily: 'var(--font-inter)' }}>
                                                {new Date(lb.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </aside>
            </main>
        </div>
    );
}
