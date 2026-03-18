"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import api from '@/utils/api';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Image from 'next/image';

const Footer = () => {
    const [settings, setSettings] = useState({
        email: "contact@astroxadv.com",
        phone: "+91 12345 67890",
        address: "123 Legal Avenue, New Delhi, India 110001",
        facebook: "#",
        twitter: "#",
        instagram: "#",
        linkedin: "#"
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await api.get('/content/footer_settings');
                if (res.data && res.data.content) {
                    setSettings(prev => ({ ...prev, ...res.data.content }));
                }
            } catch (error) {
                console.error('Error fetching footer settings:', error);
            }
        };
        fetchSettings();
    }, []);

    const practiceAreas = [
        { name: 'Corporate Law', path: '/services' },
        { name: 'Civil Litigation', path: '/services' },
        { name: 'Criminal Defense', path: '/services' },
        { name: 'Family Law', path: '/services' },
        { name: 'Property & Real Estate', path: '/services' },
        { name: 'Intellectual Property', path: '/services' },
    ];

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        // { name: 'Our Attorneys', path: '/attorneys' },
        { name: 'Client Testimonials', path: '/testimonials' },
        { name: 'Practice Areas', path: '/practice-areas' },
        { name: 'Legal Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' },
    ];

    const socials = [
        { icon: FaFacebookF, href: settings.facebook, label: 'Facebook' },
        { icon: FaTwitter, href: settings.twitter, label: 'Twitter' },
        { icon: FaInstagram, href: settings.instagram, label: 'Instagram' },
        { icon: FaLinkedinIn, href: settings.linkedin, label: 'LinkedIn' },
    ].filter(s => s.href && s.href !== '#' || true); // Show all social icons

    return (
        <footer className="bg-law-navy text-law-cream">
            {/* Gold top border */}
            <div className="h-[2px] bg-gradient-to-r from-transparent via-law-gold to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-block mb-4 relative h-12 w-48">
                            <Image
                                src="/LOGO JKDESIGNS.png"
                                alt="Astroxadv Logo"
                                fill
                                className="object-contain object-left brightness-0 invert"
                            />
                        </Link>
                        <div className="mb-3">
                            <p className="text-law-gold text-sm font-semibold tracking-widest uppercase" style={{ fontFamily: 'var(--font-inter)' }}>
                                Astroxadv
                            </p>
                            <p className="text-law-light text-xs tracking-wider mt-1">Advocates & Solicitors</p>
                        </div>
                        <div className="divider-gold" />
                        <p className="text-law-light text-sm leading-relaxed mb-6 mt-4">
                            Committed to delivering trusted legal counsel with integrity, excellence, and unwavering dedication to our clients since 2005.
                        </p>

                        {/* Socials */}
                        <div className="flex gap-3">
                            {socials.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="w-9 h-9 rounded-full border border-law-border flex items-center justify-center text-law-light hover:border-law-gold hover:text-law-gold transition-all duration-300"
                                >
                                    <Icon size={13} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Practice Areas */}
                    <div>
                        <h4 className="text-law-white font-semibold text-sm uppercase tracking-widest mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                            Practice Areas
                        </h4>
                        <div className="divider-gold mb-4" />
                        <ul className="space-y-2">
                            {practiceAreas.map((area) => (
                                <li key={area.name}>
                                    <Link
                                        href={area.path}
                                        className="text-law-light text-sm hover:text-law-gold transition-colors duration-200 flex items-center gap-2 group"
                                    >
                                        <span className="w-4 h-[1px] bg-law-border group-hover:bg-law-gold transition-colors inline-block" />
                                        {area.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-law-white font-semibold text-sm uppercase tracking-widest mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                            Quick Links
                        </h4>
                        <div className="divider-gold mb-4" />
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.path}
                                        className="text-law-light text-sm hover:text-law-gold transition-colors duration-200 flex items-center gap-2 group"
                                    >
                                        <span className="w-4 h-[1px] bg-law-border group-hover:bg-law-gold transition-colors inline-block" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-law-white font-semibold text-sm uppercase tracking-widest mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                            Contact
                        </h4>
                        <div className="divider-gold mb-4" />
                        <ul className="space-y-4">
                            {settings.address && (
                                <li className="flex items-start gap-3">
                                    <FaMapMarkerAlt className="text-law-gold mt-1 shrink-0" size={13} />
                                    <span className="text-law-light text-sm leading-relaxed">{settings.address}</span>
                                </li>
                            )}
                            {settings.phone && (
                                <li className="flex items-center gap-3">
                                    <FaPhoneAlt className="text-law-gold shrink-0" size={12} />
                                    <a
                                        href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                                        className="text-law-light text-sm hover:text-law-gold transition-colors"
                                    >
                                        {settings.phone}
                                    </a>
                                </li>
                            )}
                            {settings.email && (
                                <li className="flex items-center gap-3">
                                    <FaEnvelope className="text-law-gold shrink-0" size={12} />
                                    <a
                                        href={`mailto:${settings.email}`}
                                        className="text-law-light text-sm hover:text-law-gold transition-colors"
                                    >
                                        {settings.email}
                                    </a>
                                </li>
                            )}
                        </ul>
                        <div className="mt-6">
                            <Link href="/contact" className="btn-primary text-xs py-2.5 px-5 inline-block">
                                Get Legal Help
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-law-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-law-light text-xs tracking-wide">
                        &copy; {new Date().getFullYear()} Astroxadv Advocates & Solicitors. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a href="#" className="text-law-light text-xs hover:text-law-gold transition-colors tracking-wide">Privacy Policy</a>
                        <a href="#" className="text-law-light text-xs hover:text-law-gold transition-colors tracking-wide">Terms of Service</a>
                        <a href="#" className="text-law-light text-xs hover:text-law-gold transition-colors tracking-wide">Disclaimer</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
