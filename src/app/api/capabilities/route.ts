import { NextRequest, NextResponse } from 'next/server'
import { capabilitiesApi } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeChildren = searchParams.get('includeChildren') !== 'false'
    const parentOnly = searchParams.get('parentOnly') === 'true'
    
    const capabilities = await capabilitiesApi.getAll(!parentOnly && includeChildren)
    
    return NextResponse.json({
      success: true,
      data: capabilities
    })
  } catch (error) {
    console.error('Error fetching capabilities:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch capabilities'
      },
      { status: 500 }
    )
  }
}