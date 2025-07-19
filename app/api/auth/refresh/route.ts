import { cookies } from 'next/headers';
import { api } from '../../api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies();

  try {
    const { data } = await api.get('/users/me', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const cookieStore = cookies();

  try {
    const { data } = await api.patch('/users/me', body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to update user:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 400 });
  }
}
