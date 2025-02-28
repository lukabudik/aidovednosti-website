import { NextResponse } from 'next/server'
import { getAllCodes } from '@/services/airtable-codes'

export async function GET() {
  try {
    const codes = await getAllCodes()
    return NextResponse.json({ codes })
  } catch (error) {
    console.error('Error fetching codes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch codes' },
      { status: 500 }
    )
  }
}
