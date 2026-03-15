import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import {
  ADSENSE_CLIENT,
  ADSENSE_ENABLED,
  ADSENSE_PUBLISHER_ID,
  SITE_NAME,
  SITE_URL,
} from '../lib/site';

export default function Advertising() {
  return (
    <section className="page">
      <Seo
        title={`Advertising - ${SITE_NAME}`}
        description="Advertising standards, AdSense status, and monetization rules for the site."
        path="advertising"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `Advertising - ${SITE_NAME}`,
          url: `${SITE_URL}/advertising`,
          description: 'Advertising and monetization disclosures for the blog.',
        }}
      />

      <header className="page__header">
        <p className="page__eyebrow">Advertising</p>
        <h1 className="page__title">Advertising and AdSense standards</h1>
        <p className="page__intro">
          This page explains how ads are handled on the site, what standards apply to placement and reader
          experience, and how the current AdSense setup is being managed.
        </p>
      </header>

      <section className="page__section">
        <h2>Current ad status</h2>
        {ADSENSE_ENABLED ? (
          <>
            <p>
              Google AdSense code is currently enabled for this site under publisher account{' '}
              <code>{ADSENSE_CLIENT}</code>.
            </p>
            <p>
              Ads should appear only in placements that are visually separate from navigation, body copy,
              and code examples.
            </p>
          </>
        ) : (
          <>
            <p>
              Google AdSense is configured for this site, but ad code is currently disabled in the frontend
              until regional consent tooling and final placement review are ready.
            </p>
            <p>
              The associated publisher identifiers are <code>{ADSENSE_CLIENT}</code> and{' '}
              <code>{ADSENSE_PUBLISHER_ID}</code> for the site&apos;s <code>ads.txt</code> declaration.
            </p>
          </>
        )}
      </section>

      <section className="page__section">
        <h2>Placement and click policy</h2>
        <p>
          Ads should never be disguised as navigation, download buttons, code samples, or article controls.
          Readers are not asked to click ads, refresh pages to generate ads, or interact with advertising
          in exchange for content access.
        </p>
        <p>
          Any future ad placements should stay clearly separated from content blocks, especially on mobile
          layouts where accidental taps are more likely.
        </p>
      </section>

      <section className="page__section">
        <h2>Content and monetization standards</h2>
        <p>
          The site is intended to earn trust first and monetize second. Articles should remain original and
          useful on their own, with monetization treated as secondary to readability, clarity, and site
          credibility.
        </p>
        <p>
          The site should not publish scraped, spun, misleading, or ad-heavy pages created primarily to
          capture ad impressions.
        </p>
      </section>

      <section className="page__section">
        <h2>Consent and privacy</h2>
        <p>
          If Google ads are enabled in the future, privacy and consent disclosures remain available on the{' '}
          <Link to="/privacy">Privacy Policy</Link>. The site should not turn ad serving back on until the
          required consent flow for applicable regions is ready.
        </p>
      </section>

      <section className="page__section">
        <h2>Questions or concerns</h2>
        <p>
          If you notice a misleading placement, missing disclosure, or policy issue, use the{' '}
          <Link to="/contact">Contact page</Link> to report it.
        </p>
      </section>
    </section>
  );
}
