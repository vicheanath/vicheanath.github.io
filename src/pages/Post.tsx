import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, CalendarDays, Clock3, FileX, NotebookPen, Tag as TagIcon } from 'lucide-react';
import Seo from '../components/Seo';
import CodeBlock from '../components/CodeBlock';
import MermaidDiagram from '../components/MermaidDiagram';
import {
  countWords,
  formatPostDate,
  getPostBySlug,
  getReadingTimeMinutes,
} from '../lib/posts';
import { SITE_NAME, canonicalUrl } from '../lib/site';

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : null;

  if (!post) {
    return (
      <article className="article article--missing">
        <Seo title="Not found — Vichea Nath" path={slug ? `post/${slug}` : ''} />
        <div className="article__missing-icon">
          <FileX size={40} aria-hidden />
        </div>
        <h2>Article not found</h2>
        <p>No bulletin exists at this address.</p>
        <Link to="/" className="article__back-link">
          <ArrowLeft size={18} aria-hidden />
          <span>Back to front page</span>
        </Link>
      </article>
    );
  }

  const publishedLabel = formatPostDate(post.date);
  const readingTime = getReadingTimeMinutes(post.body);

  return (
    <article className="article">
      <Seo
        title={`${post.title} — ${SITE_NAME}`}
        description={post.excerpt}
        path={`post/${post.slug}`}
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
            mainEntityOfPage: canonicalUrl(`post/${post.slug}`),
            url: canonicalUrl(`post/${post.slug}`),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: canonicalUrl() },
              { '@type': 'ListItem', position: 2, name: 'Posts', item: canonicalUrl('posts') },
              {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: canonicalUrl(`post/${post.slug}`),
              },
            ],
          },
        ]}
      />
      <Link to="/posts" className="article__crumb">
        <ArrowLeft size={16} aria-hidden />
        <span>All posts</span>
      </Link>

      <header className="article__header article__header--hero">
        <p className="article__eyebrow">Technical bulletin</p>
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

      <footer className="article__footer">
        <p className="article__byline">
          Written by {SITE_NAME}. For privacy and publishing disclosures, see the site policies linked
          below.
        </p>
        <div className="article__actions">
          <Link to="/posts" className="article__back-link">
            <ArrowLeft size={18} aria-hidden />
            <span>Back to all posts</span>
          </Link>
          <Link to="/about" className="article__back-link">
            <span>About</span>
          </Link>
          <Link to="/privacy" className="article__back-link">
            <span>Privacy Policy</span>
          </Link>
        </div>
      </footer>
    </article>
  );
}
