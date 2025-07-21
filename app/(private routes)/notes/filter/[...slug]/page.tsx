import type { Metadata } from 'next';
import { fetchServerNotes } from '@/lib/api/serverApi';
import NotesClient from './Notes.client';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] || 'All';

  const description =
    tag === 'All'
      ? 'All notes — view your complete collection of notes.'
      : `Notes tagged with '${tag}' — browse notes filtered by '${tag}'.`;

  const url = `https://08-zustand-seven.vercel.app/notes/filter/${tag}`;

  return {
    title: `Notes: ${tag}`,
    description,
    openGraph: {
      title: `Notes: ${tag}`,
      description,
      url,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'Note Hub App',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Notes: ${tag}`,
      description,
      images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
    },
  };
}

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug[0] === 'All' ? undefined : slug[0];

  const initialData = await fetchServerNotes('', 1, tag);

  return <NotesClient initialData={initialData} tag={tag} />;
}
