"use client";
import { useState } from 'react';
import api from '@/utils/api';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaCheckCircle } from 'react-icons/fa';

export default function ContactClient() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });
        try {
            await api.post('/contact', formData);
            setStatus({ type: 'success', message: 'Thank you for reaching out. We will get back to you within 24 hours.' });
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (error) {
            setStatus({ type: 'error', message: error.response?.data?.message || 'Something went wrong. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        { icon: FaMapMarkerAlt, label: 'Our Office', value: '123 Legal Avenue, New Delhi, India 110001' },
        { icon: FaPhoneAlt, label: 'Phone', value: '+91 12345 67890', href: 'tel:+911234567890' },
        { icon: FaEnvelope, label: 'Email', value: 'contact@astroxadv.com', href: 'mailto:contact@astroxadv.com' },
        { icon: FaClock, label: 'Office Hours', value: 'Mon – Sat: 9:00 AM – 7:00 PM' },
    ];

    const subjects = [
        'Corporate & Business Law',
        'Civil Litigation',
        'Criminal Defense',
        'Family Law',
        'Property Law',
        'Employment Law',
        'Other Legal Matter',
    ];

    return (
        <div className="bg-law-cream">
            {/* Contact Body */}
            <section className="pt-32 pb-24 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

                    {/* Left: Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <span className="section-label">Office Information</span>
                            <h2 className="text-3xl font-bold text-law-text mt-3 mb-4" style={{ fontFamily: 'var(--font-cormorant)' }}>
                                Visit or Contact Us
                            </h2>
                            <div className="divider-gold" />
                        </div>

                        <div className="space-y-5 mt-6">
                            {contactInfo.map(({ icon: Icon, label, value, href }) => (
                                <div key={label} className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-law-navy rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                        <Icon className="text-law-gold" size={14} />
                                    </div>
                                    <div>
                                        <p className="text-law-muted text-xs tracking-wider uppercase mb-1" style={{ fontFamily: 'var(--font-inter)' }}>{label}</p>
                                        {href ? (
                                            <a href={href} className="text-law-text text-sm font-medium hover:text-law-gold transition-colors" style={{ fontFamily: 'var(--font-inter)' }}>
                                                {value}
                                            </a>
                                        ) : (
                                            <p className="text-law-text text-sm font-medium" style={{ fontFamily: 'var(--font-inter)' }}>{value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Map */}
                        <div className="mt-8 h-56 overflow-hidden border border-law-cream-dark">
                            <iframe
                                title="Astroxadv Office Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.767!2d77.2090!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1234567890"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>

                        {/* Guarantees */}
                        <div className="bg-law-navy p-6 mt-4">
                            <p className="text-law-gold text-xs font-semibold tracking-widest uppercase mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
                                Our Promise to You
                            </p>
                            {[
                                'Strict confidentiality guaranteed',
                                'Free initial consultation',
                                'Response within 24 hours',
                                'No obligation to proceed',
                            ].map(item => (
                                <div key={item} className="flex items-center gap-2 mb-2 last:mb-0">
                                    <FaCheckCircle className="text-law-gold shrink-0" size={12} />
                                    <span className="text-law-light text-xs" style={{ fontFamily: 'var(--font-inter)' }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="lg:col-span-3 bg-white border border-law-cream-dark p-8 md:p-10">
                        <h3 className="text-2xl font-bold text-law-text mb-2" style={{ fontFamily: 'var(--font-cormorant)' }}>
                            Send Us a Message
                        </h3>
                        <div className="divider-gold mb-6" />

                        {status.message && (
                            <div className={`mb-6 p-4 text-sm border ${status.type === 'success'
                                    ? 'bg-green-50 text-green-800 border-green-200'
                                    : 'bg-red-50 text-red-800 border-red-200'
                                }`} style={{ fontFamily: 'var(--font-inter)' }}>
                                {status.message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="name" className="block text-xs font-semibold text-law-text uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-inter)' }}>
                                        Full Name *
                                    </label>
                                    <input
                                        type="text" id="name" name="name" required
                                        value={formData.name} onChange={handleChange}
                                        placeholder="Your full name"
                                        className="w-full px-4 py-3 border border-law-cream-dark bg-law-cream text-law-text text-sm placeholder:text-law-muted/50 focus:outline-none focus:border-law-gold focus:ring-1 focus:ring-law-gold transition-colors"
                                        style={{ fontFamily: 'var(--font-inter)' }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-xs font-semibold text-law-text uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-inter)' }}>
                                        Email Address *
                                    </label>
                                    <input
                                        type="email" id="email" name="email" required
                                        value={formData.email} onChange={handleChange}
                                        placeholder="your@email.com"
                                        className="w-full px-4 py-3 border border-law-cream-dark bg-law-cream text-law-text text-sm placeholder:text-law-muted/50 focus:outline-none focus:border-law-gold focus:ring-1 focus:ring-law-gold transition-colors"
                                        style={{ fontFamily: 'var(--font-inter)' }}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="phone" className="block text-xs font-semibold text-law-text uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-inter)' }}>
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel" id="phone" name="phone"
                                        value={formData.phone} onChange={handleChange}
                                        placeholder="+91 XXXXX XXXXX"
                                        className="w-full px-4 py-3 border border-law-cream-dark bg-law-cream text-law-text text-sm placeholder:text-law-muted/50 focus:outline-none focus:border-law-gold focus:ring-1 focus:ring-law-gold transition-colors"
                                        style={{ fontFamily: 'var(--font-inter)' }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-xs font-semibold text-law-text uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-inter)' }}>
                                        Legal Matter *
                                    </label>
                                    <select
                                        id="subject" name="subject" required
                                        value={formData.subject} onChange={handleChange}
                                        className="w-full px-4 py-3 border border-law-cream-dark bg-law-cream text-law-text text-sm focus:outline-none focus:border-law-gold focus:ring-1 focus:ring-law-gold transition-colors"
                                        style={{ fontFamily: 'var(--font-inter)' }}
                                    >
                                        <option value="">Select a practice area</option>
                                        {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-xs font-semibold text-law-text uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-inter)' }}>
                                    Brief Description *
                                </label>
                                <textarea
                                    id="message" name="message" required rows="5"
                                    value={formData.message} onChange={handleChange}
                                    placeholder="Briefly describe your legal matter or question..."
                                    className="w-full px-4 py-3 border border-law-cream-dark bg-law-cream text-law-text text-sm placeholder:text-law-muted/50 focus:outline-none focus:border-law-gold focus:ring-1 focus:ring-law-gold transition-colors resize-none"
                                    style={{ fontFamily: 'var(--font-inter)' }}
                                />
                            </div>

                            <p className="text-law-muted text-xs" style={{ fontFamily: 'var(--font-inter)' }}>
                                * All information shared is strictly confidential and protected by attorney-client privilege.
                            </p>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`btn-primary w-full ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Sending…' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
