'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft, CheckCircle2, ShieldCheck, Truck,
  CreditCard, Banknote, Sparkles, AlertCircle
} from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart, selectedCity, setSelectedCity } = useCart()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: selectedCity !== 'Select City' ? selectedCity : 'Mumbai',
    pincode: '',
    deliveryDate: new Date().toISOString().split('T')[0],
    deliverySlot: 'Express Delivery (Within 2-3 Hours)',
    giftMessage: '',
    paymentMethod: 'UPI' as 'UPI' | 'COD' | 'Card' | 'NetBanking',
  })

  useEffect(() => {
    if (selectedCity && selectedCity !== 'Select City') {
      setFormData(prev => ({ ...prev, city: selectedCity }))
    }
  }, [selectedCity])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null)

  const shippingFee = totalPrice >= 999 ? 0 : 99
  const finalTotal = totalPrice + shippingFee

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) {
      setErrorMessage('Please fill in all recipient delivery details.')
      return
    }

    if (items.length === 0) {
      setErrorMessage('Your cart is empty. Please add items before checking out.')
      return
    }

    try {
      setIsSubmitting(true)
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          items: items.map(item => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            size: item.size,
            image: item.image,
          })),
          subtotal: totalPrice,
          discount: 0,
          shippingFee,
          paymentMethod: formData.paymentMethod,
        }),
      })

      const data = await res.json()
      if (data.success) {
        setConfirmedOrder(data.order)
        clearCart()
      } else {
        setErrorMessage(data.message || 'Failed to place order. Please try again.')
      }
    } catch (err) {
      setErrorMessage('Network error while placing order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (confirmedOrder) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-gray-50/50 py-12 px-4 sm:px-6">
        <div className="max-w-xl w-full bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-pink-100 text-center animate-fade-in">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            Order Confirmed
          </span>

          <h1 className="font-playfair text-3xl font-black text-gray-900 mb-2">
            Thank You for Your Order!
          </h1>
          <p className="text-gray-600 text-sm mb-6">
            We are preparing fresh hand-picked floral stems for delivery.
          </p>

          <div className="bg-pink-50/60 rounded-2xl p-4 sm:p-5 mb-6 text-left border border-pink-100/80">
            <div className="flex justify-between items-center pb-3 border-b border-pink-100">
              <span className="text-xs text-gray-500 font-medium">Order ID</span>
              <span className="font-mono font-bold text-gray-900 text-sm">{confirmedOrder.id}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-pink-100">
              <span className="text-xs text-gray-500 font-medium">Tracking Code</span>
              <span className="font-mono font-bold text-pink-600 text-sm">{confirmedOrder.trackingCode}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-pink-100">
              <span className="text-xs text-gray-500 font-medium">Recipient</span>
              <span className="font-semibold text-gray-900 text-xs">{confirmedOrder.customer.fullName}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-pink-100">
              <span className="text-xs text-gray-500 font-medium">Delivery Slot</span>
              <span className="font-semibold text-gray-900 text-xs">{confirmedOrder.customer.deliverySlot}</span>
            </div>
            <div className="flex justify-between items-center pt-3">
              <span className="text-xs text-gray-500 font-medium">Total Paid</span>
              <span className="font-extrabold text-gray-900 text-base">₹{confirmedOrder.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={`/orders?trackingCode=${confirmedOrder.trackingCode}`}
              className="flex-1 py-3.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold rounded-2xl shadow-md text-sm text-center"
            >
              Track Order Live
            </Link>
            <Link
              href="/shop"
              className="flex-1 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-2xl text-sm text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/40 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/cart"
            className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-pink-600 hover:border-pink-300 transition-all shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-900">
              Express Checkout
            </h1>
            <p className="text-xs text-gray-500">
              Fresh flowers hand-delivered with guaranteed happiness
            </p>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            <div className="lg:col-span-7 space-y-6">

              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <h2 className="font-playfair text-lg font-bold text-gray-900">
                    Recipient Delivery Address
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Recipient Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Phone Number (For Delivery SMS) *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address (Order Confirmation)
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="patron@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Street Address & Landmark *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      placeholder="Flat 402, Lotus Towers, Linking Road"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-pink-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      City *
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={e => {
                        handleChange(e)
                        setSelectedCity(e.target.value)
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-pink-500 focus:outline-none bg-white"
                    >
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi NCR">Delhi NCR</option>
                      <option value="Bengaluru">Bengaluru</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Pune">Pune</option>
                      <option value="Kolkata">Kolkata</option>
                      <option value="Ahmedabad">Ahmedabad</option>
                      <option value="Jaipur">Jaipur</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      placeholder="400050"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-pink-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <h2 className="font-playfair text-lg font-bold text-gray-900">
                    Delivery Slot & Greeting Message
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Delivery Date
                      </label>
                      <input
                        type="date"
                        name="deliveryDate"
                        value={formData.deliveryDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-pink-500 focus:outline-none bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Delivery Slot
                      </label>
                      <select
                        name="deliverySlot"
                        value={formData.deliverySlot}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-pink-500 focus:outline-none bg-white"
                      >
                        <option value="Express Delivery (Within 2-3 Hours)">⚡ Express (Within 2-3 Hours)</option>
                        <option value="Standard Morning (9 AM - 1 PM)">🌅 Morning (9 AM - 1 PM)</option>
                        <option value="Standard Evening (4 PM - 9 PM)">🌇 Evening (4 PM - 9 PM)</option>
                        <option value="Midnight Surprise (11:30 PM - 12:00 AM)">🌙 Midnight (11:30 PM - 12:00 AM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Free Handwritten Greeting Card Message
                    </label>
                    <textarea
                      name="giftMessage"
                      rows={2}
                      placeholder="Add personal heartfelt wishes to be printed on an elegant artisanal note card..."
                      value={formData.giftMessage}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-pink-500 focus:outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <h2 className="font-playfair text-lg font-bold text-gray-900">
                    Payment Method
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'UPI', label: 'UPI (GPay / PhonePe / Paytm)', icon: '⚡', desc: 'Instant confirmation' },
                    { id: 'Card', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay' },
                    { id: 'COD', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when delivered' },
                    { id: 'NetBanking', label: 'Net Banking', icon: '🏦', desc: 'All Indian banks' },
                  ].map(method => (
                    <label
                      key={method.id}
                      className={`
                        p-4 rounded-2xl border-2 flex items-center gap-3 cursor-pointer transition-all
                        ${formData.paymentMethod === method.id
                          ? 'border-pink-500 bg-pink-50/50 shadow-xs'
                          : 'border-gray-200 hover:border-pink-200'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={formData.paymentMethod === method.id}
                        onChange={() => setFormData(prev => ({ ...prev, paymentMethod: method.id as any }))}
                        className="text-pink-600 focus:ring-pink-500"
                      />
                      <div>
                        <p className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                          <span>{method.icon}</span>
                          <span>{method.label}</span>
                        </p>
                        <p className="text-[10px] text-gray-500 mt-0.5">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

            </div>

            <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm">
                <h3 className="font-playfair text-xl font-bold text-gray-900 mb-4">
                  Order Summary
                </h3>

                <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto pr-1 mb-4">
                  {items.map(item => (
                    <div key={`${item.id}-${item.size}`} className="py-3 flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0 bg-pink-50"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-gray-900 truncate">{item.name}</p>
                        <p className="text-[11px] text-gray-400">Qty: {item.quantity} • {item.size}</p>
                      </div>
                      <span className="text-xs font-bold text-gray-900 shrink-0">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2.5 pt-3 border-t border-gray-100 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <span className="font-semibold text-gray-900">₹{totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className={`font-semibold ${shippingFee === 0 ? 'text-emerald-600' : 'text-gray-900'}`}>
                      {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline text-sm">
                    <span className="font-bold text-gray-900 text-base">Total Payable</span>
                    <span className="font-black text-xl text-pink-600">
                      ₹{finalTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || items.length === 0}
                  className="w-full mt-6 py-4 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 disabled:opacity-50 text-white font-bold rounded-2xl shadow-lg shadow-pink-200 transition-all text-sm flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <span>Confirm & Place Order</span>
                      <span>🛍️</span>
                    </>
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-gray-400">
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-pink-500" />
                    <span>Safe 256-bit SSL</span>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>100% Fresh Guarantee</span>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}
