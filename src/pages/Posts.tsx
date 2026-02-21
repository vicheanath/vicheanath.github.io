import { Link } from 'react-router-dom';
import { Newspaper, Calendar, ChevronRight, Inbox } from 'lucide-react';
import Seo from '../components/Seo';
import { getAllPosts } from '../lib/posts';

export default function Posts() {
  const posts = getAllPosts();

  return (
    <section className="home home--posts-only">
      <Seo title="Posts — Vichea Nath" description="Blog posts and notes on software, architecture, and development." path="posts" />
      <h2 className="home__heading">
        <Newspaper size={22} aria-hidden />
        <span>Posts</span>
      </h2>
      {posts.length === 0 ? (
        <div className="home__empty">
          <Inbox size={48} aria-hidden />
          <p>No posts yet. Check back soon.</p>
        </div>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.slug} className="post-list__item">
              <Link to={`/post/${post.slug}`} className="post-list__link">
                <span className="post-list__content">
                  <span className="post-list__title">{post.title}</span>
                  <time className="post-list__date" dateTime={post.date}>
                    <Calendar size={14} aria-hidden />
                    {post.date}
                  </time>
                  <p className="post-list__excerpt">{post.excerpt}</p>
                </span>
                <ChevronRight size={20} className="post-list__chevron" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
