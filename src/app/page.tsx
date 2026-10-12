'use client'

import Link from 'next/link'
import { ArrowRight, Sparkles, Star, Truck, ShieldCheck } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import StoryBar from '@/components/StoryBar'
import ExquisiteRange from '@/components/ExquisiteRange'
import PremiumBanner from '@/components/PremiumBanner'
import { products } from '@/data/products'

const categories = [
  {
    name: 'Roses',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80',
    fallback: '/api/flower-image/rose',
    emoji: '🌹',
    description: 'Timeless Dutch & blush roses',
  },
  {
    name: 'Bouquets',
    image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=600&q=80',
    fallback: '/api/flower-image/gerbera',
    emoji: '💐',
    description: 'Handcrafted with love',
  },
  {
    name: 'Orchids',
    image: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=600&q=80',
    fallback: '/api/flower-image/orchid',
    emoji: '🌸',
    description: 'Exotic Phalaenopsis & Dendrobiums',
  },
  {
    name: 'Sunflowers',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80',
    fallback: '/api/flower-image/sunflower',
    emoji: '🌻',
    description: 'Bright golden cheerful blossoms',
  },
  {
    name: 'Mixed',
    image: 'https://images.unsplash.com/photo-1589244159943-460088ed5c92?auto=format&fit=crop&w=600&q=80',
    fallback: '/api/flower-image/gerbera',
    emoji: '🌺',
    description: 'Colorful vibrant arrangements',
  },
  {
    name: 'Seasonal',
    image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=600&q=80',
    fallback: '/api/flower-image/lily',
    emoji: '🌷',
    description: 'Fresh Dutch tulips & lavender',
  },
  {
    name: 'Lilies',
    image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=600&q=80',
    fallback: '/api/flower-image/lily',
    emoji: '🪷',
    description: 'Pure, fragrant Oriental blooms',
  },
  {
    name: 'Carnations',
    image: 'https://images.unsplash.com/photo-1584448141569-69f342da535c?auto=format&fit=crop&w=600&q=80',
    fallback: '/api/flower-image/carnation',
    emoji: '🌺',
    description: 'Ruffled long-lasting charm',
  },
]

const testimonials = [
  {
    name: 'Sarah M.',
    avatar: '👩',
    rating: 5,
    text: "The most beautiful bouquet I've ever received! It arrived perfectly fresh and the packaging was stunning. Will definitely order again!",
    occasion: 'Birthday Gift',
  },
  {
    name: 'James R.',
    avatar: '👨',
    rating: 5,
    text: 'Used Flowerly for my anniversary and my wife was absolutely delighted. Same-day delivery worked perfectly. Highly recommend!',
    occasion: 'Anniversary',
  },
  {
    name: 'Emily T.',
    avatar: '👩‍🦱',
    rating: 5,
    text: 'The orchids I ordered are still blooming three weeks later! Exceptional quality and beautiful presentation. Flowerly is my go-to for all occasions.',
    occasion: 'Housewarming',
  },
]

const features = [
  {
    icon: '🚚',
    title: 'Same-Day Delivery',
    description: 'Order by 2pm for delivery today',
  },
  {
    icon: '🌿',
    title: 'Farm Fresh',
    description: 'Directly from local growers',
  },
  {
    icon: '💐',
    title: 'Custom Bouquets',
    description: 'Personalized just for you',
  },
  {
    icon: '❤️',
    title: '100% Satisfaction',
    description: 'Love it or we\'ll make it right',
  },
]

const featuredProducts = products.filter(p => p.badge === 'Bestseller').slice(0, 8)

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF5F7] via-[#FFF9FA] to-white pt-4 pb-8 sm:py-8 lg:py-10 border-b border-pink-100/60">
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -right-24 w-96 h-96 bg-rose-200/35 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-amber-100/30 rounded-full blur-3xl" />
        </div>

        <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-pink-200 shadow-xs mb-4">
                <span className="flex h-2 w-2 rounded-full bg-pink-500 animate-ping" />
                <Sparkles className="w-3.5 h-3.5 text-pink-500 fill-pink-400" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-pink-700">
                  Luxury Floral Atelier • Same-Day Express
                </span>
              </div>

              <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.35rem] font-black text-gray-900 leading-[1.08] tracking-tight mb-4">
                Fresh Flowers,{' '}
                <span className="relative inline-block whitespace-nowrap">
                  <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500 bg-clip-text text-transparent">
                    Delivered with Love
                  </span>
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-pink-400/70" viewBox="0 0 250 12" fill="none" preserveAspectRatio="none">
                    <path d="M2 9C50 3 150 2 248 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl mb-6 font-normal leading-relaxed">
                Discover handcrafted artisanal floral arrangements, sourced fresh from world-class growers each morning. 
                Same-day & midnight delivery across India.
              </p>

              <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto items-stretch sm:items-center mb-7">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold text-base rounded-2xl shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group text-center"
                >
                  <span>Shop Now</span>
                  <span className="text-lg group-hover:scale-110 transition-transform">🛍️</span>
                  <ArrowRight className="w-4 h-4 text-white/90 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white/90 hover:bg-white border-2 border-pink-200/90 hover:border-pink-400 text-gray-800 hover:text-pink-600 font-bold text-base rounded-2xl shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 text-center"
                >
                  <span>View Collections</span>
                  <Sparkles className="w-4 h-4 text-pink-500" />
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full max-w-lg pt-4 border-t border-pink-100/90">
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-pink-100/70 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                  </div>
                  <div className="text-left leading-tight">
                    <p className="text-xs font-bold text-gray-900">4.9 / 5 Rating</p>
                    <p className="text-[10px] text-gray-500 hidden sm:block">10,000+ Happy Clients</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-pink-100/70 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                    <Truck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-left leading-tight">
                    <p className="text-xs font-bold text-gray-900">2-Hr Delivery</p>
                    <p className="text-[10px] text-gray-500 hidden sm:block">Free Over ₹999</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 bg-white/80 backdrop-blur-xs p-2.5 rounded-xl border border-pink-100/70 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-pink-500" />
                  </div>
                  <div className="text-left leading-tight">
                    <p className="text-xs font-bold text-gray-900">100% Fresh</p>
                    <p className="text-[10px] text-gray-500 hidden sm:block">Farm Sourced Daily</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-pink-900/10 border-4 border-white aspect-[4/4.4] sm:aspect-[4/4.2] group">
                  <img
                    src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1000&q=85"
                    alt="Luxury Dutch Roses Bouquet"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-gray-950/15 to-transparent" />

                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-md">
                    <span className="text-xs">✨</span>
                    <span className="text-[11px] font-bold text-gray-900 uppercase tracking-wider">Editor&apos;s Signature</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-widest text-pink-300">Bestselling Bouquet</span>
                        <h3 className="font-playfair text-xl sm:text-2xl font-bold leading-tight drop-shadow-xs">Royal Velvet Blush Roses</h3>
                        <p className="text-xs text-white/80 mt-0.5">24 Premium Dutch Stems with Glass Vase</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs text-pink-200 line-through mr-1">₹2,199</span>
                        <span className="text-xl sm:text-2xl font-black text-white">₹1,649</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl shadow-xl border border-pink-100 flex items-center gap-3 animate-float">
                  <div className="w-10 h-10 rounded-xl bg-pink-500 text-white flex items-center justify-center text-lg shadow-md shadow-pink-500/30">
                    🌙
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">Midnight Delivery</p>
                    <p className="text-[10px] text-pink-600 font-medium">Sharp at 12:00 AM</p>
                  </div>
                </div>

                <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl shadow-xl border border-pink-100 flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-400 to-rose-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                      🌸
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-[11px] font-bold text-gray-900 mt-0.5">&ldquo;Stunning & so fresh!&rdquo;</p>
                    <p className="text-[9px] text-gray-500">Verified Buyer • Mumbai</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="bg-white border-b border-gray-100">
        <StoryBar />
      </section>

      <section className="py-8 bg-gradient-to-r from-pink-500 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map(feature => (
              <div
                key={feature.title}
                className="flex items-center gap-3 text-white group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </span>
                <div>
                  <p className="font-semibold text-sm leading-tight">{feature.title}</p>
                  <p className="text-pink-100 text-xs leading-tight">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ExquisiteRange />

      <PremiumBanner />

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[1520px] mx-auto">
        <div className="text-center mb-14">
          <p className="text-pink-500 font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            Browse by Type
          </p>
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            From classic roses to exotic orchids, explore our carefully curated collections for every occasion.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map(category => (
            <Link
              key={category.name}
              href={`/shop?category=${category.name}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-pink-100/50"
            >
              <img
                src={category.image}
                alt={category.name}
                loading="eager"
                onError={(e) => {
                  const target = e.currentTarget
                  if (category.fallback && target.src !== category.fallback) {
                    target.src = category.fallback
                  }
                }}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10 group-hover:from-black/85 group-hover:via-black/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                <span className="text-2xl mb-1 filter drop-shadow-sm">{category.emoji}</span>
                <h3 className="font-playfair text-white text-xl sm:text-2xl font-bold leading-tight drop-shadow-md">
                  {category.name}
                </h3>
                <p className="text-white/80 text-xs sm:text-sm mt-1 group-hover:text-white transition-colors line-clamp-1">
                  {category.description}
                </p>
                <span className="mt-2 text-pink-300 text-xs sm:text-sm font-semibold inline-flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                  Shop now →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-pink-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-pink-500 font-semibold text-sm uppercase tracking-[0.2em] mb-3">
              Customer Favorites
            </p>
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
              Our Bestsellers
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Loved by thousands of customers — these are our most popular arrangements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="inline-block px-10 py-4 border-2 border-pink-300 text-pink-600 font-semibold rounded-full hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all duration-300 hover:shadow-lg hover:shadow-pink-100"
            >
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-pink-500 font-semibold text-sm uppercase tracking-[0.2em] mb-3">
            What Our Customers Say
          </p>
          <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-gray-800">
            Loved by Thousands
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-7 shadow-sm border border-pink-50 hover:shadow-md hover:border-pink-100 transition-all duration-300 relative"
            >
              <span className="text-6xl font-playfair text-pink-100 absolute top-4 right-6 leading-none select-none">
                &ldquo;
              </span>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-lg">★</span>
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed mb-6 italic relative z-10">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-pink-400 text-sm">{testimonial.occasion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-r from-pink-500 via-pink-600 to-rose-600 rounded-3xl p-10 sm:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <span className="absolute top-4 left-8 text-4xl opacity-20">🌸</span>
              <span className="absolute top-8 right-16 text-5xl opacity-20">🌺</span>
              <span className="absolute bottom-4 left-1/4 text-4xl opacity-20">💐</span>
              <span className="absolute bottom-6 right-8 text-3xl opacity-20">🌹</span>
            </div>

            <div className="relative z-10">
              <p className="text-pink-200 font-medium text-sm uppercase tracking-[0.3em] mb-4">
                Special Offer
              </p>
              <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-white mb-4">
                Send Love Today
              </h2>
              <p className="text-pink-100 text-lg max-w-xl mx-auto mb-8">
                Subscribe to our newsletter and get 15% off your first order.
                Fresh flowers, exclusive deals, floral tips — delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full sm:flex-1 px-5 py-3.5 rounded-full text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white/95"
                />
                <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-pink-600 font-bold rounded-full hover:bg-pink-50 transition-all duration-200 hover:shadow-lg whitespace-nowrap">
                  Get 15% Off 🎁
                </button>
              </div>
              <p className="text-pink-200 text-xs mt-4 opacity-80">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
