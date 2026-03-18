"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');
    const isBlog = pathname?.startsWith('/blog');

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <>
            <Navbar />
            {/* pt-[calc(80px+28px)] = main nav (80px) + top bar (28px) on desktop */}
            <main className="flex-grow pt-20">
                {children}
            </main>
            <FloatingWhatsApp />
            <Footer />
        </>
    );
}
