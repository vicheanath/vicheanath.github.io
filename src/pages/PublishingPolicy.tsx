import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { SITE_NAME, SITE_URL } from '../lib/site';

export default function PublishingPolicy() {
  return (
    <section className="page">
      <Seo
        title={`Publishing Policy - ${SITE_NAME}`}
        description="How content is selected, written, corrected, and disclosed on vicheanath.github.io."
        path="publishing-policy"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `Publishing Policy - ${SITE_NAME}`,
          url: `${SITE_URL}/publishing-policy`,
          description: 'Editorial policy for the blog.',
        }}
      />

      <header className="page__header">
        <p className="page__eyebrow">Publishing</p>
        <h1 className="page__title">Publishing Policy</h1>
        <p className="page__intro">
          This site exists to publish practical, readable software notes with clear ownership and honest
          disclosures. The goal is simply to keep the blog useful for the people who read it.
        </p>
      </header>

      <section className="page__section">
        <h2>What gets published</h2>
        <p>
          Posts focus on software engineering topics such as architecture, .NET, React, backend design,
          developer workflows, and project learnings. Content is selected based on hands-on experience,
          ongoing study, or direct experimentation.
        </p>
        <p>
          The site does not publish spun articles, scraped material, or placeholder pages.
        </p>
      </section>

      <section className="page__section">
        <h2>Originality and attribution</h2>
        <p>
          Articles are written as original summaries, explanations, or walkthroughs. If outside sources are
          referenced, they should be linked and attributed. Quotes, code, or ideas from other publishers are
          not presented as if they were original work.
        </p>
      </section>

      <section className="page__section">
        <h2>Corrections and updates</h2>
        <p>
          If an article contains a factual mistake, outdated recommendation, or broken example, it should be
          corrected when identified. Readers can report issues through the <Link to="/contact">Contact page</Link>.
        </p>
      </section>

      <section className="page__section">
        <h2>No advertising or sponsorship</h2>
        <p>
          This is a personal, non-commercial blog. It carries no advertising, no sponsored posts, no paid
          placements, and no affiliate links. If that ever changes, the relevant page or article will
          carry a clear disclosure.
        </p>
      </section>

      <section className="page__section">
        <h2>Reader experience</h2>
        <p>
          Pages should remain easy to navigate on desktop and mobile, with clear headings, readable text,
          accessible links, and working internal routes. Important site information should always be easy to
          find, including the <Link to="/privacy">Privacy Policy</Link> and contact details.
        </p>
      </section>

      <section className="page__section">
        <h2>Professional disclaimer</h2>
        <p>
          Content on this site is for informational and educational purposes only. It does not create a
          client relationship and should not be treated as legal, tax, security, or other regulated advice.
        </p>
      </section>
    </section>
  );
}
