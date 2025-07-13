"use client";

import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";
import { useParams, useRouter } from "next/navigation";

export default function PreviewClient() {
  const { id } = useParams();
  const router = useRouter();
  const closeModal = () => router.back();

  return (
    <Modal onClose={closeModal}>
      <NotePreview id={Number(id)} onClose={closeModal} />
    </Modal>
  );
}
