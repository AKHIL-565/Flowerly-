'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, ShoppingCart, Trash2, ArrowLeft, Star, Sparkles } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart, totalWishlist } = useCart()
  const [addedIds, setAddedIds] = useState<number[]>([])

  const handleAddAndRemove = (item: typeof wishlist[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      size: 'Standard',
    })
    setAddedIds(prev => [...prev, item.id])
    setTimeout(() => {
      setAddedIds(prev => prev.filter(id => id !== item.id))
    }, 2000)
  }

  const handleMoveAllToCart = () => {
    wishlist.forEach(item => {
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,  
        size: 'Standard',
      })
    })
    alert('All favorite flowers have been added to your cart!')
  }

  if (totalWishlist === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50/50 px-4 py-16">
        <div className="max-w-md w-full text-center bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-100">
          <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
            <Heart className="w-10 h-10 text-pink-400" />
          </div>
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Your Wishlist is Empty
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            Explore our handcrafted fresh bouquets and tap the heart icon on any floral arrangement to save your favorites here.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold rounded-2xl shadow-lg shadow-pink-200 transition-all hover:-translate-y-0.5"
          >
            Discover Flowers
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1520px] mx-auto">
        {/* Header navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-pink-600 hover:border-pink-300 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-900">
                My Favorites & Wishlist
              </h1>
              <p className="text-xs text-gray-500">
                {totalWishlist} saved item{totalWishlist > 1 ? 's' : ''} ready to order
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleMoveAllToCart}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
            >
              <ShoppingCart className="w-3.5 h-3.5" /> Move All to Cart
            </button>
            <Link
              href="/cart"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-pink-200 text-pink-600 hover:bg-pink-50 text-xs font-semibold rounded-xl transition-all"
            >
              Go to Cart →
            </Link>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {wishlist.map(item => {
            const isAdded = addedIds.includes(item.id)

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                {/* Image */}
                <div className="relative aspect-square bg-pink-50 overflow-hidden">
                  <Link href={`/product/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>

                  {/* Remove button */}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center shadow transition-all"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {item.badge && (
                    <span className="absolute top-3 left-3 bg-amber-400 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-4 flex flex-col flex-1 gap-2">
                  <span className="text-[10px] font-bold text-pink-500 uppercase tracking-wider">
                    {item.category}
                  </span>

                  <Link
                    href={`/product/${item.id}`}
                    className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2 hover:text-pink-600 transition-colors"
                  >
                    {item.name}
                  </Link>

                  <div className="flex items-center gap-1.5 text-xs text-gray-600">
                    <span className="inline-flex items-center gap-0.5 bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                      ★ {item.rating}
                    </span>
                    <span className="text-gray-400 text-[11px]">Verified Flower</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mt-auto pt-2 border-t border-gray-50">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹{item.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart button */}
                  <button
                    onClick={() => handleAddAndRemove(item)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all mt-1 ${
                      isAdded
                        ? 'bg-green-600 text-white'
                        : 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white shadow-md shadow-pink-100'
                    }`}
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    {isAdded ? 'Added to Cart ✓' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
