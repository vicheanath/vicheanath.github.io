import Seo from '../components/Seo';
import HeroSection from '../components/HeroSection';
import ArchitectureShowcase from '../components/ArchitectureShowcase';
import SkillsMatrix from '../components/SkillsMatrix';
import InteractivePlayground from '../components/InteractivePlayground';
import FeaturedProjectsSection from '../components/FeaturedProjectsSection';
import ExperienceTimeline from '../components/ExperienceTimeline';
import BlogPreviewSection from '../components/BlogPreviewSection';
import { profile } from '../content/profile';
import { DEFAULT_DESCRIPTION, GITHUB_URL, LINKEDIN_URL, canonicalUrl } from '../lib/site';

export default function Home() {
  return (
    <div className="home-portfolio">
      <Seo
        title={`${profile.name} — Full-Stack & Frontend Engineer`}
        description={profile.about ?? DEFAULT_DESCRIPTION}
        path=""
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: `${profile.name} — Full-Stack & Frontend Engineer`,
            url: canonicalUrl(),
            description: profile.about ?? DEFAULT_DESCRIPTION,
            inLanguage: 'en-US',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: profile.name,
            jobTitle: profile.headline,
            homeLocation: {
              '@type': 'Place',
              name: profile.location,
            },
            sameAs: [profile.linkedInUrl, GITHUB_URL, LINKEDIN_URL],
            url: canonicalUrl(),
            knowsAbout: [
              'C#',
              '.NET Core',
              'ASP.NET Core',
              'Domain-Driven Design (DDD)',
              'Clean Architecture',
              'CQRS',
              'MediatR',
              'React',
              'TanStack React Query',
              'TypeScript',
              'GSAP',
              'Entity Framework Core',
              'Transactional Outbox Pattern',
              'Microsoft Azure',
              'SQL Server',
              'Microservices',
            ],
          },
        ]}
      />

      {/* Hero with GSAP, Animated Dev Terminal, and Status */}
      <HeroSection />

      {/* Interactive Full-Stack System Architecture Simulator */}
      <ArchitectureShowcase />

      {/* Interactive Skills Matrix & Tech Radar */}
      <SkillsMatrix />

      {/* Live Interactive Code Playground */}
      <InteractivePlayground />

      {/* Featured Projects & Open Source */}
      <FeaturedProjectsSection />

      {/* Career Trajectory & Experience Timeline */}
      <ExperienceTimeline />

      {/* Latest Technical Bulletins / Blog Preview */}
      <BlogPreviewSection />
    </div>
  );
}
