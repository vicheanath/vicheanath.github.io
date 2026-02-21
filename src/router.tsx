import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Posts from './pages/Posts';
import Post from './pages/Post';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'posts', element: <Posts /> },
      { path: 'post/:slug', element: <Post /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
