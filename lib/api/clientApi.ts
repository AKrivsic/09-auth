import { nextServer } from './api';
import type { Note, NewNote, FetchNotesProps } from '@/types/note';
import type { User, NewUser, UpdateUserProps } from '@/types/user';


export const register = async (payload: NewUser): Promise<User> => {
  const res = await fetch('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('Registration failed');

  return await res.json();
};

export const login = async (payload: NewUser): Promise<User> => {
  const res = await fetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('Login failed');

  return await res.json();
};

export const logout = async (): Promise<void> => {
  await fetch('/auth/logout', {
    method: 'POST',
  });
};

export const checkSession = async (): Promise<boolean> => {
  try {
    const res = await fetch('/auth/session');
    const data = await res.json();
    return res.ok && !!data?.id;
  } catch {
    return false;
  }
};

export const getMe = async (): Promise<User> => {
  const res = await fetch('/profile');
  if (!res.ok) throw new Error('Unauthorized');
  return await res.json();
};

export const updateUser = async (payload: UpdateUserProps): Promise<User> => {
  const res = await fetch('/profile', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('Update failed');

  return await res.json();
};


export const fetchNotes = async ({
  search,
  page,
  perPage,
  tag,
}: {
  search?: string;
  page: number;
  perPage: number;
  tag?: string;
}): Promise<FetchNotesProps> => {
  const res = await nextServer.get<FetchNotesProps>('/notes', {
    params: {
      ...(search && { search }),
      page,
      perPage,
      ...(tag && { tag }),
    },
  });

  return res.data;
};

export const createNote = async (newNote: NewNote): Promise<Note> => {
  const res = await nextServer.post<Note>('/notes', newNote);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await nextServer.delete<Note>(`/notes/${id}`);
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};
