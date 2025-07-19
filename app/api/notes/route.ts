import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { nextServer } from '@/lib/api/api';

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const searchParams = request.nextUrl.searchParams;

  const search = searchParams.get('search') ?? '';
  const page = Number(searchParams.get('page') ?? 1);
  const rawTag = searchParams.get('tag') ?? '';
  const tag = rawTag === 'All' ? undefined : rawTag;

  try {
    const res = await nextServer.get('/notes', {
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

    return NextResponse.json(res.data);
  } catch (error) {
    console.error('Failed to fetch notes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const cookieStore = cookies();

  try {
    const body = await request.json();

    const res = await nextServer.post('/notes', body, {
      headers: {
        Cookie: cookieStore.toString(),
        'Content-Type': 'application/json',
      },
    });

    return NextResponse.json(res.data, { status: 201 });
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    );
  }
}

