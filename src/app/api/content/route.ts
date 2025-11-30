import { NextRequest, NextResponse } from 'next/server'
import { contentApi } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const filters = {
      type: searchParams.get('type') as any,
      status: searchParams.get('status') as any,
      industry: searchParams.get('industry') || undefined,
      capability: searchParams.get('capability') || undefined,
      tag: searchParams.get('tag') || undefined,
      featured: searchParams.get('featured') === 'true' ? true : searchParams.get('featured') === 'false' ? false : undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
      offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined
    }

    // Remove undefined values
    Object.keys(filters).forEach(key => 
      filters[key as keyof typeof filters] === undefined && delete filters[key as keyof typeof filters]
    )
    
    const result = await contentApi.getAll(filters)
    
    return NextResponse.json({
      success: true,
      data: result.data,
      count: result.count
    })
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch content'
      },
      { status: 500 }
    )
  }
}