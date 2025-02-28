import { NextResponse } from 'next/server';
import { clearAuthCookie } from '@/utils/auth';

export async function POST() {
  try {
    // Create the response
    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );
    
    // Clear the auth cookie
    clearAuthCookie(response);
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    
    return NextResponse.json(
      { error: 'An error occurred during logout' },
      { status: 500 }
    );
  }
}
