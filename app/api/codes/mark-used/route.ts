import { NextResponse } from 'next/server'
import { markCodeAsUsed } from '@/services/airtable-codes'

export async function POST(request: Request) {
  try {
    const { id } = await request.json()
    
    if (!id) {
      return NextResponse.json(
        { error: 'Code ID is required' },
        { status: 400 }
      )
    }
    
    await markCodeAsUsed(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error marking code as used:', error)
    return NextResponse.json(
      { error: 'Failed to mark code as used' },
      { status: 500 }
    )
  }
}
