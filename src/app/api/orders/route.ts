import { NextResponse } from 'next/server'
import { readDbFile, writeDbFile, OrderRecord } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const trackingCode = searchParams.get('trackingCode')

    const orders = readDbFile<OrderRecord[]>('orders.json', [])

    if (trackingCode) {
      const match = orders.find(
        o => o.trackingCode.toLowerCase() === trackingCode.toLowerCase() || o.id === trackingCode
      )
      if (!match) {
        return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 })
      }
      return NextResponse.json({ success: true, order: match })
    }

    if (email) {
      const userOrders = orders.filter(
        o => o.customer.email.toLowerCase() === email.toLowerCase()
      )
      return NextResponse.json({ success: true, orders: userOrders })
    }

    return NextResponse.json({ success: true, orders })
  } catch (error) {
    console.error('GET /api/orders error:', error)
    return NextResponse.json({ success: false, message: 'Failed to retrieve orders' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { customer, items, subtotal, discount = 0, shippingFee = 0, paymentMethod = 'UPI' } = body

    if (!customer?.fullName || !customer?.phone || !customer?.address || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Missing required order details' },
        { status: 400 }
      )
    }

    const totalAmount = Math.max(0, subtotal - discount + shippingFee)
    const orderId = `FLW-${Date.now().toString().slice(-6)}`
    const trackingCode = `TRK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`

    const newOrder: OrderRecord = {
      id: orderId,
      customer: {
        fullName: customer.fullName,
        email: customer.email || 'guest@flowerly.in',
        phone: customer.phone,
        address: customer.address,
        city: customer.city || 'Mumbai',
        pincode: customer.pincode || '400001',
        deliveryDate: customer.deliveryDate || new Date().toISOString().split('T')[0],
        deliverySlot: customer.deliverySlot || 'Standard Delivery (9 AM - 6 PM)',
        giftMessage: customer.giftMessage || '',
      },
      items,
      subtotal,
      discount,
      shippingFee,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
      orderStatus: 'Order Placed',
      trackingCode,
      createdAt: new Date().toISOString(),
    }

    const orders = readDbFile<OrderRecord[]>('orders.json', [])
    orders.unshift(newOrder)
    writeDbFile('orders.json', orders)

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      order: newOrder,
    })
  } catch (error) {
    console.error('POST /api/orders error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to process order' },
      { status: 500 }
    )
  }
}
