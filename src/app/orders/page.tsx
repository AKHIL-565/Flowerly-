'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  Search, Package, Clock, Truck, CheckCircle2,
  Calendar, MapPin, AlertCircle, ArrowLeft, ShieldCheck
} from 'lucide-react'

function OrderTrackerContent() {
  const searchParams = useSearchParams()
  const initialCode = searchParams?.get('trackingCode') || ''

  const [trackingInput, setTrackingInput] = useState(initialCode)
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchOrder = async (code: string) => {
    if (!code.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/orders?trackingCode=${encodeURIComponent(code.trim())}`)
      const data = await res.json()
      if (data.success && data.order) {
        setOrder(data.order)
      } else {
        setOrder(null)
        setError(data.message || 'No order found with that tracking code or ID.')
      }
    } catch {
      setError('Failed to reach server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (initialCode) {
      fetchOrder(initialCode)
    }
  }, [initialCode])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchOrder(trackingInput)
  }

  const steps = [
    { title: 'Order Placed', desc: 'Order received & confirmed', icon: CheckCircle2 },
    { title: 'Preparing Fresh Blooms', desc: 'Handcrafted floral arrangement', icon: Package },
    { title: 'Out for Delivery', desc: 'Assigned to chilled florist courier', icon: Truck },
    { title: 'Delivered', desc: 'Handed to recipient with love', icon: ShieldCheck },
  ]

  const getCurrentStepIndex = (status: string) => {
    switch (status) {
      case 'Order Placed': return 0
      case 'Preparing Fresh Blooms': return 1
      case 'Out for Delivery': return 2
      case 'Delivered': return 3
      default: return 0
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/40 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/"
            className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-pink-600 hover:border-pink-300 transition-all shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-playfair text-3xl font-black text-gray-900">
              Live Order Tracker
            </h1>
            <p className="text-xs text-gray-500">
              Track the exact real-time dispatch and delivery status of your flowers
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. FLW-123456) or Tracking Code (TRK-XXXX)..."
                value={trackingInput}
                onChange={e => setTrackingInput(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 text-sm focus:border-pink-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold text-sm rounded-2xl shadow-md transition-all shrink-0"
            >
              {loading ? 'Searching...' : 'Track Order 🌸'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3.5 rounded-xl bg-rose-50 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {order && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div>
                <span className="text-xs uppercase font-bold text-pink-600 tracking-wider">
                  Verified Order
                </span>
                <h2 className="font-playfair text-2xl font-bold text-gray-900 mt-0.5">
                  Order #{order.id}
                </h2>
                <p className="text-xs text-gray-400 font-mono mt-0.5">
                  Tracking Code: {order.trackingCode}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="inline-block px-3.5 py-1 rounded-full bg-pink-100 text-pink-700 font-bold text-xs">
                  {order.orderStatus}
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">
                Delivery Timeline
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {steps.map((st, i) => {
                  const currentIdx = getCurrentStepIndex(order.orderStatus)
                  const isDone = i <= currentIdx
                  const isCurrent = i === currentIdx
                  const Icon = st.icon

                  return (
                    <div
                      key={st.title}
                      className={`
                        p-4 rounded-2xl border-2 transition-all
                        ${isCurrent
                          ? 'border-pink-500 bg-pink-50/50 shadow-xs ring-2 ring-pink-100'
                          : isDone
                            ? 'border-emerald-200 bg-emerald-50/30'
                            : 'border-gray-100 bg-gray-50 opacity-60'
                        }
                      `}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-2.5 ${
                        isCurrent
                          ? 'bg-pink-500 text-white'
                          : isDone
                            ? 'bg-emerald-500 text-white'
                            : 'bg-gray-200 text-gray-500'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <p className={`text-xs font-bold ${isCurrent ? 'text-pink-600' : 'text-gray-900'}`}>
                        {st.title}
                      </p>
                      <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{st.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-100 text-xs">
              <div className="bg-gray-50/70 p-4 rounded-2xl">
                <p className="font-bold text-gray-900 mb-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-pink-500" />
                  <span>Recipient & Delivery Address</span>
                </p>
                <p className="font-semibold text-gray-800">{order.customer.fullName}</p>
                <p className="text-gray-600 mt-0.5">{order.customer.address}, {order.customer.city} - {order.customer.pincode}</p>
                <p className="text-gray-500 mt-1">Phone: {order.customer.phone}</p>
              </div>

              <div className="bg-gray-50/70 p-4 rounded-2xl">
                <p className="font-bold text-gray-900 mb-2 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-pink-500" />
                  <span>Scheduled Delivery Slot</span>
                </p>
                <p className="font-semibold text-gray-800">Date: {order.customer.deliveryDate}</p>
                <p className="text-gray-600 mt-0.5">Slot: {order.customer.deliverySlot}</p>
                <p className="text-gray-500 mt-1">Payment: {order.paymentMethod} ({order.paymentStatus})</p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                Ordered Blooms ({order.items.length})
              </h3>
              <div className="divide-y divide-gray-100">
                {order.items.map((it: any, idx: number) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={it.image} alt={it.name} className="w-12 h-12 rounded-xl object-cover bg-pink-50" />
                      <div>
                        <p className="text-xs font-bold text-gray-900">{it.name}</p>
                        <p className="text-[11px] text-gray-400">Qty: {it.quantity} {it.size ? `• ${it.size}` : ''}</p>
                      </div>
                    </div>
                    <span className="font-bold text-xs text-gray-900">
                      ₹{(it.price * it.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-sm">
                <span className="font-bold text-gray-900">Total Paid</span>
                <span className="font-black text-lg text-pink-600">
                  ₹{order.totalAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-gray-500 font-medium">Loading live tracking...</p>
        </div>
      </div>
    }>
      <OrderTrackerContent />
    </Suspense>
  )
}
