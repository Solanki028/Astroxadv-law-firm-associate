"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaAward, FaHandshake, FaBolt } from 'react-icons/fa';

export default function HomeWhyChooseUs() {
    return (
        <section className="py-24 px-4 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left: 3D Eye-Catching Legal Mockup */}
                    <div className="relative w-full flex justify-center items-center py-10 lg:py-0">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, type: "spring", bounce: 0.3 }}
                            className="relative w-full max-w-[500px] aspect-[4/5] rounded-[24px] p-[2px] bg-gradient-to-tr from-[#132034] via-[#C9A84C]/40 to-[#0A1628] shadow-[0_40px_80px_-20px_rgba(10,22,40,0.8)] group"
                        >
                            <div className="absolute inset-0 bg-[#C9A84C]/20 blur-[60px] rounded-full group-hover:bg-[#C9A84C]/40 transition-colors duration-1000 z-0 pointer-events-none" />
                            
                            <div className="w-full h-full rounded-[22px] overflow-hidden relative z-10 bg-[#0A1628]">
                                <Image 
                                    src="/eye-catchy-mockup.png" 
                                    alt="Astroxadv Excellence Masterpiece" 
                                    fill
                                    className="object-cover group-hover:scale-[1.03] transition-transform duration-1000 ease-in-out opacity-90 group-hover:opacity-100"
                                    sizes="(max-width: 768px) 100vw, 500px"
                                />
                                {/* Inner elegant gold border line */}
                                <div className="absolute inset-4 border border-[#C9A84C]/40 rounded-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Text and Elegant List */}
                    <div>
                        <motion.span 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="section-label"
                        >
                            The Astroxadv Advantage
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold text-law-text mt-3 mb-6" 
                            style={{ fontFamily: 'var(--font-cormorant)' }}
                        >
                            Why Trust Our Firm?
                        </motion.h2>
                        <motion.div 
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="divider-gold origin-left" 
                        />
                        
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-law-muted leading-relaxed mb-10 text-lg"
                            style={{ fontFamily: 'var(--font-inter)' }}
                        >
                            We approach every case with a combination of relentless preparation, deep legal acumen, and an unwavering commitment to our clients' success.
                        </motion.p>

                        <div className="space-y-8">
                            {[
                                { icon: FaAward, title: "Unmatched Expertise", desc: "Decades of combined experience navigating high-stakes litigation and complex corporate transactions." },
                                { icon: FaHandshake, title: "Client-Centric Approach", desc: "Absolute transparency. We ensure you remain informed, advised, and empowered at every stage." },
                                { icon: FaBolt, title: "Strategic Precision", desc: "Aggressive, calculated action designed to resolve disputes efficiently and extremely favorably." }
                            ].map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: index * 0.2 + 0.4, duration: 0.6 }}
                                    className="flex gap-6 group"
                                >
                                    <div className="shrink-0 pt-1">
                                        <div className="w-12 h-12 rounded-full border-2 border-law-gold flex items-center justify-center bg-white group-hover:bg-law-gold transition-colors duration-500 shadow-md">
                                            <item.icon className="text-law-gold group-hover:text-white text-xl transition-colors duration-500" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-law-navy mb-2" style={{ fontFamily: 'var(--font-cormorant)' }}>
                                            {item.title}
                                        </h3>
                                        <p className="text-law-muted text-sm leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
