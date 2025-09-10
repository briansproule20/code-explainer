import { NextRequest, NextResponse } from 'next/server';
import { handlers } from '../../../../echo';

export async function GET(request: NextRequest) {
  try {
    // Use Echo handlers to check authentication
    const { GET: echoGet } = handlers;
    const echoResponse = await echoGet(request);
    
    if (!echoResponse.ok) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    
    // Return user data if authenticated
    const sessionData = await echoResponse.json();
    
    return NextResponse.json({
      user: {
        id: sessionData.user?.id || 'user123',
        name: sessionData.user?.name || 'Echo User',
        email: sessionData.user?.email || 'user@echo.com',
        credits: sessionData.user?.credits || 100
      },
      balance: {
        credits: sessionData.user?.credits || 100
      }
    });
  } catch (error) {
    console.error('Check auth error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
  }
}

export const { POST } = handlers;