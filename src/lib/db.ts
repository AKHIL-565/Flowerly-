import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')

function ensureDirectoryExistence(filePath: string) {
  const dirname = path.dirname(filePath)
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true })
  }
}

export function readDbFile<T>(filename: string, defaultData: T): T {
  const filePath = path.join(DATA_DIR, filename)
  try {
    if (!fs.existsSync(filePath)) {
      ensureDirectoryExistence(filePath)
      fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8')
      return defaultData
    }
    const content = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(content) as T
  } catch (error) {
    console.error(`Error reading ${filename}:`, error)
    return defaultData
  }
}

export function writeDbFile<T>(filename: string, data: T): boolean {
  const filePath = path.join(DATA_DIR, filename)
  try {
    ensureDirectoryExistence(filePath)
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
    return true
  } catch (error) {
    console.error(`Error writing ${filename}:`, error)
    return false
  }
}

export interface UserRecord {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  city?: string
  pincode?: string
  createdAt: string
}

export interface OrderItem {
  productId: number
  name: string
  price: number
  quantity: number
  size?: string
  image: string
}

export interface OrderRecord {
  id: string
  userId?: string
  customer: {
    fullName: string
    email: string
    phone: string
    address: string
    city: string
    pincode: string
    deliveryDate: string
    deliverySlot: string
    giftMessage?: string
  }
  items: OrderItem[]
  subtotal: number
  discount: number
  shippingFee: number
  totalAmount: number
  paymentMethod: 'COD' | 'UPI' | 'Card' | 'NetBanking'
  paymentStatus: 'Pending' | 'Paid' | 'Failed'
  orderStatus: 'Order Placed' | 'Preparing Fresh Blooms' | 'Out for Delivery' | 'Delivered'
  trackingCode: string
  createdAt: string
}

export interface ReviewRecord {
  id: string
  productId: number
  author: string
  rating: number
  comment: string
  city: string
  createdAt: string
  verified: boolean
}
