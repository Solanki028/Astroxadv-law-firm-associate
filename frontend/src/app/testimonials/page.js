import TestimonialsClient from '@/components/TestimonialsClient';

export async function generateMetadata() {
    return {
        title: 'Client Testimonials | Astroxadv Advocates',
        description: 'Read what our clients say about Astroxadv — trusted legal representation delivered with integrity and expertise.',
    };
}

export default function TestimonialsPage() {
    return <TestimonialsClient />;
}
