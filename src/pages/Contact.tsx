import { Link } from 'react-router-dom';
import { Github, Linkedin, MessageSquareText } from 'lucide-react';
import Seo from '../components/Seo';
import profileData from '../content/profile.json';
import { DEFAULT_DESCRIPTION, GITHUB_URL, SITE_NAME, SITE_URL, SOURCE_REPO_URL } from '../lib/site';

const profile = profileData as {
  name: string;
  headline: string;
  location: string;
  linkedInUrl: string;
};

export default function Contact() {
  return (
    <section className="page">
      <Seo
        title={`Contact - ${SITE_NAME}`}
        description="Ways to contact Vichea Nath about the blog, software work, and corrections."
        path="contact"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: `Contact ${SITE_NAME}`,
          url: `${SITE_URL}/contact`,
          description: 'Contact information for the blog owner and publisher.',
        }}
      />

      <header className="page__header">
        <p className="page__eyebrow">Contact</p>
        <h1 className="page__title">Reach the site owner</h1>
        <p className="page__intro">
          This blog is written and maintained by {profile.name}. If you want to talk about an article,
          report an issue, or discuss software work, these are the best places to reach out.
        </p>
      </header>

      <section className="page__section">
        <h2>Primary contact options</h2>
        <div className="page__link-grid">
          <a href={profile.linkedInUrl} target="_blank" rel="noopener noreferrer" className="page__card-link">
            <Linkedin size={18} aria-hidden />
            <span>
              <strong>LinkedIn</strong>
              <span>Professional messages and collaboration inquiries.</span>
            </span>
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="page__card-link">
            <Github size={18} aria-hidden />
            <span>
              <strong>GitHub</strong>
              <span>Code, repositories, and project history.</span>
            </span>
          </a>
          <a href={SOURCE_REPO_URL} target="_blank" rel="noopener noreferrer" className="page__card-link">
            <MessageSquareText size={18} aria-hidden />
            <span>
              <strong>Site source</strong>
              <span>Open an issue if you spot a broken link, typo, or technical problem.</span>
            </span>
          </a>
        </div>
      </section>

      <section className="page__section">
        <h2>What this site is for</h2>
        <p>
          The site focuses on original notes about software architecture, .NET, React, and personal
          projects. It is not a generic content farm or guest-post network. Every page is intended to be
          readable, useful, and clearly attributable to a real publisher.
        </p>
        <p>
          {profile.headline} based in {profile.location}. For privacy, this site does not publish a direct
          email address in plain text, but the channels above are actively monitored.
        </p>
      </section>

      <section className="page__section">
        <h2>Policies</h2>
        <p>
          For advertising, cookies, and data handling details, read the <Link to="/privacy">Privacy Policy</Link>.
          For how content is written, corrected, and disclosed, read the{' '}
          <Link to="/publishing-policy">Publishing Policy</Link>.
        </p>
        <p className="page__muted">{DEFAULT_DESCRIPTION}</p>
      </section>
    </section>
  );
}
