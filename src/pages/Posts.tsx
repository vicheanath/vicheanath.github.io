import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Search, Tags, X } from 'lucide-react';
import Seo from '../components/Seo';
import PostList from '../components/PostList';
import { getAllPosts, getAllTags } from '../lib/posts';
import { SITE_NAME, canonicalUrl } from '../lib/site';

export default function Posts() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const [query, setQuery] = useState('');

  const term = query.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!term) return posts;

    return posts.filter((post) => {
      const haystack = [post.title, post.excerpt, ...post.tags.map((tag) => tag.name)]
        .join(' ')
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [posts, term]);

  return (
    <section className="home home--posts-only">
      <Seo
        title={`Posts — ${SITE_NAME}`}
        description="Articles and notes on software architecture, .NET, React, and day-to-day engineering practice."
        path="posts"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: `Posts — ${SITE_NAME}`,
          url: canonicalUrl('posts'),
          blogPost: posts.map((post) => ({
            '@type': 'BlogPosting',
            headline: post.title,
            datePublished: post.date,
            url: canonicalUrl(`post/${post.slug}`),
          })),
        }}
      />
      <h2 className="home__heading">
        <Newspaper size={22} aria-hidden />
        <span>Posts</span>
        <span className="home__count">{posts.length}</span>
      </h2>
      <p className="home__intro">
        Original articles on software architecture, .NET, React, and day-to-day engineering practice.
      </p>

      <div className="filter-bar">
        <div className="filter-bar__search">
          <Search size={16} aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search posts by title, summary, or tag"
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
              <Tags size={15} aria-hidden />
              <span>Browse by tag</span>
            </span>
            <div className="tag-row">
              {tags.map((tag) => (
                <Link key={tag.slug} to={`/tag/${tag.slug}`} className="tag">
                  {tag.name}
                  <span className="tag__count">{tag.count}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {term && (
        <p className="filter-bar__status" role="status">
          {filtered.length} {filtered.length === 1 ? 'post' : 'posts'} matching “{query.trim()}”
        </p>
      )}

      <PostList
        posts={filtered}
        emptyMessage={term ? 'No posts match that search yet.' : 'No posts yet. Check back soon.'}
      />
    </section>
  );
}
