import { fetchNoteById } from "@/lib/api/clientApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import PreviewClient from "./NotePreview.client";

type PreviewProps = {
  params: Promise<{ id: string }>;
};

export default async function Preview({ params }: PreviewProps) {
  const { id } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(String(id)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PreviewClient />
    </HydrationBoundary>
  );
}
