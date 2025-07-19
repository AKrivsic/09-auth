import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { parse } from 'cookie';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await api.post('/auth/register', body);

    const cookieStore = await cookies();
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

        if (parsed.accessToken)
          cookieStore.set('accessToken', parsed.accessToken, options);
        if (parsed.refreshToken)
          cookieStore.set('refreshToken', parsed.refreshToken, options);
      }

      return NextResponse.json(apiRes.data);
    }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } catch (error) {
    console.error('Registration failed:', error);
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
