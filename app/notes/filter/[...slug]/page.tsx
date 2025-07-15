import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] || 'All';

  const title =
    tag === 'All' ? 'All notes – NoteHub' : `Notes tagged: ${tag} – NoteHub`;

  const description =
    tag === 'All'
      ? 'Browse all notes in NoteHub.'
      : `View notes filtered by tag: ${tag}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;
  const tag = slug[0] === 'All' ? undefined : slug[0];

  const initialData = await fetchNotes({
    page: 1,
    perPage: 12,
    tag,
  });

  return <NotesClient initialData={initialData} tag={tag} />;
}