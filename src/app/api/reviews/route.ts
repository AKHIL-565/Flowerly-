import { NextResponse } from 'next/server'
import { readDbFile, writeDbFile, ReviewRecord } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const productIdStr = searchParams.get('productId')

    const allReviews = readDbFile<ReviewRecord[]>('reviews.json', [
      {
        id: 'REV-1',
        productId: 1,
        author: 'Ananya Sharma',
        rating: 5,
        comment: 'Fresh, vibrant crimson roses! Arrived exactly at midnight as requested.',
        city: 'Mumbai',
        createdAt: '2026-03-28T14:30:00Z',
        verified: true,
      },
      {
        id: 'REV-2',
        productId: 1,
        author: 'Rohan Mehra',
        rating: 5,
        comment: 'My fiancée was thrilled with the glass vase packaging. Incredible fragrance.',
        city: 'Bangalore',
        createdAt: '2026-04-02T11:15:00Z',
        verified: true,
      },
    ])

    if (productIdStr) {
      const pid = parseInt(productIdStr, 10)
      const filtered = allReviews.filter(r => r.productId === pid)
      return NextResponse.json({ success: true, reviews: filtered })
    }

    return NextResponse.json({ success: true, reviews: allReviews })
  } catch (error) {
    console.error('GET /api/reviews error:', error)
    return NextResponse.json({ success: false, message: 'Failed to retrieve reviews' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { productId, author, rating, comment, city } = body

    if (!productId || !author || !rating || !comment) {
      return NextResponse.json(
        { success: false, message: 'Please provide all review fields' },
        { status: 400 }
      )
    }

    const allReviews = readDbFile<ReviewRecord[]>('reviews.json', [])

    const newReview: ReviewRecord = {
      id: `REV-${Date.now().toString().slice(-5)}`,
      productId: Number(productId),
      author,
      rating: Number(rating),
      comment,
      city: city || 'New Delhi',
      createdAt: new Date().toISOString(),
      verified: true,
    }

    allReviews.unshift(newReview)
    writeDbFile('reviews.json', allReviews)

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your verified review has been posted.',
      review: newReview,
    })
  } catch (error) {
    console.error('POST /api/reviews error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit review' },
      { status: 500 }
    )
  }
}
