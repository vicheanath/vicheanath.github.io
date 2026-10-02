import { Link } from 'react-router-dom';
import { Linkedin, ArrowUpRight } from 'lucide-react';
import Seo from '../components/Seo';
import { DEFAULT_DESCRIPTION, LINKEDIN_URL, SITE_NAME } from '../lib/site';

export default function Contact() {
  return (
    <section className="page">
      <Seo
        title={`Contact - ${SITE_NAME}`}
        description="Information about this technical notes site."
        path="contact"
      />
      <header className="page__header">
        <p className="page__eyebrow">Contact</p>
        <h1 className="page__title">Let&apos;s connect.</h1>
        <p className="page__intro">
          LinkedIn is the best place to learn more about my work and get in touch.
        </p>
      </header>
      <section className="page__section">
        <h2>Find me online</h2>
        <p>{DEFAULT_DESCRIPTION}</p>
        <a
          className="page__card-link"
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin size={18} aria-hidden />
          <span>
            <strong>Vichea Nath on LinkedIn</strong>
            <span>View my professional profile and send a message.</span>
          </span>
          <ArrowUpRight size={16} aria-hidden />
        </a>
        <p>
          For technical corrections, use the source repository or review the{' '}
          <Link to="/privacy">privacy policy</Link>.
        </p>
      </section>
    </section>
  );
}
