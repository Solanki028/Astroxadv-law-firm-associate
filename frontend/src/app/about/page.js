import AboutClient from '@/components/AboutClient';
import { getPageSeo } from '@/utils/seo';

export async function generateMetadata() {
    const seo = await getPageSeo('about');
    if (seo) {
        return {
            title: seo.title,
            description: seo.description,
            keywords: seo.keywords,
        };
    }
    return {
        title: 'About Us | Astroxadv Advocates',
        description: 'Learn about Astroxadv — a premier law firm dedicated to trusted legal counsel, ethical practice, and exceptional client advocacy.',
    };
}

export default function About() {
    return <AboutClient />;
}
