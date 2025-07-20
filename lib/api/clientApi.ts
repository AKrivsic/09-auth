import { nextServer } from './api';
import type { Note, NewNote, FetchNotesProps } from '@/types/note';
import type { User, NewUser, UpdateUserProps } from '@/types/user';

export const register = async (payload: NewUser): Promise<User> => {
  const res = await nextServer.post<User>('/auth/register', payload);
  return res.data;
};

export const login = async (payload: NewUser): Promise<User> => {
  const res = await nextServer.post<User>('/auth/login', payload);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export const checkSession = async (): Promise<boolean> => {
  try {
    const res = await nextServer.get('/auth/session');
    return res.status === 200 && typeof res.data === 'object';
  } catch {
    return false;
  }
};

export const getMe = async (): Promise<User> => {
  const res = await nextServer.get<User>('/users/me');
  return res.data;
};

export const updateUser = async (payload: UpdateUserProps): Promise<User> => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};

// ✅ Notes
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

