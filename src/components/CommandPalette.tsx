import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Home, CircleUserRound, FolderGit2, Newspaper, Mail, Terminal, ArrowRight, X, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { getAllPosts } from '../lib/posts';
import { GITHUB_URL, LINKEDIN_URL } from '../lib/site';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const posts = getAllPosts();

  const navigationItems = [
    { label: 'Home — Portfolio & System Architecture', path: '/', icon: <Home size={16} /> },
    { label: 'About — Résumé & Career Background', path: '/about', icon: <CircleUserRound size={16} /> },
    { label: 'Projects — Featured & GitHub Repos', path: '/projects', icon: <FolderGit2 size={16} /> },
    { label: 'Blog — Architecture Bulletins & Notes', path: '/blog', icon: <Newspaper size={16} /> },
    { label: 'Contact — Inquiries & Collaboration', path: '/contact', icon: <Mail size={16} /> },
  ];

  const externalItems = [
    { label: 'GitHub Profile (@vicheanath)', url: GITHUB_URL, icon: <ExternalLink size={16} /> },
    { label: 'LinkedIn Profile (/in/vicheanath)', url: LINKEDIN_URL, icon: <ExternalLink size={16} /> },
  ];

  const filteredNav = navigationItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPosts = posts
    .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()) || p.excerpt.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 4)
    .map((p) => ({
      label: p.title,
      path: `/blog/${p.slug}`,
      icon: <Newspaper size={16} />,
      isPost: true,
    }));

  const allFiltered = [...filteredNav, ...filteredPosts];

  useEffect(() => {
    if (!isOpen) return;

    inputRef.current?.focus();
    setSelectedIndex(0);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && modalRef.current && overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: 'power2.out' }
      );
      gsap.fromTo(
        modalRef.current,
        { y: -20, scale: 0.96, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.25, ease: 'power3.out' }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, allFiltered.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + allFiltered.length) % Math.max(1, allFiltered.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = allFiltered[selectedIndex];
        if (selected) {
          navigate(selected.path);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, allFiltered, navigate, onClose]);

  if (!isOpen) return null;

  return (
    <div className="cmd-palette-overlay" ref={overlayRef} onClick={onClose} role="dialog" aria-modal="true">
      <div className="cmd-palette-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <div className="cmd-palette-search">
          <Search size={18} className="cmd-palette-search-icon" aria-hidden />
          <input
            ref={inputRef}
            type="text"
            className="cmd-palette-input"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search pages, bulletins, skills..."
            aria-label="Command palette search"
          />
          {query && (
            <button type="button" className="cmd-palette-clear" onClick={() => setQuery('')} aria-label="Clear query">
              <X size={15} />
            </button>
          )}
          <span className="cmd-palette-badge">ESC to close</span>
        </div>

        <div className="cmd-palette-results">
          {filteredNav.length > 0 && (
            <div className="cmd-palette-group">
              <div className="cmd-palette-group-title">Navigation</div>
              {filteredNav.map((item, idx) => (
                <div
                  key={item.path}
                  className={`cmd-palette-item ${selectedIndex === idx ? 'cmd-palette-item--selected' : ''}`}
                  onClick={() => {
                    navigate(item.path);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                >
                  <div className="cmd-palette-item-icon">{item.icon}</div>
                  <span className="cmd-palette-item-label">{item.label}</span>
                  <ArrowRight size={14} className="cmd-palette-item-arrow" />
                </div>
              ))}
            </div>
          )}

          {filteredPosts.length > 0 && (
            <div className="cmd-palette-group">
              <div className="cmd-palette-group-title">Technical Bulletins</div>
              {filteredPosts.map((post, pIdx) => {
                const globalIndex = filteredNav.length + pIdx;
                return (
                  <div
                    key={post.path}
                    className={`cmd-palette-item ${selectedIndex === globalIndex ? 'cmd-palette-item--selected' : ''}`}
                    onClick={() => {
                      navigate(post.path);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(globalIndex)}
                  >
                    <div className="cmd-palette-item-icon">{post.icon}</div>
                    <span className="cmd-palette-item-label">{post.label}</span>
                    <span className="cmd-palette-tag">Post</span>
                  </div>
                );
              })}
            </div>
          )}

          {allFiltered.length === 0 && (
            <div className="cmd-palette-empty">
              <Terminal size={24} />
              <p>No results found for &ldquo;{query}&rdquo;</p>
            </div>
          )}

          <div className="cmd-palette-group">
            <div className="cmd-palette-group-title">External Links</div>
            {externalItems.map((ext) => (
              <a
                key={ext.url}
                href={ext.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cmd-palette-item"
              >
                <div className="cmd-palette-item-icon">{ext.icon}</div>
                <span className="cmd-palette-item-label">{ext.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="cmd-palette-footer">
          <span>Navigate with <kbd>↑</kbd> <kbd>↓</kbd></span>
          <span>Select with <kbd>↵</kbd></span>
          <span>Close with <kbd>esc</kbd></span>
        </div>
      </div>
    </div>
  );
}
