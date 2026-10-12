import { NextResponse } from 'next/server'
import { readDbFile, writeDbFile, UserRecord } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { action, email, password, name, phone, address, city, pincode } = await request.json()

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 })
    }

    const users = readDbFile<UserRecord[]>('users.json', [])
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase())

    if (action === 'register') {
      if (existing) {
        return NextResponse.json(
          { success: false, message: 'Account already exists. Please sign in.' },
          { status: 400 }
        )
      }

      const newUser: UserRecord = {
        id: `USR-${Date.now().toString().slice(-5)}`,
        name: name || email.split('@')[0],
        email,
        phone: phone || '',
        address: address || '',
        city: city || '',
        pincode: pincode || '',
        createdAt: new Date().toISOString(),
      }

      users.push(newUser)
      writeDbFile('users.json', users)

      return NextResponse.json({
        success: true,
        message: 'Account created successfully',
        user: newUser,
      })
    }

    if (existing) {
      return NextResponse.json({
        success: true,
        message: 'Logged in successfully',
        user: existing,
      })
    } else {
      const newUser: UserRecord = {
        id: `USR-${Date.now().toString().slice(-5)}`,
        name: name || email.split('@')[0],
        email,
        phone: phone || '',
        address: address || '',
        city: city || '',
        pincode: pincode || '',
        createdAt: new Date().toISOString(),
      }

      users.push(newUser)
      writeDbFile('users.json', users)

      return NextResponse.json({
        success: true,
        message: 'Welcome to Flowerly!',
        user: newUser,
      })
    }
  } catch (error) {
    console.error('POST /api/auth error:', error)
    return NextResponse.json({ success: false, message: 'Authentication failed' }, { status: 500 })
  }
}
