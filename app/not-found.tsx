import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found – NoteHub',
  description: 'The page you are looking for does not exist.',
  openGraph: {
    title: 'Page not found – NoteHub',
    description: 'The page you are looking for does not exist.',
    url: 'https://notehub.vercel.app/not-found',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub not found',
      },
    ],
  },
};

export default function NotFoundPage() {
  return (
    <div>
      <h1>404 - Page not found</h1>
      <p>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}