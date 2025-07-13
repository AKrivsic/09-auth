import axios from 'axios';
import type { Note } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});


export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  currentPage: number;
}

export const fetchNotes = async (
  params: FetchNotesParams
): Promise<FetchNotesResponse> => {
  const cleanedParams = {
    ...params,
    ...(params.search?.trim() === '' && { search: undefined }),
    ...(params.tag === 'All' && { tag: undefined }),
  };

  const { data } = await instance.get<FetchNotesResponse>('/notes', { params: cleanedParams });
  return data;
};
export interface CreateNoteParams {
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
}

export const createNote = async (note: CreateNoteParams): Promise<Note> => {
  const { data } = await instance.post<Note>('/notes', note);
  return data;
};

export const deleteNote = async (id: number): Promise<Note> => {
  const { data } = await instance.delete<Note>(`/notes/${id}`);
  return data;
};

export const fetchNoteById = async (id: number): Promise<Note> => {
  const { data } = await instance.get<Note>(`/notes/${id}`);
  return data;
};

export const getTags = async (): Promise<string[]> => {
  const res = await instance.get<FetchNotesResponse>('/notes', {
    params: { page: 1, perPage: 12 },
  });

  const notes = res.data.notes;

  const tags: string[] = [];
  notes.forEach(note => {
    if (!tags.includes(note.tag)) {
      tags.push(note.tag);
    }
  });

  return tags;
};