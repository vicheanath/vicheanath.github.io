import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, CalendarDays, Clock3, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { getAllPosts, formatPostDate, getReadingTimeMinutes } from '../lib/posts';

export default function BlogPreviewSection() {
  const posts = getAllPosts().slice(0, 4);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (typeof window === 'undefined' || !container) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            '.blog-preview-card',
            { y: 25, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: 'power2.out', clearProps: 'opacity,transform' }
          );
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="blog-preview-section" id="blog-preview" ref={containerRef}>
      <div className="section-header">
        <div className="section-badge">
          <Newspaper size={14} aria-hidden />
          <span>Engineering Journal</span>
        </div>
        <h2 className="section-title">
          Latest Architecture <span className="text-highlight">Bulletins</span>
        </h2>
        <p className="section-subtitle">
          Notes from day-to-day engineering: backend patterns in C# .NET, CQRS, frontend performance, and what holds up in production.
        </p>
      </div>

      <div className="blog-preview-grid">
        {posts.map((post) => {
          const dateLabel = formatPostDate(post.date);
          const readingTime = getReadingTimeMinutes(post.body);

          return (
            <article key={post.slug} className="blog-preview-card">
              <div className="blog-preview-card__meta">
                <span className="blog-preview-card__date">
                  <CalendarDays size={13} aria-hidden />
                  <time dateTime={post.date}>{dateLabel}</time>
                </span>
                <span className="blog-preview-card__time">
                  <Clock3 size={13} aria-hidden />
                  {readingTime} min read
                </span>
              </div>

              <h3 className="blog-preview-card__title">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>

              <p className="blog-preview-card__excerpt">{post.excerpt}</p>

              <div className="blog-preview-card__footer">
                <div className="blog-preview-card__tags">
                  {post.tags.slice(0, 2).map((t) => (
                    <span key={t.slug} className="tag tag--xs">
                      {t.name}
                    </span>
                  ))}
                </div>
                <Link to={`/blog/${post.slug}`} className="blog-preview-card__link">
                  <span>Read bulletin</span>
                  <ArrowRight size={14} aria-hidden />
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      <div className="section-footer">
        <Link to="/blog" className="btn btn--primary">
          <span>Explore All 14+ Engineering Bulletins</span>
          <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </section>
  );
}
