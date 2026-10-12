import { NextResponse } from 'next/server'

interface Coupon {
  code: string
  discountPercent?: number
  discountAmount?: number
  minOrder: number
  description: string
}

const COUPONS: Record<string, Coupon> = {
  FLOWER10: {
    code: 'FLOWER10',
    discountPercent: 10,
    minOrder: 499,
    description: '10% off on your entire floral bouquet order',
  },
  LOVE15: {
    code: 'LOVE15',
    discountPercent: 15,
    minOrder: 999,
    description: '15% off on romantic flower collections',
  },
  FREESHIP: {
    code: 'FREESHIP',
    discountAmount: 99,
    minOrder: 499,
    description: 'Free express shipping on your order',
  },
  WELCOME100: {
    code: 'WELCOME100',
    discountAmount: 100,
    minOrder: 799,
    description: 'Flat ₹100 discount for new patrons',
  },
}

export async function POST(request: Request) {
  try {
    const { code, subtotal } = await request.json()

    if (!code) {
      return NextResponse.json({ success: false, message: 'Coupon code required' }, { status: 400 })
    }

    const cleanCode = code.trim().toUpperCase()
    const coupon = COUPONS[cleanCode]

    if (!coupon) {
      return NextResponse.json(
        { success: false, message: 'Invalid promo code. Try FLOWER10 or LOVE15' },
        { status: 400 }
      )
    }

    if (subtotal < coupon.minOrder) {
      return NextResponse.json(
        { success: false, message: `Minimum cart value of ₹${coupon.minOrder} required for this code` },
        { status: 400 }
      )
    }

    let discount = 0
    if (coupon.discountPercent) {
      discount = Math.round((subtotal * coupon.discountPercent) / 100)
    } else if (coupon.discountAmount) {
      discount = coupon.discountAmount
    }

    return NextResponse.json({
      success: true,
      message: `Coupon applied: ${coupon.description}`,
      coupon: {
        code: coupon.code,
        discount,
        description: coupon.description,
      },
    })
  } catch (error) {
    console.error('POST /api/coupon error:', error)
    return NextResponse.json({ success: false, message: 'Failed to apply coupon' }, { status: 500 })
  }
}
