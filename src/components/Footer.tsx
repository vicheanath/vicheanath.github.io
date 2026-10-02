import { Link } from 'react-router-dom';
import { Linkedin } from 'lucide-react';
import { LINKEDIN_URL, SITE_NAME } from '../lib/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <span>{SITE_NAME}</span>
        <nav aria-label="Footer navigation">
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
            <Linkedin size={14} aria-hidden /> LinkedIn
          </a>
          <Link to="/privacy">Privacy</Link>
          <Link to="/publishing-policy">Publishing policy</Link>
          <a href="#main">Back to top</a>
        </nav>
      </div>
    </footer>
  );
}
