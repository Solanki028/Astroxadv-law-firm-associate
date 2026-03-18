import ServicesClient from '@/components/ServicesClient';
import { getPageSeo } from '@/utils/seo';

export async function generateMetadata() {
    const seo = await getPageSeo('services'); // We keep 'services' for the backend SEO key
    if (seo) {
        return {
            title: seo.title,
            description: seo.description,
            keywords: seo.keywords,
        };
    }
    return {
        title: 'Practice Areas | Astroxadv Advocates',
        description: 'Explore the full range of legal practice areas at Astroxadv — from corporate and civil law to criminal defense and family law.',
    };
}

export default function PracticeAreas() {
    return <ServicesClient />;
}
