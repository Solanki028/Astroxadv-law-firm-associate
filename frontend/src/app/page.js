import HomeClient from '@/components/HomeClient';
import { getPageSeo } from '@/utils/seo';

export async function generateMetadata() {
  const seo = await getPageSeo('home');
  if (seo) {
    return {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
    };
  }
  return {
    title: 'Home | Astroxadv Law Firm',
    description: 'Astroxadv is a premier law firm delivering trusted legal counsel across corporate, civil, criminal, and family law.',
  };
}

async function fetchHomeData() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  try {
    const [heroRes, servicesRes, testimonialsRes, aboutRes, blogsRes] = await Promise.all([
      fetch(`${baseUrl}/content/home_hero`, { next: { revalidate: 60 } }),
      fetch(`${baseUrl}/services`, { next: { revalidate: 60 } }),
      fetch(`${baseUrl}/testimonials`, { next: { revalidate: 60 } }),
      fetch(`${baseUrl}/content/about_us`, { next: { revalidate: 60 } }),
      fetch(`${baseUrl}/blogs`, { next: { revalidate: 60 } }),
    ]);

    const heroData = heroRes.ok ? await heroRes.json() : null;
    const servicesData = servicesRes.ok ? await servicesRes.json() : null;
    const testimonialsData = testimonialsRes.ok ? await testimonialsRes.json() : null;
    const aboutData = aboutRes.ok ? await aboutRes.json() : null;
    const blogsData = blogsRes.ok ? await blogsRes.json() : null;

    return { heroData, servicesData, testimonialsData, aboutData, blogsData };
  } catch (error) {
    console.error('Error fetching SSR home data:', error);
    return null;
  }
}

export default async function Home() {
  const initialData = await fetchHomeData();
  return <HomeClient initialData={initialData} />;
}
