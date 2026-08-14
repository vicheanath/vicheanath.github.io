import { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import Navbar from './Navbar';
import Footer from './Footer';
import CommandPalette from './CommandPalette';

export default function Layout() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const location = useLocation();
  const mainContentRef = useRef<HTMLElement>(null);

  // Global Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // GSAP Smooth Route Transition
  useEffect(() => {
    if (typeof window === 'undefined' || !mainContentRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        mainContentRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      );
    }, mainContentRef);

    return () => ctx.revert();
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      {/* Modern Glassmorphism Sticky Navbar */}
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      {/* Main Dynamic View Area */}
      <main className="main-content-wrapper" id="main" ref={mainContentRef}>
        <div className="layout-container">
          <Outlet />
        </div>
      </main>

      {/* Full-Stack Engineer Footer */}
      <Footer />
    </div>
  );
}
