"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaPhone, FaClock } from 'react-icons/fa';

export default function HomeCTA() {
    return (
        <section className="relative w-full overflow-hidden bg-law-navy">
            {/* Full-width pristine background image */}
            <div className="absolute inset-0 z-0">
                <Image 
                    src="/consultation-mockup.png" 
                    alt="Contact Astroxadv" 
                    fill
                    className="object-cover"
                    sizes="100vw"
                />
                {/* Very subtle dark overlay so the gold card pops */}
                <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto flex justify-end lg:py-24 py-12 px-4">
                {/* Floating Gold Card */}
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full lg:w-[55%] xl:w-[50%] bg-law-gold p-10 md:p-14 shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
                >
                    <motion.span 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xs font-bold tracking-[0.2em] uppercase flex items-center text-law-navy mb-4"
                        style={{ fontFamily: 'var(--font-inter)' }}
                    >
                        <span className="w-8 h-[2px] bg-law-navy mr-3"></span>
                        Schedule a Meeting
                    </motion.span>
                    <motion.h2 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-5xl font-bold text-law-navy mb-6 leading-[1.1]" 
                        style={{ fontFamily: 'var(--font-cormorant)' }}
                    >
                        Ready to Discuss <br className="hidden md:block"/>Your Legal Needs?
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-law-navy/80 text-sm mb-10 leading-relaxed max-w-md" 
                        style={{ fontFamily: 'var(--font-inter)' }}
                    >
                        Our attorneys are ready to provide the guidance you need. Schedule a free, no-obligation consultation today and take the first step toward resolving your legal matter.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col xl:flex-row gap-4"
                    >
                        <Link 
                            href="/contact" 
                            className="bg-law-navy text-law-gold px-8 py-3.5 font-bold uppercase tracking-wider text-xs text-center hover:bg-[#132034] transition-colors shadow-lg shadow-law-navy/20 whitespace-nowrap"
                            style={{ fontFamily: 'var(--font-inter)' }}
                        >
                            Book a Free Consultation
                        </Link>
                        <a 
                            href="tel:+911234567890" 
                            className="border-[2px] border-law-navy text-law-navy px-8 py-3.5 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-law-navy hover:text-law-gold transition-colors whitespace-nowrap"
                            style={{ fontFamily: 'var(--font-inter)' }}
                        >
                            <FaPhone size={12} />
                            Call Us Now
                        </a>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center gap-2 mt-8 text-law-navy/70 text-xs font-semibold" 
                        style={{ fontFamily: 'var(--font-inter)' }}
                    >
                        <FaClock size={12} />
                        <span>Mon – Sat: 9:00 AM – 7:00 PM</span>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
