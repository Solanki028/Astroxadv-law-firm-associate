"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaPhone, FaChevronDown } from 'react-icons/fa';
import Image from 'next/image';
import api from '@/utils/api';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await api.get('/services');
                if (res.data) setServices(res.data);
            } catch (err) {
                console.error("Failed to fetch services for navbar", err);
            }
        };
        fetchServices();

        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Practice Areas', path: '/practice-areas', isDropdown: true },
        { name: 'Testimonials', path: '/testimonials' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <>
            {/* Top bar */}
            <div className="hidden md:flex items-center justify-end bg-law-navy px-8 py-2 text-xs text-law-light border-b border-law-border">
                <a href="tel:+911234567890" className="flex items-center gap-2 text-law-gold hover:text-law-gold-light transition-colors">
                    <FaPhone size={10} />
                    <span className="tracking-wider">+91 12345 67890</span>
                </a>
                <span className="mx-4 text-law-border">|</span>
                <span className="tracking-wider text-law-light">Mon – Sat: 9:00 AM – 7:00 PM</span>
            </div>

            {/* Main Navbar */}
            <nav
                className={`fixed w-full z-50 transition-all duration-300 ${
                    scrolled
                        ? 'bg-law-navy/98 shadow-2xl backdrop-blur-sm border-b border-law-border'
                        : 'bg-law-navy border-b border-law-border'
                }`}
                style={{ top: 0 }}
            >
                {/* Gold accent line at top */}
                <div className="h-[2px] bg-gradient-to-r from-transparent via-law-gold to-transparent w-full" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative h-12 w-48 shrink-0">
                                <Image
                                    src="/LOGO JKDESIGNS.png"
                                    alt="Astroxadv Logo"
                                    fill
                                    className="object-contain object-left brightness-0 invert group-hover:opacity-90 transition-opacity"
                                    priority
                                />
                            </div>
                            <div className="hidden lg:block border-l border-law-border pl-3">
                                <p className="text-law-gold font-semibold text-sm tracking-widest uppercase" style={{ fontFamily: 'var(--font-inter)' }}>
                                    Astroxadv
                                </p>
                                <p className="text-law-light text-xs tracking-wider">Advocates & Solicitors</p>
                            </div>
                        </Link>

                        {/* Desktop Nav Links */}
                        <div className="hidden md:flex items-center gap-2 h-full">
                            {navLinks.map((link) => (
                                <div key={link.name} className={`relative flex items-center h-full ${link.isDropdown ? 'group/nav' : 'group'}`}>
                                    <Link
                                        href={link.path}
                                        className="relative px-4 py-8 text-sm font-medium tracking-wide text-law-cream hover:text-law-gold transition-colors duration-200 flex items-center gap-1.5"
                                        style={{ fontFamily: 'var(--font-inter)' }}
                                    >
                                        {link.name}
                                        {link.isDropdown && <FaChevronDown size={10} className="mt-0.5 group-hover/nav:rotate-180 transition-transform duration-300" />}
                                        <span className={`absolute bottom-6 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-law-gold transition-all duration-300 ${link.isDropdown ? 'group-hover/nav:w-[60%]' : 'group-hover:w-[60%]'}`} />
                                    </Link>

                                    {/* Sleek Dropdown Content (Only for specific links like Practice Areas) */}
                                    {link.isDropdown && services.length > 0 && (
                                        <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-64 bg-[#0A1628] border border-law-border shadow-2xl opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 transform translate-y-4 group-hover/nav:translate-y-0 z-50">
                                            {/* Top Gold Border Decorator */}
                                            <div className="h-[3px] bg-gradient-to-r from-law-gold to-law-gold-dark w-full relative z-10" />
                                            {/* Dropdown Arrow Indicator */}
                                            <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2 h-2 border-t-[3px] border-l-[3px] border-law-gold-dark transform rotate-45 z-20" />
                                            
                                            <div className="py-2 flex flex-col relative z-30">
                                                {services.map((service, idx) => (
                                                    <Link 
                                                        key={service._id} 
                                                        href={`/${service.slug}`}
                                                        className="block px-6 py-3 text-sm text-law-cream hover:text-law-gold hover:bg-[#132034] transition-all flex items-center gap-3 group/item tracking-wide relative border-b border-law-border/20 last:border-0"
                                                        style={{ fontFamily: 'var(--font-inter)' }}
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-law-gold/30 group-hover/item:bg-law-gold transition-colors" />
                                                        <span className="transform group-hover/item:translate-x-1 transition-transform">{service.title}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="hidden xl:flex items-center ml-2">
                            <Link
                                href="/contact"
                                className="btn-primary text-xs py-3 px-6"
                            >
                                Free Consultation
                            </Link>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            type="button"
                            className="md:hidden p-2 text-law-cream hover:text-law-gold transition-colors focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-law-navy border-t border-law-border ${
                        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="px-4 py-4 space-y-1">
                        {navLinks.map((link) => (
                            <div key={link.name}>
                                <div className="flex items-center justify-between border-b border-law-border/30 last:border-0 hover:bg-law-border/30 transition-colors">
                                    <Link
                                        href={link.path}
                                        onClick={() => link.isDropdown ? null : setIsOpen(false)}
                                        className="w-full block px-4 py-3 text-law-cream hover:text-law-gold text-sm font-medium tracking-wide"
                                        style={{ fontFamily: 'var(--font-inter)' }}
                                    >
                                        {link.name}
                                    </Link>
                                    {link.isDropdown && <FaChevronDown className="mr-4 text-law-gold/70 pointer-events-none" size={10} />}
                                </div>
                                
                                {/* Mobile nested sub-menu */}
                                {link.isDropdown && services.length > 0 && (
                                    <div className="bg-[#0A1628]/50 pl-6 border-b border-law-border/30">
                                        {services.map(service => (
                                            <Link 
                                                key={service._id} 
                                                href={`/${service.slug}`}
                                                onClick={() => setIsOpen(false)}
                                                className="block px-4 py-3 text-law-light hover:text-law-gold text-sm transition-colors border-b border-law-border/10 last:border-0 flex items-center gap-2"
                                                style={{ fontFamily: 'var(--font-inter)' }}
                                            >
                                                <span className="w-1 h-1 rounded-full bg-law-gold/50" />
                                                {service.title}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="pt-4">
                            <Link
                                href="/contact"
                                onClick={() => setIsOpen(false)}
                                className="btn-primary w-full text-xs py-3 text-center block"
                            >
                                Free Consultation
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
