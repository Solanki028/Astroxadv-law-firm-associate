"use client";
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import api from '@/utils/api';

// Dynamically import all heavy sections to drastically improve initial page load speed
// ssr: true ensures they still Server-Side Render for SEO, but the JavaScript chunks are split!
const HomeHero = dynamic(() => import('./home/HomeHero'), { ssr: true });
const HomeStats = dynamic(() => import('./home/HomeStats'), { ssr: true });
const HomePracticeAreas = dynamic(() => import('./home/HomePracticeAreas'), { ssr: true });
const HomeAbout = dynamic(() => import('./home/HomeAbout'), { ssr: true });
const HomeWhyChooseUs = dynamic(() => import('./home/HomeWhyChooseUs'), { ssr: true });
const HomeTestimonials = dynamic(() => import('./home/HomeTestimonials'), { ssr: true });
const HomeInsights = dynamic(() => import('./home/HomeInsights'), { ssr: true });
const HomeCTA = dynamic(() => import('./home/HomeCTA'), { ssr: true });

export default function HomeClient({ initialData }) {
    const defaultHero = {
        tagline: 'Justice Delivered With Integrity',
        description: 'Astroxadv is a premier law firm offering trusted legal counsel across corporate, civil, and criminal law. Your rights are our responsibility.',
        heroImages: []
    };

    let initialHero = { ...defaultHero };
    if (initialData?.heroData?.content) {
        const d = { ...initialData.heroData.content };
        if (d.heroImage && (!d.heroImages || d.heroImages.length === 0)) d.heroImages = [d.heroImage];
        if (!d.heroImages) d.heroImages = [];
        initialHero = { ...initialHero, ...d };
    }

    const services = initialData?.servicesData || [];
    const testimonials = initialData?.testimonialsData || [];

    let initialAbout = { text: '', images: [] };
    if (initialData?.aboutData?.content) {
        const d = typeof initialData.aboutData.content === 'string'
            ? { text: initialData.aboutData.content, images: [] }
            : { ...initialData.aboutData.content };
        if (d.image && (!d.images || d.images.length === 0)) d.images = [d.image];
        if (!d.images) d.images = [];
        d.images = d.images.filter(img => img && img.trim() !== '');
        initialAbout = d;
    }

    const blogs = initialData?.blogsData ? initialData.blogsData.slice(0, 3) : [];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (initialHero.heroImages?.length > 1) {
            const interval = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % initialHero.heroImages.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [initialHero.heroImages]);

    return (
        <div className="flex flex-col w-full overflow-hidden">
            <HomeHero heroContent={initialHero} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />
            <HomeStats />
            <HomePracticeAreas services={services} />
            <HomeAbout aboutContent={initialAbout} />
            <HomeWhyChooseUs />
            <HomeTestimonials testimonials={testimonials} />
            <HomeInsights blogs={blogs} />
            <HomeCTA />
        </div>
    );
}
