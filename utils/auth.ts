import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';

const AUTH_COOKIE_NAME = 'admin_auth_token';

// Create a JWT token
export async function createToken(): Promise<string> {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET || '');
  
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h') // Token expires after 8 hours
    .sign(secret);
  
  return token;
}

// Verify a JWT token
export async function verifyToken(token: string): Promise<boolean> {
  try {
    const secret = new TextEncoder().encode(process.env.AUTH_SECRET || '');
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

// Set the auth cookie
export function setAuthCookie(response: NextResponse, token: string): void {
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 8, // 8 hours in seconds
    path: '/',
  });
}

// Get the auth cookie
export function getAuthCookie(): string | undefined {
  return cookies().get(AUTH_COOKIE_NAME)?.value;
}

// Clear the auth cookie
export function clearAuthCookie(response: NextResponse): void {
  response.cookies.set({
    name: AUTH_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });
}

// Check if the password is correct
export function checkPassword(password: string): boolean {
  return password === process.env.ADMIN_PASSWORD;
}

// Middleware to check if the user is authenticated
export async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  
  if (!token) {
    return false;
  }
  
  return await verifyToken(token);
}
