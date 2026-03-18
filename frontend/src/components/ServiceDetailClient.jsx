"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/utils/api';
import { FaArrowLeft, FaCheckCircle, FaPhoneAlt, FaEnvelope, FaGavel, FaArrowRight } from 'react-icons/fa';
import SharedHero from './SharedHero';

export default function ServiceDetailClient() {
    const { slug } = useParams();
    const [service, setService] = useState(null);
    const [items, setItems] = useState([]);
    const [otherServices, setOtherServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                // Fetch this specific service details
                const res = await api.get(`/services/${slug}`);
                setService(res.data.service);
                setItems(res.data.items);
                
                // Also fetch all services to populate the quick links sidebar
                const allRes = await api.get('/services');
                setOtherServices(allRes.data.filter(s => s.slug !== slug).slice(0, 5));
            } catch (error) {
                console.error('Error fetching service details:', error);
            } finally {
                setLoading(false);
            }
        };
        if (slug) fetchServiceData();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh] bg-law-cream">
                <div className="w-12 h-12 border-2 border-law-navy border-t-law-gold rounded-full animate-spin" />
            </div>
        );
    }

    if (!service) {
        return (
            <div className="flex flex-col justify-center items-center h-[60vh] bg-law-cream gap-4">
                <FaGavel className="text-law-muted" size={40} />
                <p className="text-law-muted text-sm" style={{ fontFamily: 'var(--font-inter)' }}>Practice area not found.</p>
                <Link href="/practice-areas" className="btn-primary text-xs">
                    View All Practice Areas
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-law-cream min-h-screen pb-32">
            <SharedHero 
                label="Practice Area"
                title={service.title}
                description={service.description}
                bgImage={service.heroImage || '/law-firm.webp'}
            >
                <div className="flex justify-center items-center gap-2 mt-6 text-white/80 text-sm font-medium tracking-wide" style={{ fontFamily: 'var(--font-inter)' }}>
                    <Link href="/" className="hover:text-law-gold transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/practice-areas" className="hover:text-law-gold transition-colors">Practice Areas</Link>
                    <span>/</span>
                    <span className="text-law-gold">{service.title}</span>
                </div>
            </SharedHero>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                
                {/* Left Area: Detailed Content & Specific Services */}
                <div className="lg:col-span-8 space-y-16">
                    {/* Rich Text Detailed Content */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="h-px bg-law-gold w-12 block"></span>
                            <span className="uppercase tracking-widest text-law-gold text-xs font-bold" style={{ fontFamily: 'var(--font-inter)' }}>Overview</span>
                        </div>
                        {service.detailedContent ? (
                            <div 
                                className="prose prose-lg prose-law max-w-none text-law-text" 
                                style={{ fontFamily: 'var(--font-inter)', lineHeight: '1.9' }}
                                dangerouslySetInnerHTML={{ __html: service.detailedContent }} 
                            />
                        ) : (
                            <p className="text-law-text leading-relaxed text-lg" style={{ fontFamily: 'var(--font-inter)' }}>
                                {service.description}
                            </p>
                        )}
                    </div>

                    {/* Specific Sub-Services Grid */}
                    {items && items.length > 0 && (
                        <div>
                            <div className="flex items-center gap-4 mb-8 border-b border-law-border/50 pb-6">
                                <span className="h-px bg-law-gold w-12 block"></span>
                                <h2 className="text-3xl md:text-4xl font-bold text-law-navy" style={{ fontFamily: 'var(--font-cormorant)' }}>
                                    Core Expertise
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {items.map((item) => (
                                    <div key={item._id} className="bg-white border border-law-border/50 group hover:-translate-y-1 transition-all duration-300 flex flex-col h-full shadow-sm hover:shadow-md">
                                        <div className="h-48 overflow-hidden relative">
                                            <div className="absolute inset-0 bg-law-navy/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                            <div className="absolute inset-bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent z-20" />
                                            <h3 className="absolute bottom-4 left-6 text-xl font-bold text-white z-30 tracking-wide" style={{ fontFamily: 'var(--font-cormorant)' }}>{item.title}</h3>
                                        </div>
                                        <div className="p-6 flex-grow flex flex-col bg-law-cream/30">
                                            <p className="text-law-muted text-sm leading-relaxed flex-grow" style={{ fontFamily: 'var(--font-inter)' }}>{item.description}</p>
                                            
                                            {item.tools && item.tools.length > 0 && (
                                                <div className="mt-6 pt-4 border-t border-law-gold/20">
                                                    <div className="flex flex-wrap gap-2">
                                                        {item.tools.map((tool, idx) => (
                                                            <span key={idx} className="text-[10px] uppercase tracking-wider bg-white text-law-navy px-2 py-1 border border-law-gold/30 flex items-center gap-1 font-semibold rounded-sm">
                                                                <FaCheckCircle className="text-law-gold" /> {tool}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Area: Sticky Sidebar */}
                <div className="lg:col-span-4 relative">
                    <div className="sticky top-28 space-y-8">
                        
                        {/* Contact Widget */}
                        <div className="bg-law-navy p-8 border-t-4 border-law-gold shadow-lg">
                            <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-cormorant)' }}>Discuss Your Case</h3>
                            <p className="text-law-light text-sm mb-6 leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
                                Our expert attorneys specializing in {service.title} are available for a confidential consultation. Immediate action is often critical.
                            </p>
                            <Link href="/contact" className="btn-primary w-full text-center flex justify-center items-center gap-2 py-3">
                                Schedule Consultation <FaArrowRight size={12} />
                            </Link>
                            <div className="mt-8 space-y-4 pt-6 border-t border-white/10">
                                <a href="tel:+911234567890" className="flex items-center gap-4 text-white hover:text-law-gold transition-colors text-sm font-medium">
                                    <div className="w-10 h-10 rounded-full bg-law-gold/20 flex items-center justify-center">
                                        <FaPhoneAlt size={14} className="text-law-gold" />
                                    </div>
                                    +91 12345 67890
                                </a>
                                <a href="mailto:contact@astroxadv.com" className="flex items-center gap-4 text-white hover:text-law-gold transition-colors text-sm font-medium">
                                    <div className="w-10 h-10 rounded-full bg-law-gold/20 flex items-center justify-center">
                                        <FaEnvelope size={14} className="text-law-gold" />
                                    </div>
                                    legal@astroxadv.com
                                </a>
                            </div>
                        </div>

                        {/* Quick Links Widget */}
                        {otherServices.length > 0 && (
                            <div className="bg-white border border-law-border/50 p-8 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-law-cream -mr-8 -mt-8 rotate-45 transform" />
                                <h3 className="text-xl font-bold text-law-navy mb-6 border-b border-law-gold/20 pb-3" style={{ fontFamily: 'var(--font-cormorant)' }}>
                                    Other Practice Areas
                                </h3>
                                <ul className="space-y-4" style={{ fontFamily: 'var(--font-inter)' }}>
                                    {otherServices.map(os => (
                                        <li key={os.slug} className="group">
                                            <Link href={`/practice-areas/${os.slug}`} className="flex items-center justify-between text-law-muted hover:text-law-navy transition-colors text-sm font-medium">
                                                <span className="group-hover:translate-x-1 transition-transform">{os.title}</span>
                                                <FaArrowRight size={10} className="text-transparent group-hover:text-law-gold transition-colors transform -translate-x-2 group-hover:translate-x-0" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                    </div>
                </div>

            </main>
        </div>
    );
}
