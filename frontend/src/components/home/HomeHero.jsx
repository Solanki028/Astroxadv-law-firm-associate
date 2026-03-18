"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomeHero({ heroContent, currentSlide, setCurrentSlide }) {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-law-navy">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                {heroContent.heroImages?.length > 0 ? (
                    heroContent.heroImages.map((img, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                        >
                            <Image 
                                src={img} 
                                alt={`Legal background ${index + 1}`} 
                                fill 
                                className="object-cover"
                                priority={index === 0} 
                            />
                        </div>
                    ))
                ) : (
                    <div className="w-full h-full bg-law-navy" />
                )}
                {/* Dark layered overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10 pointer-events-none" />
            </div>

            {/* Gold decorative lines */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-law-gold to-transparent z-20 hidden md:block" />

            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
                <div className="max-w-3xl">
                    <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
                        <div className="h-[1px] w-12 bg-law-gold" />
                        <span className="section-label">Trusted Legal Counsel Since 2005</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up delay-100" style={{ fontFamily: 'var(--font-cormorant)' }}>
                        {heroContent.tagline || 'Justice Delivered With Integrity'}
                    </h1>

                    <p className="text-lg md:text-xl text-law-light mb-10 max-w-xl leading-relaxed animate-fade-in-up delay-200" style={{ fontFamily: 'var(--font-inter)' }}>
                        {heroContent.description || 'Astroxadv is a premier law firm offering trusted legal counsel across corporate, civil, and criminal law.'}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-300">
                        <Link href="/practice-areas" className="btn-primary">
                            Our Practice Areas
                        </Link>
                        <Link href="/contact" className="btn-outline">
                            Free Consultation
                        </Link>
                    </div>
                </div>
            </div>

            {/* Slide indicators */}
            {heroContent.heroImages?.length > 1 && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                    {heroContent.heroImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-1 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-10 bg-law-gold' : 'w-4 bg-white/25 hover:bg-white/50'}`}
                            aria-label={`Slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
