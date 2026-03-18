import ServiceDetailClient from '@/components/ServiceDetailClient';

export function generateMetadata({ params }) {
    // Basic dynamic metadata
    return {
        title: `Practice Area | Astroxadv Advocates`,
        description: `Expert legal representation and counsel by Astroxadv.`,
    };
}

export default function RootSlugCatchAll({ params }) {
    return <ServiceDetailClient />;
}
