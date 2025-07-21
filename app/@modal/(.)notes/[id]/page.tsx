import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import PreviewClient from "./NotePreview.client";
import { fetchNoteByIdServer } from "@/lib/api/serverApi";

type PreviewProps = {
  params: Promise<{ id: string }>;
};

export default async function Preview({ params }: PreviewProps) {
  const { id } = await params;

  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteByIdServer(id),
  });
  

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PreviewClient />
    </HydrationBoundary>
  );
}
