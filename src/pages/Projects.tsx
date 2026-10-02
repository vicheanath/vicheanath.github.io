import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { SITE_NAME } from '../lib/site';

export default function Projects() {
  return (
    <section className="projects-page">
      <Seo
        title={`Projects - ${SITE_NAME}`}
        description="A small index of software topics and project patterns."
        path="projects"
      />
      <div className="section-header">
        <p className="section-badge">Projects</p>
        <h1 className="section-title">Small, focused <span className="text-highlight">experiments</span>.</h1>
        <p className="section-subtitle">
          Personal repositories and identifying links are intentionally not published here.
          The public material stays focused on reusable technical ideas.
        </p>
      </div>
      <div className="page__section">
        <h2>Browse the notes</h2>
        <p>Read the technical bulletins for examples, patterns, and implementation details.</p>
        <Link to="/blog" className="btn btn--primary">Read notes</Link>
      </div>
    </section>
  );
}
