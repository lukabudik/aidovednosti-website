import { NextRequest, NextResponse } from 'next/server';
import { checkPassword, createToken, setAuthCookie } from '@/utils/auth';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }
    
    // Check if the password is correct
    const isValid = checkPassword(password);
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }
    
    // Create a JWT token
    const token = await createToken();
    
    // Create the response
    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );
    
    // Set the auth cookie
    setAuthCookie(response, token);
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
