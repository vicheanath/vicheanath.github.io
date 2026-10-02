import { ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__content">
        <p className="hero__eyebrow">Vichea Nath / Technical notes</p>
        <h1 className="hero__title">
          Notes on building <span className="hero__title-accent">useful software</span>.
        </h1>
        <p className="hero__subtitle">
          Short, practical notes about architecture, backend systems, frontend development, and code that lasts.
        </p>
        <div className="hero__actions">
          <a href="#featured-projects" className="btn btn--primary">
            <span>Browse projects</span>
            <ArrowRight size={16} aria-hidden />
          </a>
          <Link to="/blog" className="btn btn--secondary">
            <BookOpen size={16} aria-hidden />
            <span>Read notes</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
