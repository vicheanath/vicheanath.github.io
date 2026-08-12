import { Link } from 'react-router-dom';
import { ArrowLeft, FileSearch } from 'lucide-react';
import Seo from '../components/Seo';
import { SITE_NAME } from '../lib/site';

export default function NotFound() {
  return (
    <section className="page page--not-found">
      <Seo
        title={`Page not found - ${SITE_NAME}`}
        description="The page you requested could not be found."
        path=""
        noindex
      />
      <div className="page__not-found-icon">
        <FileSearch size={42} aria-hidden />
      </div>
      <h1 className="page__title">Page not found</h1>
      <p className="page__intro">
        The address you opened does not match a current page on this site.
      </p>
      <div className="page__actions">
        <Link to="/" className="article__back-link">
          <ArrowLeft size={18} aria-hidden />
          <span>Back to home</span>
        </Link>
        <Link to="/posts" className="article__back-link">
          <span>Browse posts</span>
        </Link>
      </div>
    </section>
  );
}
