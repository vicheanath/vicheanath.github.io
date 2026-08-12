import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { SITE_NAME, SITE_URL } from '../lib/site';

export default function Privacy() {
  return (
    <section className="page">
      <Seo
        title={`Privacy Policy - ${SITE_NAME}`}
        description="Privacy policy for vicheanath.github.io: what is collected, what is not, and how to get in touch."
        path="privacy"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `Privacy Policy - ${SITE_NAME}`,
          url: `${SITE_URL}/privacy`,
          description: 'Privacy policy for this personal blog.',
        }}
      />

      <header className="page__header">
        <p className="page__eyebrow">Privacy</p>
        <h1 className="page__title">Privacy Policy</h1>
        <p className="page__intro">
          This is a personal blog. It carries no advertising, no tracking scripts, and no accounts, so
          there is very little to collect in the first place.
        </p>
      </header>

      <section className="page__section">
        <h2>What this site collects</h2>
        <p>
          The site is a set of static pages hosted on GitHub Pages. It does not run advertising code,
          analytics scripts, or third-party trackers, and it does not set cookies of its own.
        </p>
        <p>
          GitHub, as the host, may record standard web server information such as IP address, browser
          type, and requested page in order to serve the site and protect it from abuse. That data is
          handled under GitHub&apos;s own privacy practices and is not available to this site as a
          reader-level profile.
        </p>
      </section>

      <section className="page__section">
        <h2>What this site does not do</h2>
        <p>
          No ads are served. No personal information is sold or shared. There are no logins, comment
          forms, or newsletter sign-ups, so no reader accounts or mailing lists exist.
        </p>
        <p>
          Web fonts are loaded from Google Fonts so the site renders as intended; that request is subject
          to Google&apos;s privacy terms and carries no advertising identifier.
        </p>
      </section>

      <section className="page__section">
        <h2>External links</h2>
        <p>
          Articles and project pages may link to GitHub, LinkedIn, official documentation, or other
          third-party sites. Those websites have their own privacy practices, and this site is not
          responsible for their content or policies.
        </p>
      </section>

      <section className="page__section">
        <h2>Your choices</h2>
        <p>
          You can browse with cookies disabled, use any browser privacy control you prefer, or leave the
          site at any time — nothing on these pages depends on tracking you.
        </p>
      </section>

      <section className="page__section">
        <h2>Contact</h2>
        <p>
          Privacy questions, correction requests, and policy concerns can be sent through the contact
          options listed on the <Link to="/contact">Contact page</Link>.
        </p>
      </section>
    </section>
  );
}
