import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ArrowLeft, CalendarDays, Clock3, FileX, NotebookPen } from 'lucide-react';
import Seo from '../components/Seo';
import MermaidDiagram from '../components/MermaidDiagram';
import { getPostBySlug } from '../lib/posts';
import { SITE_NAME, SITE_URL } from '../lib/site';

function formatPostDate(date: string) {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(parsed);
}

function getReadingTimeMinutes(body: string) {
  const words = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / 220));
}

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
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          dateModified: post.date,
          author: {
            '@type': 'Person',
            name: SITE_NAME,
          },
          publisher: {
            '@type': 'Person',
            name: SITE_NAME,
          },
          mainEntityOfPage: `${SITE_URL}/post/${post.slug}`,
          url: `${SITE_URL}/post/${post.slug}`,
        }}
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
                return (
                  <figure className="article__code-block">
                    <figcaption className="article__code-label">{language}</figcaption>
                    <div className="article__code-surface">
                      <SyntaxHighlighter
                        style={oneDark}
                        language={language === 'text' ? undefined : language}
                        PreTag="div"
                        customStyle={{
                          margin: 0,
                          padding: '1rem 1.1rem',
                          borderRadius: 0,
                          border: 'none',
                          background: 'transparent',
                        }}
                        codeTagProps={{
                          style: {
                            display: 'block',
                            fontSize: '0.92rem',
                            lineHeight: 1.65,
                            padding: 0,
                            minWidth: 'max-content',
                          },
                        }}
                        showLineNumbers={false}
                      >
                        {source}
                      </SyntaxHighlighter>
                    </div>
                  </figure>
                );
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
          Written by {SITE_NAME}. For privacy, advertising, and publishing disclosures, see the site
          policies linked below.
        </p>
        <div className="article__actions">
          <Link to="/posts" className="article__back-link">
            <ArrowLeft size={18} aria-hidden />
            <span>Back to all posts</span>
          </Link>
          <Link to="/about" className="article__back-link">
            <span>About</span>
          </Link>
          <Link to="/advertising" className="article__back-link">
            <span>Advertising</span>
          </Link>
          <Link to="/privacy" className="article__back-link">
            <span>Privacy Policy</span>
          </Link>
        </div>
      </footer>
    </article>
  );
}
