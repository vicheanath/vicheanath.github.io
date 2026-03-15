import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ArrowLeft, FileX } from 'lucide-react';
import Seo from '../components/Seo';
import { getPostBySlug } from '../lib/posts';
import { SITE_NAME, SITE_URL } from '../lib/site';

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
      <header className="article__header">
        <h1 className="article__title">{post.title}</h1>
        <time className="article__date" dateTime={post.date}>
          {post.date}
        </time>
      </header>
      <div className="article__body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              const isBlock = match != null;
              if (isBlock) {
                return (
                  <div className="article__code-block">
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{ margin: 0, padding: 0, borderRadius: '4px', borderLeft: '3px solid var(--ink-muted)' }}
                      codeTagProps={{ style: { fontSize: '0.9rem', lineHeight: 1.5, padding: 0 } }}
                      showLineNumbers={false}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
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
