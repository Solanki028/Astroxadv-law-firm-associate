"use client";
import { useEffect, useState } from 'react';
import api from '@/utils/api';
import { FaBalanceScale, FaGavel, FaHandshake, FaShieldAlt, FaBuilding, FaUsers, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';

const ICONS = [FaBalanceScale, FaGavel, FaHandshake, FaShieldAlt, FaBuilding, FaUsers];

export default function AboutClient() {
    const [aboutUs, setAboutUs] = useState({ text: '', images: [] });
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usRes = await api.get('/content/about_us');
                if (usRes.data && usRes.data.content) {
                    const data = typeof usRes.data.content === 'string'
                        ? { text: usRes.data.content, images: [] }
                        : { ...usRes.data.content };
                    if (data.image && (!data.images || data.images.length === 0)) data.images = [data.image];
                    if (!data.images) data.images = [];
                    data.images = data.images.filter(img => img && img.trim() !== '');
                    setAboutUs(data);
                }
            } catch (error) {
                console.error('Error fetching about content:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (aboutUs.images?.length > 1) {
            const interval = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % aboutUs.images.length);
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [aboutUs.images]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh] bg-law-cream">
                <div className="w-12 h-12 border-2 border-law-navy border-t-law-gold rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-law-cream">
            {/* Page Hero */}
            <section className="relative py-32 px-4 overflow-hidden border-b border-law-gold/20">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('https://plus.unsplash.com/premium_photo-1661542759930-9cf315dae451?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 max-w-4xl mx-auto text-center mt-12">
                    <span className="text-law-gold font-bold tracking-widest uppercase text-xs" style={{ fontFamily: 'var(--font-inter)' }}>Who We Are</span>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-4" style={{ fontFamily: 'var(--font-cormorant)' }}>
                        About Astroxadv
                    </h1>
                    <div className="divider-gold divider-gold-center" />
                    {/* <p className="text-law-light text-sm leading-relaxed max-w-2xl mx-auto mt-6" style={{ fontFamily: 'var(--font-inter)' }}>
                        A trusted name in legal advocacy — delivering justice with integrity, commitment, and expertise for over two decades.
                    </p> */}
                </div>
            </section>

            {/* Firm Story */}
            <section className="py-24 px-4 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    {/* Image */}
                    <div className="relative h-[500px] bg-law-navy overflow-hidden">
                        {aboutUs.images?.length > 0 ? (
                            <>
                                {aboutUs.images.map((img, index) => (
                                    <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                                        <Image src={img} alt={`About ${index + 1}`} fill className="object-cover" />
                                    </div>
                                ))}
                                {aboutUs.images.length > 1 && (
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                                        {aboutUs.images.map((_, i) => (
                                            <button key={i} onClick={() => setCurrentSlide(i)}
                                                className={`h-1 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-law-gold' : 'w-3 bg-white/40'}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-law-navy to-law-navy-mid">
                                <FaBalanceScale className="text-law-gold/20" size={100} />
                            </div>
                        )}
                        <div className="absolute inset-4 border border-law-gold/30 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-law-gold" />
                    </div>

                    {/* Text */}
                    <div>
                        <span className="section-label">Our Story</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-law-text mt-3 mb-4" style={{ fontFamily: 'var(--font-cormorant)' }}>
                            Dedicated to Legal Excellence
                        </h2>
                        <div className="divider-gold" />
                        <div
                            className="text-law-muted text-sm leading-relaxed mt-6 prose max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: aboutUs.text || `<p>Astroxadv was founded on the principle that every client deserves exceptional legal representation. Our firm has grown from a boutique practice into a comprehensive legal institution recognized for its strategic thinking and ethical practice.</p><p style="margin-top:1rem;">Our team of seasoned advocates, solicitors, and legal researchers work together seamlessly to deliver outcomes that protect your rights and advance your interests.</p>`
                            }}
                            style={{ fontFamily: 'var(--font-inter)' }}
                        />
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 px-4 bg-law-cream">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-law-navy p-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-law-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 border border-law-gold/40 flex items-center justify-center mb-6">
                                    <FaGavel className="text-law-gold" size={18} />
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-cormorant)' }}>Our Mission</h3>
                                <div className="divider-gold mb-4" />
                                <p className="text-law-light text-sm leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                                    To provide accessible, high-quality legal representation to every client — safeguarding their rights and ensuring justice is delivered with speed, precision, and integrity.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white border border-law-cream-dark p-10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-law-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="relative z-10">
                                <div className="w-12 h-12 border border-law-gold/40 flex items-center justify-center mb-6">
                                    <FaBalanceScale className="text-law-gold" size={18} />
                                </div>
                                <h3 className="text-3xl font-bold text-law-text mb-4" style={{ fontFamily: 'var(--font-cormorant)' }}>Our Vision</h3>
                                <div className="divider-gold mb-4" />
                                <p className="text-law-muted text-sm leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                                    To be the most trusted law firm in the region — a beacon of ethical practice, legal innovation, and client-centered advocacy that sets the standard for the legal profession.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-law-gold py-12 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { value: '2005', label: 'Year Founded' },
                        { value: '500+', label: 'Cases Won' },
                        { value: '1200+', label: 'Clients Served' },
                        { value: '15+', label: 'Expert Attorneys' },
                    ].map(stat => (
                        <div key={stat.label} className="text-center">
                            <p className="text-4xl font-bold text-law-navy" style={{ fontFamily: 'var(--font-cormorant)' }}>{stat.value}</p>
                            <p className="text-law-navy/70 text-xs font-semibold tracking-widest uppercase mt-1" style={{ fontFamily: 'var(--font-inter)' }}>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
