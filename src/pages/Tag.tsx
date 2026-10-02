import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Tag as TagIcon } from 'lucide-react';
import Seo from '../components/Seo';
import PostList from '../components/PostList';
import { getAllTags, getPostsByTag, getTagBySlug } from '../lib/posts';
import { SITE_NAME, canonicalUrl } from '../lib/site';

export default function TagPage() {
  const { slug } = useParams<{ slug: string }>();
  const tag = slug ? getTagBySlug(slug) : null;

  if (!tag) {
    return (
      <section className="page page--not-found">
        <Seo
          title={`Tag not found — ${SITE_NAME}`}
          description="No posts are filed under this tag."
          path={slug ? `tag/${slug}` : 'posts'}
          noindex
        />
        <div className="page__not-found-icon">
          <TagIcon size={42} aria-hidden />
        </div>
        <h1 className="page__title">Tag not found</h1>
        <p className="page__intro">No posts are filed under this tag.</p>
        <div className="page__actions">
          <Link to="/blog" className="article__back-link">
            <ArrowLeft size={18} aria-hidden />
            <span>Browse all bulletins</span>
          </Link>
        </div>
      </section>
    );
  }

  const posts = getPostsByTag(tag.slug);
  const otherTags = getAllTags().filter((item) => item.slug !== tag.slug);

  return (
    <section className="blog-page blog-page--tag">
      <Seo
        title={`${tag.name} — ${SITE_NAME}`}
        description={`Articles tagged ${tag.name}: ${posts.length} ${
          posts.length === 1 ? 'post' : 'posts'
        } on ${tag.name.toLowerCase()} from ${SITE_NAME}.`}
        path={`tag/${tag.slug}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: `Posts tagged ${tag.name}`,
          url: canonicalUrl(`tag/${tag.slug}`),
          hasPart: posts.map((post) => ({
            '@type': 'BlogPosting',
            headline: post.title,
            datePublished: post.date,
            url: canonicalUrl(`blog/${post.slug}`),
          })),
        }}
      />

      <Link to="/blog" className="article__crumb">
        <ArrowLeft size={16} aria-hidden />
        <span>All bulletins</span>
      </Link>

      <header className="section-header">
        <div className="section-badge">
          <TagIcon size={14} aria-hidden />
          <span>Topic archive</span>
        </div>
        <h1 className="section-title">
          {tag.name} <span className="text-highlight">bulletins</span>
        </h1>
      </header>
      <p className="section-subtitle">
        Every bulletin filed under {tag.name}, newest first.
      </p>

      <div className="blog-page__results-heading">
        <h2>All bulletins</h2>
        <span>{posts.length} {posts.length === 1 ? 'result' : 'results'}</span>
      </div>
      <PostList posts={posts} activeTag={tag.slug} emptyMessage="Nothing filed here yet." />

      {otherTags.length > 0 && (
        <div className="filter-bar filter-bar--footer">
          <span className="filter-bar__label">Other tags</span>
          <div className="tag-row">
            {otherTags.map((item) => (
              <Link key={item.slug} to={`/tag/${item.slug}`} className="tag">
                {item.name}
                <span className="tag__count">{item.count}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
