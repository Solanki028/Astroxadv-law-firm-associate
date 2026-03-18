"use client";
import { useEffect, useState } from 'react';
import api from '@/utils/api';
import Link from 'next/link';
import { FaBalanceScale, FaGavel, FaHandshake, FaShieldAlt, FaBuilding, FaUsers, FaLeaf, FaGlobe, FaArrowRight } from 'react-icons/fa';

const AREA_ICONS = [FaBalanceScale, FaGavel, FaHandshake, FaShieldAlt, FaBuilding, FaUsers, FaLeaf, FaGlobe];

import SharedHero from './SharedHero';

export default function ServicesClient() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await api.get('/services');
                setServices(res.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchServices();
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
                label="Legal Expertise" 
                title="Our Practice Areas" 
                description="We deliver specialized legal services across a broad spectrum of disciplines — each handled with precision, dedication, and a client-first approach." 
            />

            {/* Services Grid */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">
                    {services.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, idx) => {
                                return (
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
                                            <div 
                                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                                style={{ 
                                                    backgroundImage: `url(${service.heroImage || 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800'})` 
                                                }}
                                            />
                                            {/* Overlay gradient becomes darker on hover */}
                                            <div className="absolute inset-0 bg-law-navy/30 group-hover:bg-law-navy/80 transition-colors duration-500" />
                                            
                                            {/* Hover Content (Title and Description slide up) */}
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
                                );
                            })}
                        </div>
                    ) : (
                        /* Mock fallback */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { icon: FaBuilding, title: 'Corporate Law', desc: 'Expert guidance for mergers, acquisitions, contract drafting, and corporate governance structures.' },
                                { icon: FaGavel, title: 'Civil Litigation', desc: 'Skilled representation in civil disputes, breach of contract, injunctions, and declaratory reliefs.' },
                                { icon: FaShieldAlt, title: 'Criminal Defense', desc: 'Vigorous defense strategies protecting your freedom and rights in all criminal proceedings.' },
                                { icon: FaHandshake, title: 'Family Law', desc: 'Compassionate and discreet counsel for divorce, child custody, maintenance, and matrimonial disputes.' },
                                { icon: FaBalanceScale, title: 'Property & Real Estate', desc: 'Comprehensive services for property transactions, title disputes, tenant law, and registration.' },
                                { icon: FaUsers, title: 'Employment Law', desc: 'Protecting employee and employer rights in workplace disputes, termination, and contract matters.' },
                                { icon: FaLeaf, title: 'Environmental Law', desc: 'Legal advisory on environmental compliance, regulatory affairs, and eco-legal disputes.' },
                                { icon: FaGlobe, title: 'Intellectual Property', desc: 'Protecting your innovations through trademarks, patents, copyright registration, and IP enforcement.' },
                            ].map(({ icon: Icon, title, desc }) => (
                                <Link href="/contact" key={title}
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
                                                {title}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Abstract background for fallback */}
                                    <div className="relative flex-grow h-full bg-law-navy flex items-center justify-center overflow-hidden">
                                        <Icon className="text-law-navy-light opacity-30 absolute -right-12 -bottom-12 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-10" size={200} />
                                        
                                        {/* Hover Content (Title and Description slide up) */}
                                        <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
                                            <h3 className="text-law-gold font-bold text-2xl mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-100" style={{ fontFamily: 'var(--font-cormorant)' }}>
                                                {title}
                                            </h3>
                                            <p className="text-white/90 text-sm leading-relaxed line-clamp-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-150" style={{ fontFamily: 'var(--font-inter)' }}>
                                                {desc}
                                            </p>
                                            <div className="flex items-center gap-2 mt-4 text-law-gold text-xs font-semibold tracking-wider uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-200" style={{ fontFamily: 'var(--font-inter)' }}>
                                                Learn More <FaArrowRight size={10} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-law-navy py-16 px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-cormorant)' }}>
                        Don't See Your Legal Issue Here?
                    </h2>
                    <p className="text-law-light text-sm mb-8" style={{ fontFamily: 'var(--font-inter)' }}>
                        Our attorneys handle a wide spectrum of legal matters. Contact us for a free consultation.
                    </p>
                    <Link href="/contact" className="btn-primary inline-block">
                        Schedule a Consultation
                    </Link>
                </div>
            </section>
        </div>
    );
}
