import type { RouteObject } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Posts from './pages/Posts';
import Post from './pages/Post';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import About from './pages/About';
import Advertising from './pages/Advertising';
import Privacy from './pages/Privacy';
import PublishingPolicy from './pages/PublishingPolicy';
import NotFound from './pages/NotFound';

/**
 * Shared route table. The browser router and the build-time prerenderer
 * (src/entry-server.tsx) both build from this so a route can never exist in
 * one and be missing from the other.
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'posts', element: <Posts /> },
      { path: 'post/:slug', element: <Post /> },
      { path: 'projects', element: <Projects /> },
      { path: 'contact', element: <Contact /> },
      { path: 'advertising', element: <Advertising /> },
      { path: 'privacy', element: <Privacy /> },
      { path: 'publishing-policy', element: <PublishingPolicy /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];
