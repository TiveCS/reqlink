// app/login/google/route.ts
import { generateState, generateCodeVerifier } from 'arctic';
import { google } from '@/auth/oauth';
import { cookies } from 'next/headers';
import {
  COOKIE_GOOGLE_CODE_VERIFIER,
  COOKIE_GOOGLE_OAUTH_STATE,
} from '@/auth/constants';

export async function GET(): Promise<Response> {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = google.createAuthorizationURL(state, codeVerifier, [
    'openid',
    'profile',
    'email',
  ]);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_GOOGLE_OAUTH_STATE, state, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 10, // 10 minutes
    sameSite: 'lax',
  });
  cookieStore.set(COOKIE_GOOGLE_CODE_VERIFIER, codeVerifier, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 10, // 10 minutes
    sameSite: 'lax',
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
    },
  });
}
