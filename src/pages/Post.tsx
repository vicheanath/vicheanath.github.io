import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ArrowLeft, FileX } from 'lucide-react';
import Seo from '../components/Seo';
import { getPostBySlug } from '../lib/posts';

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
      <Seo title={`${post.title} — Vichea Nath`} description={post.excerpt} path={`post/${post.slug}`} />
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
            code({ node, className, children, ...props }) {
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
        <Link to="/" className="article__back-link">
          <ArrowLeft size={18} aria-hidden />
          <span>Back to front page</span>
        </Link>
      </footer>
    </article>
  );
}
