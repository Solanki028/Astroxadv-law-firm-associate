"use client";
import { useEffect, useState } from 'react';
import api from '@/utils/api';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

import SharedHero from './SharedHero';

export default function TestimonialsClient() {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await api.get('/testimonials');
                setTestimonials(res.data);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh] bg-law-cream">
                <div className="w-12 h-12 border-2 border-law-navy border-t-law-gold rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-law-cream">
            <SharedHero 
                label="Our Clients Speak" 
                title="Client Testimonials" 
                description="The trust our clients place in us is our greatest achievement. Hear from those we have had the privilege to represent." 
            />

            {/* Testimonials Grid */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    {testimonials.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-law-muted text-lg italic" style={{ fontFamily: 'var(--font-cormorant)' }}>More testimonials coming soon.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {testimonials.map((t) => (
                                <div
                                    key={t._id}
                                    className="bg-white border border-law-cream-dark hover:border-law-gold transition-all duration-300 hover:shadow-lg p-8 relative flex flex-col"
                                >
                                    <FaQuoteLeft className="text-law-gold/15 absolute top-6 right-6" size={40} />

                                    {/* Stars */}
                                    <div className="flex mb-4">
                                        {[...Array(t.rating || 5)].map((_, i) => (
                                            <FaStar key={i} className="text-law-gold mr-0.5" size={13} />
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <p className="text-law-text text-sm italic leading-relaxed flex-grow mb-8" style={{ fontFamily: 'var(--font-inter)' }}>
                                        &ldquo;{t.quote}&rdquo;
                                    </p>

                                    {/* Author */}
                                    <div className="flex items-center gap-3 border-t border-law-cream-dark pt-6">
                                        <div className="w-11 h-11 rounded-full bg-law-navy flex items-center justify-center shrink-0 border border-law-border">
                                            {t.avatar
                                                ? <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                                                : <span className="text-law-gold font-bold text-lg" style={{ fontFamily: 'var(--font-cormorant)' }}>{t.name[0]}</span>
                                            }
                                        </div>
                                        <div>
                                            <p className="text-law-text font-bold text-base" style={{ fontFamily: 'var(--font-cormorant)' }}>{t.name}</p>
                                            <p className="text-law-gold text-xs tracking-wider" style={{ fontFamily: 'var(--font-inter)' }}>{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Strip */}
            <section className="bg-law-gold py-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-law-navy mb-3" style={{ fontFamily: 'var(--font-cormorant)' }}>
                        Ready to Join Our List of Satisfied Clients?
                    </h2>
                    <p className="text-law-navy/70 text-sm mb-6" style={{ fontFamily: 'var(--font-inter)' }}>
                        Schedule a free confidential consultation with one of our senior attorneys today.
                    </p>
                    <a href="/contact"
                        className="inline-block px-8 py-3 bg-law-navy text-law-gold font-semibold text-xs tracking-widest uppercase border border-law-navy hover:bg-transparent hover:text-law-navy transition-all"
                        style={{ fontFamily: 'var(--font-inter)' }}
                    >
                        Book a Consultation
                    </a>
                </div>
            </section>
        </div>
    );
}
