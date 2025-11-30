import { NextRequest, NextResponse } from 'next/server'
import { industriesApi } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeChildren = searchParams.get('includeChildren') !== 'false'
    const parentOnly = searchParams.get('parentOnly') === 'true'
    
    const industries = await industriesApi.getAll(!parentOnly && includeChildren)
    
    return NextResponse.json({
      success: true,
      data: industries
    })
  } catch (error) {
    console.error('Error fetching industries:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch industries'
      },
      { status: 500 }
    )
  }
}