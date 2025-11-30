import { NextRequest, NextResponse } from 'next/server'
import { contentApi } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const content = await contentApi.getBySlug(slug)
    
    if (!content) {
      return NextResponse.json(
        {
          success: false,
          error: 'Content not found'
        },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: content
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