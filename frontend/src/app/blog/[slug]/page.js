import BlogDetailClient from '@/components/BlogDetailClient';

export function generateMetadata({ params }) {
    return {
        title: `Legal Insight | Astroxadv Advocates`,
        description: `Expert legal analysis and articles by Astroxadv.`,
    };
}

export default function BlogDetail({ params }) {
    return <BlogDetailClient />;
}
