import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { ADSENSE_CLIENT, ADSENSE_ENABLED, SITE_NAME, SITE_URL } from '../lib/site';

export default function Privacy() {
  return (
    <section className="page">
      <Seo
        title={`Privacy Policy - ${SITE_NAME}`}
        description="Privacy policy for vicheanath.github.io, including cookies, analytics, and Google AdSense disclosures."
        path="privacy"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: `Privacy Policy - ${SITE_NAME}`,
          url: `${SITE_URL}/privacy`,
          description: 'Privacy policy for the blog and advertising disclosures.',
        }}
      />

      <header className="page__header">
        <p className="page__eyebrow">Privacy</p>
        <h1 className="page__title">Privacy Policy</h1>
        <p className="page__intro">
          This page explains what data may be collected when you visit this site, how advertising may
          work, and where to go if you have questions about privacy.
        </p>
      </header>

      <section className="page__section">
        <h2>Information collected automatically</h2>
        <p>
          Like most websites, this site may collect basic technical information such as your browser type,
          device type, referring page, approximate location, and page visits through standard web server
          logs or services provided by hosting and advertising partners.
        </p>
        <p>
          That information is used to keep the site available, understand which pages are useful, prevent
          abuse, and improve the reading experience.
        </p>
      </section>

      <section className="page__section">
        <h2>Cookies and advertising</h2>
        {ADSENSE_ENABLED ? (
          <p>
            This site currently uses Google AdSense and may display ads provided by Google or its partners.
            Third-party vendors, including Google, may use cookies to serve ads based on a visitor&apos;s prior
            visits to this website or other websites.
          </p>
        ) : (
          <p>
            This site is prepared for Google AdSense, but Google ad code is currently disabled while
            consent tooling and final ad placement review are completed. If ads are enabled later,
            third-party vendors, including Google, may use cookies to serve ads based on a visitor&apos;s prior
            visits to this website or other websites.
          </p>
        )}
        <p>
          Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit
          to this site and other sites on the Internet. You can learn more in{' '}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
          >
            How Google uses information from sites or apps that use its services
          </a>
          .
        </p>
        <p>
          You can manage ad personalization through{' '}
          <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">
            Google Ads Settings
          </a>{' '}
          and learn more about broader opt-out options at{' '}
          <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
            aboutads.info/choices
          </a>
          .
        </p>
      </section>

      <section className="page__section">
        <h2>AdSense account disclosure</h2>
        <p>
          The publisher account associated with this site is <code>{ADSENSE_CLIENT}</code>. Ads may appear
          on some pages in the future to help cover hosting and publishing costs, but ad serving is
          currently {ADSENSE_ENABLED ? 'enabled' : 'disabled'} in the site frontend.
        </p>
        <p>
          This site does not intentionally collect sensitive personal information for advertising purposes,
          and it does not sell private reader information directly.
        </p>
        <p>
          If advertising is re-enabled, the site should not resume Google ad serving in regions that
          require consent until the appropriate consent flow is in place.
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
          You can disable cookies in your browser, use browser privacy controls, or leave the site at any
          time. Depending on your region, you may also have additional privacy rights under local law.
        </p>
      </section>

      <section className="page__section">
        <h2>Contact</h2>
        <p>
          Privacy questions, correction requests, and policy concerns can be sent through the contact
          options listed on the <Link to="/contact">Contact page</Link>. Monetization-specific details are
          also summarized on the <Link to="/advertising">Advertising page</Link>.
        </p>
      </section>
    </section>
  );
}
