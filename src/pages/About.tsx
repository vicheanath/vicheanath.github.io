import { Link } from 'react-router-dom';
import { Github, Linkedin } from 'lucide-react';
import Seo from '../components/Seo';
import profileData from '../content/profile.json';
import { GITHUB_URL, SITE_NAME, SITE_URL, SOURCE_REPO_URL } from '../lib/site';

const profile = profileData as {
  name: string;
  headline: string;
  location: string;
  linkedInUrl: string;
  about?: string;
  topSkills?: string[];
};

export default function About() {
  return (
    <section className="page">
      <Seo
        title={`About - ${SITE_NAME}`}
        description="About the site owner, what this blog publishes, and how the site is maintained."
        path="about"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: `About - ${SITE_NAME}`,
            url: `${SITE_URL}/about`,
            description: 'Publisher and site information for the blog.',
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
            sameAs: [profile.linkedInUrl, GITHUB_URL],
            url: SITE_URL,
          },
        ]}
      />

      <header className="page__header">
        <p className="page__eyebrow">About</p>
        <h1 className="page__title">Publisher and site information</h1>
        <p className="page__intro">
          This is an independently maintained software engineering site published by {profile.name}.
          It focuses on original notes, project updates, and practical writing about .NET, frontend
          development, and software delivery.
        </p>
      </header>

      <section className="page__section">
        <h2>Who runs the site</h2>
        <p>
          {profile.name} is a {profile.headline} based in {profile.location}. The site is used to publish
          original technical writing, document project work, and keep a clear public record of ownership,
          policies, and contact channels.
        </p>
        {profile.about && <p>{profile.about}</p>}
        {profile.topSkills && profile.topSkills.length > 0 && (
          <p>
            <strong>Focus areas:</strong> {profile.topSkills.join(' · ')}
          </p>
        )}
      </section>

      <section className="page__section">
        <h2>What readers should expect</h2>
        <p>
          Articles are intended to be original, readable, and specific enough to help working engineers.
          The site is not a guest-post marketplace, a republishing network, or a collection of thin pages
          created only to host ads.
        </p>
        <p>
          When content needs correction or clarification, it should be updated. Site-wide disclosures are
          kept in the <Link to="/privacy">Privacy Policy</Link>,{' '}
          <Link to="/publishing-policy">Publishing Policy</Link>, and{' '}
          <Link to="/advertising">Advertising page</Link>.
        </p>
      </section>

      <section className="page__section">
        <h2>Ownership and transparency</h2>
        <div className="page__link-grid">
          <a href={profile.linkedInUrl} target="_blank" rel="noopener noreferrer" className="page__card-link">
            <Linkedin size={18} aria-hidden />
            <span>
              <strong>LinkedIn</strong>
              <span>Professional profile for the site owner and publisher.</span>
            </span>
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="page__card-link">
            <Github size={18} aria-hidden />
            <span>
              <strong>GitHub</strong>
              <span>Public code, project history, and engineering work.</span>
            </span>
          </a>
          <a href={SOURCE_REPO_URL} target="_blank" rel="noopener noreferrer" className="page__card-link">
            <Github size={18} aria-hidden />
            <span>
              <strong>Site source</strong>
              <span>Repository for the blog itself, including routes and policy pages.</span>
            </span>
          </a>
        </div>
      </section>
    </section>
  );
}
