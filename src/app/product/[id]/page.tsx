'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Star, Heart, ShoppingCart, Truck, ShieldCheck,
  RotateCcw, Sparkles, ChevronRight, Check
} from 'lucide-react'
import { products } from '@/data/products'
import { useCart } from '@/context/CartContext'
import ProductCard from '@/components/ProductCard'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart, toggleWishlist, isInWishlist } = useCart()

  const productId = Number(params?.id)
  const product = products.find(p => p.id === productId)
  const isWishlisted = product ? isInWishlist(product.id) : false

  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes[1] || product?.sizes[0] || 'Standard'
  )
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'desc' | 'care' | 'delivery'>('desc')
  const [addedNotice, setAddedNotice] = useState(false)
  const [pincode, setPincode] = useState('')
  const [pincodeChecked, setPincodeChecked] = useState(false)
  const [mainImg, setMainImg] = useState(product?.image || '')

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center">
        <span className="text-6xl mb-4">🥀</span>
        <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-2">Flower Not Found</h1>
        <p className="text-gray-500 mb-6">The arrangement you are looking for might be out of season.</p>
        <Link
          href="/shop"
          className="px-6 py-3 bg-pink-500 text-white rounded-full font-semibold hover:bg-pink-600 transition-colors"
        >
          Browse All Flowers
        </Link>
      </div>
    )
  }

  const discountPct = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
      })
    }
    setAddedNotice(true)
    setTimeout(() => setAddedNotice(false), 2500)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    router.push('/cart')
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-gray-50/50 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500">
            <Link href="/" className="hover:text-pink-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link href="/shop" className="hover:text-pink-600 transition-colors">Shop</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link href={`/shop?category=${product.category}`} className="hover:text-pink-600 transition-colors">
              {product.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-800 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-3xl overflow-hidden bg-pink-50/50 aspect-square border border-gray-100 shadow-sm group">
              <img
                src={mainImg}
                alt={product.name}
                onError={() => setMainImg('https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80')}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {discountPct && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-md">
                  {discountPct}% OFF
                </div>
              )}

              <button
                onClick={() => {
                  if (product) {
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
                }}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${
                  isWishlisted
                    ? 'bg-pink-500 text-white scale-105 shadow-pink-200 ring-2 ring-white'
                    : 'bg-white/90 text-gray-500 hover:text-pink-600'
                }`}
                aria-label={isWishlisted ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={`w-5 h-5 transition-transform active:scale-125 ${isWishlisted ? 'fill-white stroke-white' : ''}`} />
              </button>
            </div>

            {/* Thumbnail previews */}
            <div className="flex gap-3">
              {[0, 1, 2].map(idx => (
                <div
                  key={idx}
                  className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-pink-400/80 cursor-pointer bg-pink-50 shadow-sm"
                >
                  <img
                    src={mainImg}
                    alt={`${product.name} view ${idx + 1}`}
                    onError={() => setMainImg('https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80')}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="inline-block text-xs font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                {product.category}
              </span>
              <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-3">
                <div className="inline-flex items-center gap-1 bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded-md">
                  ★ {product.rating}
                </div>
                <span className="text-xs text-gray-500">
                  {product.reviews.toLocaleString()} Verified Customer Reviews
                </span>
              </div>
            </div>

            {/* Pricing in INR */}
            <div className="flex items-baseline gap-3 border-y border-gray-100 py-4">
              <span className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-lg">
                    Save {discountPct}%
                  </span>
                </>
              )}
            </div>

            {/* Pincode & Same-Day delivery check */}
            <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100 space-y-2">
              <p className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-pink-500" /> Check Delivery Availability
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Delivery Pincode"
                  value={pincode}
                  onChange={e => { setPincode(e.target.value); setPincodeChecked(false); }}
                  className="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-xl focus:outline-none focus:border-pink-400 bg-white"
                  maxLength={6}
                />
                <button
                  onClick={() => setPincodeChecked(pincode.length >= 5)}
                  className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-xl transition-colors"
                >
                  Check
                </button>
              </div>
              {pincodeChecked && (
                <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Same-day delivery available for this location!
                </p>
              )}
            </div>

            {/* Size / Stem options */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                Select Bouquet Size
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                      selectedSize === size
                        ? 'bg-pink-500 text-white border-pink-500 shadow-md shadow-pink-200'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-pink-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                Quantity
              </label>
              <div className="inline-flex items-center border border-gray-200 rounded-xl bg-gray-50/50 p-1">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-pink-600 hover:bg-white rounded-lg transition-colors font-bold text-sm"
                >
                  -
                </button>
                <span className="w-10 text-center text-sm font-bold text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-pink-600 hover:bg-white rounded-lg transition-colors font-bold text-sm"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 px-6 rounded-2xl border-2 border-pink-500 text-pink-600 hover:bg-pink-50 font-bold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold text-sm shadow-lg shadow-pink-200 transition-all hover:-translate-y-0.5"
              >
                Buy Now ⚡
              </button>
            </div>

            {/* Added to cart toast */}
            {addedNotice && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-xs font-semibold flex items-center justify-between animate-fade-in">
                <span>✓ Added to cart successfully!</span>
                <Link href="/cart" className="underline hover:text-green-800">
                  View Cart →
                </Link>
              </div>
            )}

            {/* Assurance features */}
            <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-5 text-center text-xs text-gray-600">
              <div className="p-3 rounded-xl bg-pink-50/40">
                <Sparkles className="w-4 h-4 text-pink-500 mx-auto mb-1" />
                <span className="font-semibold block text-gray-800">Farm Fresh</span>
                <span className="text-[10px] text-gray-400">Guaranteed</span>
              </div>
              <div className="p-3 rounded-xl bg-pink-50/40">
                <Truck className="w-4 h-4 text-pink-500 mx-auto mb-1" />
                <span className="font-semibold block text-gray-800">Same Day</span>
                <span className="text-[10px] text-gray-400">Express delivery</span>
              </div>
              <div className="p-3 rounded-xl bg-pink-50/40">
                <ShieldCheck className="w-4 h-4 text-pink-500 mx-auto mb-1" />
                <span className="font-semibold block text-gray-800">Safe Packaging</span>
                <span className="text-[10px] text-gray-400">Eco-friendly</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="mt-16 border-t border-gray-100 pt-10">
          <div className="flex border-b border-gray-200 gap-8 text-sm font-semibold mb-6">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-3 transition-colors relative ${
                activeTab === 'desc'
                  ? 'text-pink-600 border-b-2 border-pink-500'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('care')}
              className={`pb-3 transition-colors relative ${
                activeTab === 'care'
                  ? 'text-pink-600 border-b-2 border-pink-500'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Care Instructions
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 transition-colors relative ${
                activeTab === 'reviews'
                  ? 'text-pink-600 border-b-2 border-pink-500'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Verified Reviews ({product.reviews})
            </button>
          </div>

          <div className="text-sm text-gray-600 leading-relaxed max-w-3xl">
            {activeTab === 'desc' && (
              <div className="space-y-3">
                <p>{product.description}</p>
                <p>
                  Handcrafted with passion by our artisan florists using only grade-A handpicked fresh stems. Each bouquet is individually wrapped in biodegradable protective tissue and placed in our signature luxury presentation box.
                </p>
              </div>
            )}
            {activeTab === 'care' && (
              <div className="space-y-2">
                <p className="font-semibold text-gray-800">How to keep your blooms fresh:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>{product.careInstructions || 'Trim stems at a 45-degree angle under running water.'}</li>
                  <li>Place flowers in a clean vase filled with cold water.</li>
                  <li>Add flower food packet and stir gently.</li>
                  <li>Change water every 2 days to prolong blooming.</li>
                  <li>Keep blooms away from direct sunlight, heating radiators, and ripening fruit.</li>
                </ul>
              </div>
            )}
            {activeTab === 'delivery' && (
              <div className="space-y-2">
                <p>
                  We offer guaranteed same-day delivery on all orders placed before 2:00 PM local time. Standard deliveries are completed between 9:00 AM and 7:00 PM.
                </p>
                <p>
                  Every order is climate-controlled in transit to guarantee optimal hydration and freshness on arrival.
                </p>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-pink-50/60 border border-pink-100">
                  <div className="text-center shrink-0 pr-4 border-r border-pink-200">
                    <p className="text-3xl font-black text-gray-900">{product.rating}</p>
                    <div className="flex text-amber-400 text-xs mt-0.5 justify-center">
                      {'★'.repeat(Math.round(product.rating))}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1">{product.reviews} reviews</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-xs">100% Real Customer Feedback</p>
                    <p className="text-xs text-gray-600 mt-0.5">Every review is posted by verified buyers with guaranteed fresh delivery inspection.</p>
                  </div>
                </div>

                {/* Sample verified reviews */}
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-2xs">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-xs">Pooja K.</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">✓ Verified Buyer</span>
                      </div>
                      <span className="text-[10px] text-gray-400">2 days ago</span>
                    </div>
                    <div className="flex text-amber-400 text-xs mb-1">★★★★★</div>
                    <p className="text-xs text-gray-700">The bouquet was delivered right on time! Perfectly hydrated and the rose petals were immaculate.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-2xs">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900 text-xs">Vikram R.</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">✓ Verified Buyer</span>
                      </div>
                      <span className="text-[10px] text-gray-400">1 week ago</span>
                    </div>
                    <div className="flex text-amber-400 text-xs mb-1">★★★★★</div>
                    <p className="text-xs text-gray-700">Exceptional fragrance and luxury wrapping paper. Highly recommend Flowerly for special occasions.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-gray-100 pt-12">
            <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-6">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
