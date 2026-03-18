"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRight, FaBuilding, FaGavel, FaShieldAlt, FaHandshake } from 'react-icons/fa';

export default function HomePracticeAreas({ services }) {
    return (
        <section className="py-24 px-4 bg-law-cream">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="section-label">What We Do</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-law-text mt-3 mb-4" style={{ fontFamily: 'var(--font-cormorant)' }}>
                        Our Practice Areas
                    </h2>
                    <div className="divider-gold divider-gold-center" />
                    <p className="text-law-muted text-base max-w-2xl mx-auto mt-6" style={{ fontFamily: 'var(--font-inter)' }}>
                        We provide comprehensive legal services across a wide range of disciplines, delivering specialized expertise for every legal need.
                    </p>
                </div>

                {services.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.slice(0, 3).map((service) => (
                            <Link
                                href={`/${service.slug}`}
                                key={service._id}
                                className="group relative h-[350px] overflow-hidden bg-law-navy flex shadow-lg border border-law-border/20"
                            >
                                {/* Vertical Ribbon */}
                                <div className="w-16 h-full bg-law-gold flex items-center justify-center shrink-0 z-20 relative shadow-[4px_0_15px_rgba(0,0,0,0.1)] transition-transform duration-500 overflow-hidden">
                                    <div className="absolute top-0 right-0 w-0 h-0 border-t-[10px] border-l-[10px] border-t-law-gold-light border-l-transparent transform translate-x-full"></div>
                                    <div className="transition-all duration-500 transform group-hover:translate-y-[200%] group-hover:opacity-0 flex items-center justify-center h-full">
                                        <h3
                                            className="text-white font-bold text-lg whitespace-nowrap tracking-wider uppercase"
                                            style={{
                                                writingMode: 'vertical-rl',
                                                transform: 'rotate(180deg)',
                                                fontFamily: 'var(--font-inter)'
                                            }}
                                        >
                                            {service.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Image Section */}
                                <div className="relative flex-grow h-full overflow-hidden">
                                    <Image 
                                        src={service.heroImage || 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800'} 
                                        alt={service.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-law-navy/30 group-hover:bg-law-navy/80 transition-colors duration-500 pointer-events-none" />

                                    {/* Hover Content */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
                                        <h3 className="text-law-gold font-bold text-2xl mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-100" style={{ fontFamily: 'var(--font-cormorant)' }}>
                                            {service.title}
                                        </h3>
                                        <p className="text-white/90 text-sm leading-relaxed line-clamp-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-150" style={{ fontFamily: 'var(--font-inter)' }}>
                                            {service.description}
                                        </p>
                                        <div className="flex items-center gap-2 mt-4 text-law-gold text-xs font-semibold tracking-wider uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-200" style={{ fontFamily: 'var(--font-inter)' }}>
                                            Learn More <FaArrowRight size={10} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    /* Fallback */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: FaBuilding, title: 'Corporate Law', desc: 'Expert guidance for mergers, acquisitions, contract drafting, and corporate governance.' },
                            { icon: FaGavel, title: 'Civil Litigation', desc: 'Skilled representation in civil disputes, appeals, and contract enforcement.' },
                            { icon: FaShieldAlt, title: 'Criminal Defense', desc: 'Strong defense strategies protecting your rights in criminal proceedings.' },
                            { icon: FaHandshake, title: 'Family Law', desc: 'Compassionate counsel for divorce, custody, and matrimonial matters.' },
                        ].map(({ icon: Icon, title, desc }) => (
                            <Link href="/practice-areas" key={title} className="group bg-white border border-law-cream-dark hover:border-law-gold transition-all duration-300 hover:shadow-xl p-8 flex flex-col">
                                <div className="w-12 h-12 rounded-full bg-law-navy/5 flex items-center justify-center mb-5 group-hover:bg-law-gold/10 transition-colors">
                                    <Icon className="text-law-navy group-hover:text-law-gold transition-colors" size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-law-text mb-3" style={{ fontFamily: 'var(--font-cormorant)' }}>{title}</h3>
                                <p className="text-law-muted text-sm leading-relaxed flex-grow" style={{ fontFamily: 'var(--font-inter)' }}>{desc}</p>
                                <div className="flex items-center gap-2 mt-6 text-law-gold text-xs font-semibold tracking-wider uppercase group-hover:gap-3 transition-all" style={{ fontFamily: 'var(--font-inter)' }}>
                                    Learn More <FaArrowRight size={10} />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                <div className="text-center mt-12">
                    <Link href="/practice-areas" className="btn-primary inline-block">
                        View All Practice Areas
                    </Link>
                </div>
            </div>
        </section>
    );
}
