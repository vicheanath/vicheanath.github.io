import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, Clock3, Inbox } from 'lucide-react';
import { formatPostDate, getReadingTimeMinutes, type Post } from '../lib/posts';

interface PostListProps {
  posts: Post[];
  emptyMessage?: string;
  /** Highlight this tag slug in each row (used on tag pages). */
  activeTag?: string;
}

/** Shared bulletin list used by the home page, the archive and tag pages. */
export default function PostList({ posts, emptyMessage, activeTag }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="home__empty">
        <Inbox size={48} aria-hidden />
        <p>{emptyMessage ?? 'No posts yet. Check back soon.'}</p>
      </div>
    );
  }

  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.slug} className="post-list__item">
          <Link to={`/post/${post.slug}`} className="post-list__link">
            <span className="post-list__content">
              <span className="post-list__title">{post.title}</span>
              <span className="post-list__meta">
                <time className="post-list__date" dateTime={post.date}>
                  <Calendar size={14} aria-hidden />
                  {formatPostDate(post.date)}
                </time>
                <span className="post-list__reading">
                  <Clock3 size={14} aria-hidden />
                  {getReadingTimeMinutes(post.body)} min read
                </span>
              </span>
              <p className="post-list__excerpt">{post.excerpt}</p>
              {post.tags?.length > 0 && (
                <span className="tag-row tag-row--inline">
                  {post.tags.map((tag) => (
                    <span
                      key={tag.slug}
                      className={
                        tag.slug === activeTag ? 'tag tag--static tag--active' : 'tag tag--static'
                      }
                    >
                      {tag.name}
                    </span>
                  ))}
                </span>
              )}
            </span>
            <ChevronRight size={20} className="post-list__chevron" aria-hidden />
          </Link>
        </li>
      ))}
    </ul>
  );
}
