"use client";
import { FaWhatsapp } from 'react-icons/fa';

export default function FloatingWhatsApp() {
    // Replace with the actual WhatsApp number including country code
    const phoneNumber = "919996973755";
    const defaultMessage = "Hello Astroxadv, I would like to schedule a legal consultation.";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] group flex items-center justify-center"
            aria-label="Chat with us on WhatsApp"
        >
            {/* Hover Tooltip - Sleek Modern Style */}
            <div
                className="absolute right-[115%] px-5 py-2.5 bg-[#0A1628]/95 backdrop-blur-md text-law-gold text-xs font-medium tracking-widest uppercase rounded-lg border border-law-border/50 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-400 transform translate-x-4 group-hover:translate-x-0 whitespace-nowrap"
                style={{ fontFamily: 'var(--font-inter)' }}
            >
                Start a Conversation
                {/* Tooltip Right Arrow */}
                <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-[#0A1628]/95 border-t border-r border-law-border/50 transform rotate-45" />
            </div>

            {/* The Classy Button Core (Navy & Gold instead of standard Green) */}
            <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-law-navy to-[#132034] border border-law-gold/50 rounded-full shadow-[0_8px_30px_rgba(201,168,76,0.15)] group-hover:shadow-[0_8px_40px_rgba(201,168,76,0.3)] group-hover:border-law-gold hover:scale-105 transition-all duration-500 overflow-hidden">

                {/* Slow Elegant Pulse Ripple */}
                <div className="absolute inset-0 rounded-full border border-law-gold animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-30" />

                {/* Icon */}
                <FaWhatsapp className="text-law-gold text-3xl md:text-4xl z-10 group-hover:rotate-[15deg] group-hover:text-law-gold-light transition-all duration-500" />
            </div>
        </a>
    );
}
