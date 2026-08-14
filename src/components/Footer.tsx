import { Link } from 'react-router-dom';
import { Github, Linkedin, Rss, Terminal, ArrowUpRight } from 'lucide-react';
import { profile } from '../content/profile';
import { GITHUB_URL, SOURCE_REPO_URL } from '../lib/site';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div className="site-footer__brand-col">
          <div className="site-footer__logo">
            <span className="site-footer__logo-mark">VN</span>
            <span className="site-footer__name">{profile.name}</span>
          </div>
          <p className="site-footer__desc">
            Senior-level Full-Stack Software Engineer building scalable .NET cloud microservices, Clean Architecture backends, and responsive React web experiences.
          </p>
          <div className="site-footer__status-badge">
            <span className="site-footer__status-pulse" />
            <span>Shipping high-impact software @ CED</span>
          </div>
        </div>

        <div className="site-footer__col">
          <h4 className="site-footer__title">Exploration</h4>
          <ul className="site-footer__list">
            <li><Link to="/">Portfolio Home</Link></li>
            <li><Link to="/about">About &amp; Résumé</Link></li>
            <li><Link to="/projects">Featured Projects</Link></li>
            <li><Link to="/blog">Engineering Blog</Link></li>
            <li><Link to="/contact">Get in Touch</Link></li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h4 className="site-footer__title">Connect &amp; Code</h4>
          <ul className="site-footer__list">
            <li>
              <a href={profile.linkedInUrl} target="_blank" rel="noopener noreferrer">
                <Linkedin size={14} aria-hidden />
                <span>LinkedIn</span>
                <ArrowUpRight size={12} className="site-footer__arrow" />
              </a>
            </li>
            <li>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <Github size={14} aria-hidden />
                <span>GitHub</span>
                <ArrowUpRight size={12} className="site-footer__arrow" />
              </a>
            </li>
            <li>
              <a href={SOURCE_REPO_URL} target="_blank" rel="noopener noreferrer">
                <Terminal size={14} aria-hidden />
                <span>Source Code</span>
                <ArrowUpRight size={12} className="site-footer__arrow" />
              </a>
            </li>
            <li>
              <a href="/rss.xml" target="_blank" rel="alternate" type="application/rss+xml">
                <Rss size={14} aria-hidden />
                <span>RSS Feed</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h4 className="site-footer__title">Engineering Stack</h4>
          <div className="site-footer__tags">
            <span className="footer-tag">C# .NET 9</span>
            <span className="footer-tag">Clean Architecture</span>
            <span className="footer-tag">CQRS &amp; MediatR</span>
            <span className="footer-tag">React 19 &amp; TypeScript</span>
            <span className="footer-tag">PostgreSQL &amp; Redis</span>
            <span className="footer-tag">Azure &amp; Docker</span>
            <span className="footer-tag">CI/CD Pipelines</span>
          </div>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p className="site-footer__copy">
          &copy; {currentYear} {profile.name}. All original articles and projects reserved.
        </p>
        <div className="site-footer__legal">
          <Link to="/privacy">Privacy Policy</Link>
          <span>&middot;</span>
          <Link to="/publishing-policy">Publishing Policy</Link>
          <span>&middot;</span>
          <a href="#main">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
