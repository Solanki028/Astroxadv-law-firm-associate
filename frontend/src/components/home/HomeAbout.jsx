"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaShieldAlt, FaGavel, FaUsers, FaBalanceScale } from 'react-icons/fa';

export default function HomeAbout({ aboutContent }) {
    return (
        <section className="py-24 px-4 bg-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                {/* Image side */}
                <div className="relative h-[500px] bg-law-navy overflow-hidden order-2 md:order-1">
                    {aboutContent.images?.length > 0 ? (
                        <Image 
                            src={aboutContent.images[0]} 
                            alt="About Astroxadv" 
                            fill
                            className="object-cover opacity-80" 
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-law-navy to-law-navy-mid">
                            <FaBalanceScale className="text-law-gold/20" size={120} />
                        </div>
                    )}
                    {/* Gold frame overlay */}
                    <div className="absolute inset-4 border border-law-gold/30 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-law-gold" />

                    {/* Floating badge */}
                    <div className="absolute bottom-8 right-8 bg-law-gold p-6 text-center shadow-xl">
                        <p className="text-3xl font-bold text-law-navy" style={{ fontFamily: 'var(--font-cormorant)' }}>20+</p>
                        <p className="text-law-navy text-xs font-semibold tracking-widest uppercase mt-1" style={{ fontFamily: 'var(--font-inter)' }}>Years of<br />Excellence</p>
                    </div>
                </div>

                {/* Text side */}
                <div className="order-1 md:order-2">
                    <span className="section-label">About the Firm</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-law-text mt-3 mb-4" style={{ fontFamily: 'var(--font-cormorant)' }}>
                        Dedicated to Your Legal Success
                    </h2>
                    <div className="divider-gold" />
                    {aboutContent.text ? (
                        <div
                            className="text-law-muted leading-relaxed mt-6 text-sm prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: aboutContent.text }}
                            style={{ fontFamily: 'var(--font-inter)' }}
                        />
                    ) : (
                        <p className="text-law-muted text-sm leading-relaxed mt-6" style={{ fontFamily: 'var(--font-inter)' }}>
                            Astroxadv was founded on the belief that every individual and organization deserves access to exceptional legal representation. With over two decades of combined experience, our team of skilled advocates and solicitors work tirelessly to protect your interests.
                            <br /><br />
                            We bring strategic thinking, rigorous attention to detail, and unwavering commitment to every case — from complex corporate matters to deeply personal legal challenges.
                        </p>
                    )}
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        {[
                            { icon: FaShieldAlt, label: 'Confidential & Trusted' },
                            { icon: FaGavel, label: 'Proven Track Record' },
                            { icon: FaUsers, label: 'Client-First Approach' },
                            { icon: FaBalanceScale, label: 'Ethical Practice' },
                        ].map(({ icon: Icon, label }) => (
                            <div key={label} className="flex items-center gap-3">
                                <Icon className="text-law-gold shrink-0" size={14} />
                                <span className="text-law-text text-sm font-medium" style={{ fontFamily: 'var(--font-inter)' }}>{label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8">
                        <Link href="/about" className="btn-primary inline-block">
                            Learn More About Us
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
