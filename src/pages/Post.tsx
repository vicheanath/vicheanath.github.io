import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, CalendarDays, Clock3, FileX, NotebookPen, Tag as TagIcon, Share2, Check, ArrowRight } from 'lucide-react';
import Seo from '../components/Seo';
import CodeBlock from '../components/CodeBlock';
import MermaidDiagram from '../components/MermaidDiagram';
import {
  countWords,
  formatPostDate,
  getAllPosts,
  getPostBySlug,
  getReadingTimeMinutes,
} from '../lib/posts';
import { SITE_NAME, canonicalUrl } from '../lib/site';

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : null;
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress(Number((totalScroll / windowHeight).toFixed(3)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return (
      <article className="article article--missing">
        <Seo title="Not found — Vichea Nath" path={slug ? `blog/${slug}` : ''} />
        <div className="article__missing-icon">
          <FileX size={40} aria-hidden />
        </div>
        <h2>Article not found</h2>
        <p>No bulletin exists at this address.</p>
        <Link to="/blog" className="btn btn--primary">
          <ArrowLeft size={16} aria-hidden />
          <span>Back to engineering blog</span>
        </Link>
      </article>
    );
  }

  const publishedLabel = formatPostDate(post.date);
  const readingTime = getReadingTimeMinutes(post.body);
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.some((pt) => pt.slug === t.slug)))
    .slice(0, 2);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div
        className="reading-progress-bar"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      <article className="article">
        <Seo
          title={`${post.title} — ${SITE_NAME}`}
          description={post.excerpt}
          path={`blog/${post.slug}`}
          type="article"
          publishedTime={post.date}
          jsonLd={[
            {
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.excerpt,
              datePublished: post.date,
              dateModified: post.date,
              wordCount: countWords(post.body),
              timeRequired: `PT${readingTime}M`,
              inLanguage: 'en-US',
              author: {
                '@type': 'Person',
                name: SITE_NAME,
              },
              publisher: {
                '@type': 'Person',
                name: SITE_NAME,
              },
              keywords: post.tags.map((tag) => tag.name).join(', '),
              mainEntityOfPage: canonicalUrl(`blog/${post.slug}`),
              url: canonicalUrl(`blog/${post.slug}`),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: canonicalUrl() },
                { '@type': 'ListItem', position: 2, name: 'Blog', item: canonicalUrl('blog') },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: post.title,
                  item: canonicalUrl(`blog/${post.slug}`),
                },
              ],
            },
          ]}
        />

        <div className="article__top-nav">
          <Link to="/blog" className="article__crumb">
            <ArrowLeft size={16} aria-hidden />
            <span>All bulletins</span>
          </Link>
          <button
            type="button"
            className="article__share-btn"
            onClick={handleShare}
            aria-label="Copy link to this bulletin"
            title="Copy link"
          >
            {copied ? <Check size={14} className="text-success" /> : <Share2 size={14} />}
            <span>{copied ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>

        <header className="article__header article__header--hero">
          <div className="article__badge-row">
            <span className="article__eyebrow">Technical bulletin</span>
            <span className="article__reading-pill">{readingTime} min read</span>
          </div>
          <h1 className="article__title">{post.title}</h1>
          <p className="article__excerpt">{post.excerpt}</p>
          <div className="article__meta">
            <span className="article__meta-item">
              <CalendarDays size={15} aria-hidden />
              <time className="article__date" dateTime={post.date}>
                {publishedLabel}
              </time>
            </span>
            <span className="article__meta-item">
              <Clock3 size={15} aria-hidden />
              <span>{readingTime} min read</span>
            </span>
            <span className="article__meta-item">
              <NotebookPen size={15} aria-hidden />
              <span>Original article by {SITE_NAME}</span>
            </span>
          </div>
          {post.tags.length > 0 && (
            <nav className="tag-row tag-row--article" aria-label="Post tags">
              <TagIcon size={15} aria-hidden className="tag-row__icon" />
              {post.tags.map((tag) => (
                <Link key={tag.slug} to={`/tag/${tag.slug}`} className="tag">
                  {tag.name}
                </Link>
              ))}
            </nav>
          )}
        </header>

        <div className="article__body">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children, ...props }) {
                const source = String(children).replace(/\n$/, '');
                const match = /language-(\w+)/.exec(className || '');
                const language = match?.[1]?.toLowerCase() ?? 'text';
                const isBlock = match != null || source.includes('\n');

                if (language === 'mermaid') {
                  return <MermaidDiagram key={source} chart={source} />;
                }

                if (isBlock) {
                  return <CodeBlock language={language} source={source} />;
                }

                return (
                  <code className={className ?? ''} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {post.body}
          </ReactMarkdown>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="article__related">
            <h3 className="article__related-title">Related Architecture Bulletins</h3>
            <div className="article__related-grid">
              {relatedPosts.map((rel) => (
                <div key={rel.slug} className="article__related-card">
                  <span className="article__related-date">{formatPostDate(rel.date)}</span>
                  <h4 className="article__related-name">
                    <Link to={`/blog/${rel.slug}`}>{rel.title}</Link>
                  </h4>
                  <p className="article__related-excerpt">{rel.excerpt}</p>
                  <Link to={`/blog/${rel.slug}`} className="article__related-link">
                    <span>Read bulletin</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        <footer className="article__footer">
          <p className="article__byline">
            Written by {SITE_NAME} · Software Engineer @ CED. Original technical writing based on production .NET and React architecture.
          </p>
          <div className="article__actions">
            <Link to="/blog" className="article__back-link">
              <ArrowLeft size={18} aria-hidden />
              <span>Back to all bulletins</span>
            </Link>
            <Link to="/about" className="article__back-link">
              <span>About &amp; Résumé</span>
            </Link>
            <Link to="/contact" className="article__back-link">
              <span>Contact</span>
            </Link>
          </div>
        </footer>
      </article>
    </>
  );
}
