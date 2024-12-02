import { generateSessionToken, createSession } from '@/auth/sessions';
import { google } from '@/auth/oauth';
import { cookies } from 'next/headers';
import { decodeIdToken } from 'arctic';

import type { OAuth2Tokens } from 'arctic';
import { setSessionTokenCookie } from '@/auth/cookies';
import {
  COOKIE_GOOGLE_CODE_VERIFIER,
  COOKIE_GOOGLE_OAUTH_STATE,
} from '@/auth/constants';
import { createUser, findUserByGoogleId } from '@/db/repo/users';

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookieStore = await cookies();
  const storedState = cookieStore.get(COOKIE_GOOGLE_OAUTH_STATE)?.value ?? null;
  const codeVerifier =
    cookieStore.get(COOKIE_GOOGLE_CODE_VERIFIER)?.value ?? null;

  if (
    code === null ||
    state === null ||
    storedState === null ||
    codeVerifier === null
  ) {
    return new Response(null, {
      status: 400,
    });
  }

  if (state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  let tokens: OAuth2Tokens;
  try {
    tokens = await google.validateAuthorizationCode(code, codeVerifier);
  } catch (e) {
    // Invalid code or client credentials
    return new Response(null, {
      status: 400,
    });
  }

  const claims = decodeIdToken(tokens.idToken()) as {
    sub: string;
    name: string;
    email: string;
    picture: string;
  };

  const googleUserId = claims.sub;
  const name = claims.name;
  const email = claims.email;
  const picture = claims.picture;

  const existingUser = await findUserByGoogleId(googleUserId);

  if (existingUser) {
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, existingUser.id);
    await setSessionTokenCookie(sessionToken, session.expiresAt);
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
      },
    });
  }

  const user = await createUser({
    email,
    googleId: googleUserId,
    name,
    picture,
  });

  const sessionToken = generateSessionToken();
  const session = await createSession(sessionToken, user.id);
  await setSessionTokenCookie(sessionToken, session.expiresAt);

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/',
    },
  });
}
