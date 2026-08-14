import { useMemo, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Search, Tags, X, Calendar, Clock3, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import gsap from 'gsap';
import Seo from '../components/Seo';
import PostList from '../components/PostList';
import { getAllPosts, getAllTags, formatPostDate, getReadingTimeMinutes } from '../lib/posts';
import { SITE_NAME, canonicalUrl } from '../lib/site';

export default function Posts() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const [query, setQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const term = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    let list = posts;

    if (selectedTag) {
      list = list.filter((p) => p.tags.some((t) => t.slug === selectedTag));
    }

    if (term) {
      list = list.filter((post) => {
        const haystack = [post.title, post.excerpt, ...post.tags.map((tag) => tag.name)]
          .join(' ')
          .toLowerCase();
        return haystack.includes(term);
      });
    }

    return list;
  }, [posts, selectedTag, term]);

  const featuredPost = posts[0];

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.blog-featured-card, .filter-bar, .post-list__item',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power2.out', clearProps: 'opacity,transform' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [selectedTag, term]);

  return (
    <section className="blog-page" ref={containerRef}>
      <Seo
        title={`Engineering Blog — ${SITE_NAME}`}
        description="Articles and technical bulletins on software architecture, C# .NET Core, React, and day-to-day engineering practice."
        path="blog"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: `Engineering Blog — ${SITE_NAME}`,
          url: canonicalUrl('blog'),
          blogPost: posts.map((post) => ({
            '@type': 'BlogPosting',
            headline: post.title,
            datePublished: post.date,
            url: canonicalUrl(`blog/${post.slug}`),
          })),
        }}
      />

      <div className="section-header">
        <div className="section-badge">
          <Newspaper size={14} aria-hidden />
          <span>Engineering Journal</span>
        </div>
        <h1 className="section-title">
          Technical Bulletins &amp; <span className="text-highlight">Architecture Notes</span>
        </h1>
        <p className="section-subtitle">
          In-depth notes on distributed .NET systems, Clean Architecture, CQRS, reactive React frontend performance, and production battle-testing.
        </p>
      </div>

      {/* Featured Bulletin Banner (Shown when no search is active) */}
      {!term && !selectedTag && featuredPost && (
        <div className="blog-featured-card">
          <div className="blog-featured-card__badge">
            <Sparkles size={13} aria-hidden />
            <span>Featured Bulletin</span>
          </div>
          <div className="blog-featured-card__meta">
            <span className="blog-meta-item">
              <Calendar size={13} aria-hidden />
              <time dateTime={featuredPost.date}>{formatPostDate(featuredPost.date)}</time>
            </span>
            <span className="blog-meta-item">
              <Clock3 size={13} aria-hidden />
              <span>{getReadingTimeMinutes(featuredPost.body)} min read</span>
            </span>
          </div>
          <h2 className="blog-featured-card__title">
            <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
          </h2>
          <p className="blog-featured-card__excerpt">{featuredPost.excerpt}</p>
          <div className="blog-featured-card__footer">
            <div className="tag-row">
              {featuredPost.tags.map((t) => (
                <button
                  key={t.slug}
                  type="button"
                  className="tag"
                  onClick={() => setSelectedTag(t.slug)}
                >
                  {t.name}
                </button>
              ))}
            </div>
            <Link to={`/blog/${featuredPost.slug}`} className="btn btn--sm btn--primary">
              <BookOpen size={14} aria-hidden />
              <span>Read Full Article</span>
              <ArrowRight size={14} aria-hidden />
            </Link>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="filter-bar">
        <div className="filter-bar__search">
          <Search size={16} aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search bulletins by keyword, pattern, or topic..."
            aria-label="Search posts"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} aria-label="Clear search">
              <X size={15} aria-hidden />
            </button>
          )}
        </div>

        {tags.length > 0 && (
          <div className="filter-bar__tags">
            <span className="filter-bar__label">
              <Tags size={14} aria-hidden />
              <span>Filter Topic:</span>
            </span>
            <div className="tag-row">
              <button
                type="button"
                className={`tag ${selectedTag === null ? 'tag--active' : ''}`}
                onClick={() => setSelectedTag(null)}
              >
                All Topics ({posts.length})
              </button>
              {tags.map((tag) => (
                <button
                  key={tag.slug}
                  type="button"
                  className={`tag ${selectedTag === tag.slug ? 'tag--active' : ''}`}
                  onClick={() => setSelectedTag(selectedTag === tag.slug ? null : tag.slug)}
                >
                  {tag.name}
                  <span className="tag__count">{tag.count}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {(term || selectedTag) && (
        <div className="filter-bar__status" role="status">
          <span>
            {filtered.length} {filtered.length === 1 ? 'bulletin' : 'bulletins'} matching
            {term ? ` “${query.trim()}”` : ''}
            {selectedTag ? ` in #${selectedTag}` : ''}
          </span>
          <button
            type="button"
            className="filter-bar__reset-btn"
            onClick={() => {
              setQuery('');
              setSelectedTag(null);
            }}
          >
            Reset filter
          </button>
        </div>
      )}

      <PostList
        posts={filtered}
        emptyMessage={term || selectedTag ? 'No bulletins match that filter.' : 'No bulletins yet. Check back soon.'}
      />
    </section>
  );
}
