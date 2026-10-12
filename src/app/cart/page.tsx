'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Trash2, Plus, Minus, ArrowLeft, ShieldCheck, Truck, Sparkles, Tag } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart()
  const [coupon, setCoupon] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponError, setCouponError] = useState('')
  const [discountAmount, setDiscountAmount] = useState(0)
  const [couponSuccessMsg, setCouponSuccessMsg] = useState('')

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault()
    setCouponError('')
    setCouponSuccessMsg('')

    if (!coupon.trim()) return

    try {
      const res = await fetch('/api/coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: coupon, subtotal: totalPrice }),
      })
      const data = await res.json()
      if (data.success) {
        setCouponApplied(true)
        setDiscountAmount(data.coupon.discount)
        setCouponSuccessMsg(data.message)
      } else {
        setCouponApplied(false)
        setDiscountAmount(0)
        setCouponError(data.message)
      }
    } catch {
      setCouponError('Failed to validate coupon code')
    }
  }

  const deliveryFee = totalPrice >= 999 || items.length === 0 ? 0 : 99
  const finalTotal = Math.max(0, totalPrice - discountAmount + deliveryFee)

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50/50 px-4 py-16">
        <div className="max-w-md w-full text-center bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
            🌸
          </div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            Looks like you haven&apos;t added any beautiful blossoms yet. Discover our fresh hand-picked floral bouquets!
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold rounded-2xl shadow-lg shadow-pink-200 transition-all hover:-translate-y-0.5"
          >
            Explore Flowers
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/40 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-pink-600 hover:border-pink-300 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-900">
                Shopping Cart
              </h1>
              <p className="text-xs text-gray-500">
                {totalItems} item{totalItems > 1 ? 's' : ''} in your cart
              </p>
            </div>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-gray-400 hover:text-red-500 font-medium transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            {items.map(item => (
              <div
                key={`${item.id}-${item.size}`}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4 sm:items-center justify-between transition-all hover:shadow-md"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-pink-50 shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={`/product/${item.id}`}
                      className="font-semibold text-gray-800 text-base hover:text-pink-600 transition-colors truncate block"
                    >
                      {item.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-pink-50 text-pink-600 px-2 py-0.5 rounded-md font-medium">
                        Size: {item.size}
                      </span>
                      <span className="text-xs text-gray-400">
                        ₹{item.price.toLocaleString('en-IN')} each
                      </span>
                    </div>
                    <p className="font-bold text-gray-900 text-sm mt-1 sm:hidden">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50/50 p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-pink-600 hover:bg-white rounded-lg transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-pink-600 hover:bg-white rounded-lg transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right hidden sm:block min-w-[90px]">
                    <p className="text-base font-bold text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="bg-pink-50/60 border border-pink-100/70 rounded-2xl p-4 flex flex-wrap items-center justify-around gap-4 text-xs text-gray-700">
              <span className="flex items-center gap-1.5 font-medium">
                <Truck className="w-4 h-4 text-pink-500" /> Free delivery above ₹999
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-4 h-4 text-pink-500" /> 100% Farm Fresh Flowers
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-pink-500" /> Secure Payment & Packaging
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 sticky top-32">
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-6">
              <h2 className="font-playfair text-xl font-bold text-gray-900">
                Order Summary
              </h2>

              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. BLOOM15)"
                      value={coupon}
                      onChange={e => setCoupon(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-pink-400 bg-gray-50"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-xl transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-[11px] text-green-600 font-medium">
                    ✓ 15% discount applied successfully!
                  </p>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-500 font-medium">
                    {couponError}
                  </p>
                )}
              </form>

              <div className="space-y-3 text-sm text-gray-600 border-t border-gray-100 pt-4">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ₹{totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>

                {couponApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (15% OFF)</span>
                    <span className="font-semibold">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Standard Delivery</span>
                  <span className={`font-semibold ${deliveryFee === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-3 flex justify-between items-baseline">
                  <div>
                    <span className="text-base font-bold text-gray-900 block">Total Amount</span>
                    <span className="text-[10px] text-gray-400">Inclusive of all taxes</span>
                  </div>
                  <span className="text-2xl font-bold text-pink-600">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold rounded-2xl shadow-lg shadow-pink-200 transition-all active:scale-95 text-sm flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <span>→</span>
              </Link>

              <p className="text-[11px] text-center text-gray-400">
                🔒 Guaranteed safe & secure checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
