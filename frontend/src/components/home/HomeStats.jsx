"use client";
import React from 'react';

const STATS = [
    { value: '500+', label: 'Cases Won' },
    { value: '20+', label: 'Years Experience' },
    { value: '1200+', label: 'Clients Served' },
    { value: '15+', label: 'Expert Attorneys' },
];

export default function HomeStats() {
    return (
        <section className="bg-law-gold py-6">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {STATS.map((stat) => (
                        <div key={stat.label} className="text-center">
                            <p className="text-3xl md:text-4xl font-bold text-law-navy" style={{ fontFamily: 'var(--font-cormorant)' }}>
                                {stat.value}
                            </p>
                            <p className="text-law-navy/70 text-xs font-semibold tracking-widest uppercase mt-1" style={{ fontFamily: 'var(--font-inter)' }}>
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
