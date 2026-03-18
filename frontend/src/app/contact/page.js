import ContactClient from '@/components/ContactClient';
import { getPageSeo } from '@/utils/seo';

export async function generateMetadata() {
    const seo = await getPageSeo('contact');
    if (seo) {
        return {
            title: seo.title,
            description: seo.description,
            keywords: seo.keywords,
        };
    }
    return {
        title: 'Contact Us | Astroxadv Advocates',
        description: 'Contact Astroxadv for a free legal consultation. Our attorneys are available Mon-Sat to discuss your legal matters.',
    };
}

export default function Contact() {
    return <ContactClient />;
}
