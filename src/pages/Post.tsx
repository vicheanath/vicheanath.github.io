import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, FileX } from 'lucide-react';
import { getPostBySlug } from '../lib/posts';

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : null;

  if (!post) {
    return (
      <article className="article article--missing">
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
      <header className="article__header">
        <h1 className="article__title">{post.title}</h1>
        <time className="article__date" dateTime={post.date}>
          {post.date}
        </time>
      </header>
      <div className="article__body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
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
