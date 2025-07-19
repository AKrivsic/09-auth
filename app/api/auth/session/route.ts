import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../api';
import { parse } from 'cookie';

export async function GET() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (accessToken) {
    return NextResponse.json({ message: 'Session still valid' });
  }

  if (!refreshToken) {
    return NextResponse.json({ message: 'Missing refresh token' }, { status: 401 });
  }

  try {
    const apiRes = await api.get('/auth/session', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    const setCookie = apiRes.headers['set-cookie'];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);
        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path || '/',
          maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
        };
        if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
        if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
      }

      return NextResponse.json({ message: 'Session refreshed successfully' });
    }

    return NextResponse.json({ message: 'Failed to refresh session' }, { status: 401 });
  } catch (error) {
    console.error('Session refresh failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
