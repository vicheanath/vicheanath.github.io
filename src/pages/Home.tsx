import Seo from '../components/Seo';
import HeroSection from '../components/HeroSection';
import FeaturedProjectsSection from '../components/FeaturedProjectsSection';
import BlogPreviewSection from '../components/BlogPreviewSection';
import { profile } from '../content/profile';
import { DEFAULT_DESCRIPTION } from '../lib/site';

export default function Home() {
  return (
    <div className="home-portfolio">
      <Seo
        title={profile.name}
        description={profile.about ?? DEFAULT_DESCRIPTION}
        path=""
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: profile.name,
          description: profile.about ?? DEFAULT_DESCRIPTION,
        }}
      />

      <HeroSection />
      <FeaturedProjectsSection />
      <BlogPreviewSection />
    </div>
  );
}
