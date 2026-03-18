"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

export default function HomeTestimonials({ testimonials }) {
    if (!testimonials || testimonials.length === 0) return null;

    return (
        <section className="py-24 px-4 bg-law-cream">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="section-label">Client Stories</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-law-text mt-3 mb-4" style={{ fontFamily: 'var(--font-cormorant)' }}>
                        What Our Clients Say
                    </h2>
                    <div className="divider-gold divider-gold-center" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.slice(0, 3).map((t) => (
                        <div
                            key={t._id}
                            className="bg-white border border-law-cream-dark p-8 relative hover:border-law-gold transition-all duration-300 hover:shadow-lg"
                        >
                            <FaQuoteLeft className="text-law-gold/20 absolute top-6 right-6" size={36} />
                            <div className="flex mb-3">
                                {[...Array(t.rating || 5)].map((_, i) => (
                                    <FaStar key={i} className="text-law-gold mr-0.5" size={13} />
                                ))}
                            </div>
                            <p className="text-law-text text-sm italic leading-relaxed mb-6" style={{ fontFamily: 'var(--font-inter)' }}>
                                &ldquo;{t.quote}&rdquo;
                            </p>
                            <div className="flex items-center gap-3 border-t border-law-cream-dark pt-4">
                                <div className="w-10 h-10 rounded-full bg-law-navy/10 flex items-center justify-center shrink-0 relative overflow-hidden">
                                    {t.avatar
                                        ? <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="40px" />
                                        : <span className="font-bold text-law-navy" style={{ fontFamily: 'var(--font-cormorant)' }}>{t.name[0]}</span>
                                    }
                                </div>
                                <div>
                                    <p className="text-law-text font-bold text-sm" style={{ fontFamily: 'var(--font-cormorant)' }}>{t.name}</p>
                                    <p className="text-law-gold text-xs" style={{ fontFamily: 'var(--font-inter)' }}>{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Link href="/testimonials" className="btn-primary inline-block">
                        Read More Testimonials
                    </Link>
                </div>
            </div>
        </section>
    );
}
