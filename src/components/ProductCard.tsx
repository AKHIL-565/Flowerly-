'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Heart, ShoppingCart, Star, Eye, X, Truck, ShieldCheck, ArrowRight } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import type { Product } from '@/data/products'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart()
  const isFavorite = isInWishlist(product.id)
  const [addedToCart, setAddedToCart] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [quickViewOpen, setQuickViewOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] ?? product.sizes[0])

  const discountPct = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
      rating: product.rating,
      badge: product.badge,
    })
  }

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setQuickViewOpen(true)
  }

  const badgeConfig: Record<string, { bg: string; text: string; label: string }> = {
    Bestseller: { bg: 'bg-amber-400', text: 'text-white', label: '🏆 Bestseller' },
    New:        { bg: 'bg-green-500', text: 'text-white', label: '✨ New' },
    Sale:       { bg: 'bg-red-500',   text: 'text-white', label: '🔥 Sale' },
  }
  const badge = product.badge ? badgeConfig[product.badge] : null

  const [imgSrc, setImgSrc] = useState(product.image)

  return (
    <>
      <Link
        href={`/product/${product.id}`}
        className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-pink-200 hover:shadow-xl hover:shadow-pink-100/40 transition-all duration-300"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative overflow-hidden bg-gradient-to-br from-pink-50 to-rose-50 aspect-square">
          <img
            src={imgSrc}
            alt={product.name}
            onError={() => setImgSrc('https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80')}
            className={`w-full h-full object-cover transition-transform duration-500 ${hovered ? 'scale-110' : 'scale-100'}`}
          />

          {discountPct && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow">
              {discountPct}% OFF
            </div>
          )}

          {badge && !discountPct && (
            <div className={`absolute top-3 left-3 ${badge.bg} ${badge.text} text-xs font-semibold px-2.5 py-1 rounded-lg shadow`}>
              {badge.label}
            </div>
          )}

          <button
            type="button"
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow transition-all duration-200 cursor-pointer ${
              isFavorite
                ? 'bg-pink-500 text-white scale-105 opacity-100 shadow-md ring-2 ring-white'
                : 'bg-white/90 text-gray-400 hover:bg-pink-50 hover:text-pink-500 opacity-0 group-hover:opacity-100'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-4 h-4 transition-transform active:scale-125 ${isFavorite ? 'fill-white stroke-white' : ''}`} />
          </button>

          <div className={`absolute inset-x-0 bottom-0 flex gap-2 p-3 transition-all duration-300 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold shadow-lg transition-all duration-200 cursor-pointer ${
                addedToCart
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-800 hover:bg-pink-500 hover:text-white'
              }`}
            >
              {addedToCart ? (
                <>✓ Added!</>
              ) : (
                <><ShoppingCart className="w-3.5 h-3.5" /> Add to Cart</>
              )}
            </button>
            <button
              type="button"
              onClick={handleOpenQuickView}
              className="w-10 h-10 bg-white/90 hover:bg-pink-500 hover:text-white text-gray-600 rounded-xl flex items-center justify-center shadow-lg transition-all duration-200 cursor-pointer"
              aria-label="Quick view"
              title="Quick View"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {[0, 1, 2].map(i => (
              <span key={i} className={`block rounded-full transition-all ${i === 0 ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/60'}`} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 p-4 flex-1">
          <span className="text-[10px] font-semibold text-pink-400 uppercase tracking-widest">
            {product.category}
          </span>

          <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2 group-hover:text-pink-600 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map(star => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${star <= Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviews.toLocaleString()})</span>
          </div>

          <div className="flex items-baseline gap-2 mt-auto">
            <span className="text-lg font-bold text-gray-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-semibold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                  {discountPct}% off
                </span>
              </>
            )}
          </div>

          {product.price >= 999 && (
            <p className="text-[11px] text-green-600 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Free Delivery
            </p>
          )}
        </div>
      </Link>

      {quickViewOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setQuickViewOpen(false)}
        >
          <div
            className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-pink-100 grid grid-cols-1 md:grid-cols-2"
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setQuickViewOpen(false)}
              className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-pink-50 text-gray-600 hover:text-pink-600 flex items-center justify-center shadow-md transition-colors cursor-pointer"
              aria-label="Close quick view"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-square md:aspect-auto bg-gradient-to-br from-pink-50 to-rose-50">
              <img
                src={imgSrc}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {discountPct && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow">
                  {discountPct}% OFF
                </div>
              )}
              {badge && !discountPct && (
                <div className={`absolute top-3 left-3 ${badge.bg} ${badge.text} text-xs font-semibold px-2.5 py-1 rounded-lg shadow`}>
                  {badge.label}
                </div>
              )}
            </div>

            <div className="p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-pink-500 uppercase tracking-widest">
                  {product.category}
                </span>
                <h2 className="font-playfair text-xl font-bold text-gray-900 mt-1">
                  {product.name}
                </h2>

                <div className="flex items-center gap-1.5 mt-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${star <= Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviews.toLocaleString()} reviews)</span>
                </div>

                <div className="flex items-baseline gap-2 mt-3">
                  <span className="text-2xl font-black text-pink-600">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-600 leading-relaxed mt-3 line-clamp-3">
                  {product.description}
                </p>

                {product.sizes && product.sizes.length > 0 && (
                  <div className="mt-4">
                    <p className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Select Size
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {product.sizes.map(size => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                            selectedSize === size
                              ? 'bg-pink-500 text-white border-pink-500 shadow-xs'
                              : 'border-gray-200 text-gray-700 hover:border-pink-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 space-y-2.5">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      addedToCart
                        ? 'bg-green-500 text-white'
                        : 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white shadow-pink-200'
                    }`}
                  >
                    {addedToCart ? (
                      <>✓ Added to Cart</>
                    ) : (
                      <><ShoppingCart className="w-3.5 h-3.5" /> Add to Cart</>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleToggleWishlist}
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                      isFavorite
                        ? 'bg-pink-50 border-pink-300 text-pink-500'
                        : 'border-gray-200 text-gray-500 hover:border-pink-300 hover:text-pink-500'
                    }`}
                    aria-label="Toggle wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-pink-500 stroke-pink-500' : ''}`} />
                  </button>
                </div>

                <Link
                  href={`/product/${product.id}`}
                  onClick={() => setQuickViewOpen(false)}
                  className="w-full py-2 rounded-xl bg-gray-50 hover:bg-pink-50 text-gray-700 hover:text-pink-600 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                >
                  <span>View Full Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3 h-3 text-emerald-500" /> Same-Day Delivery
                  </span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-pink-500" /> 100% Fresh Stems
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
