import { cookies } from 'next/headers';
import { nextServer } from './api';
import type { Note, FetchNotesProps } from '@/types/note';
import type { User, UpdateUserProps } from '@/types/user';
import type { AxiosResponse } from 'axios';



export const checkServerSession = async (): Promise<AxiosResponse> => {
  const cookieStore = cookies();

  return await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
};


export const fetchServerUser = async (): Promise<User> => {
  const cookieStore = cookies();

  try {
    const res = await nextServer.get<User>('/users/me', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('User not found');
  }
};

export const updateServerUser = async (
  payload: UpdateUserProps
): Promise<User> => {
  const cookieStore = cookies();

  try {
    const res = await nextServer.patch<User>('/users/me', payload, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return res.data;
  } catch (error) {
    console.error('Failed to update user:', error);
    throw new Error('Update failed');
  }
};



export const fetchNoteByIdServer = async (id: string): Promise<Note> => {
  const cookieStore = cookies();

  try {
    const res = await nextServer.get<Note>(`/notes/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return res.data;
  } catch (error) {
    console.error(`Note not found with id=${id}`, error);
    throw new Error('Note not found');
  }
};

export const fetchServerNotes = async (
  search: string,
  page: number,
  tag?: string
): Promise<FetchNotesProps> => {
  const cookieStore = cookies();

  try {
    const res = await nextServer.get<FetchNotesProps>('/notes', {
      params: {
        ...(search && { search }),
        page,
        perPage: 12,
        ...(tag && { tag }),
      },
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    throw new Error('Notes fetch failed');
  }
};
