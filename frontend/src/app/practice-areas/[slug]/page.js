import ServiceDetailClient from '@/components/ServiceDetailClient';

export function generateMetadata({ params }) {
    // Basic dynamic metadata, you can enhance this by fetching the actual title if needed
    return {
        title: `Practice Area | Astroxadv Advocates`,
        description: `Expert legal representation and counsel by Astroxadv.`,
    };
}

export default function PracticeAreaDetail({ params }) {
    // Next.js 15+ best practice for the new app router is to await params if needed, 
    // but the Client component can grab the slug via useParams().
    return <ServiceDetailClient />;
}
