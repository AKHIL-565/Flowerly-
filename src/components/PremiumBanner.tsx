'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function PremiumBanner() {
  const [imgSrc, setImgSrc] = useState(
    'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&w=800&q=85'
  )

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-[1520px] mx-auto my-12">
      <div className="relative rounded-[2.5rem] bg-[#fbf6ee] border border-[#f3ead7] overflow-hidden p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
        {/* Botanical Background Illustrations (decorative SVGs) */}
        <div className="absolute top-4 left-6 w-24 h-24 opacity-30 pointer-events-none select-none">
          <svg viewBox="0 0 100 100" fill="none" stroke="#657e33" strokeWidth="2.5">
            <path d="M10 80 Q 40 20 80 10" />
            <circle cx="80" cy="10" r="8" fill="#e6a817" />
            <path d="M30 50 Q 20 30 15 25" />
            <path d="M50 35 Q 65 25 70 20" />
          </svg>
        </div>

        <div className="absolute top-6 left-1/3 w-32 h-32 opacity-25 pointer-events-none select-none">
          <svg viewBox="0 0 100 100" fill="#4d6628">
            <path d="M50 0 C60 30 90 40 100 50 C70 60 60 90 50 100 C40 70 10 60 0 50 C30 40 40 10 50 0 Z" opacity="0.3" />
          </svg>
        </div>

        {/* Left Headline & Content */}
        <div className="relative z-10 max-w-xl text-left">
          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full uppercase tracking-wider mb-4">
            Curated For Connoisseurs
          </span>
          <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#2a2a2a] leading-tight mb-4">
            Premium Collection
          </h2>
          <p className="text-gray-600 text-lg sm:text-xl font-normal leading-relaxed mb-8">
            Get the finest and freshest flowers, handcrafted with signature precision and luxury presentation.
          </p>

          <Link
            href="/shop?badge=Bestseller"
            className="inline-flex items-center gap-3 bg-[#4d6628] hover:bg-[#3c501f] text-white px-8 py-4 rounded-full font-bold text-base shadow-lg shadow-[#4d6628]/20 transition-all hover:gap-4 hover:shadow-xl group"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Right Floral Visual */}
        <div className="relative z-10 shrink-0 w-full md:w-auto flex justify-center">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-pink-50">
            <img
              src={imgSrc}
              alt="Premium Fresh Flower Collection"
              onError={() =>
                setImgSrc(
                  'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80'
                )
              }
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Floating Circle Button */}
          <Link
            href="/shop?badge=Bestseller"
            className="absolute -top-3 right-4 sm:top-4 sm:right-0 w-14 h-14 sm:w-16 sm:h-16 bg-[#5f7a2d] hover:bg-[#4d6628] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all z-20 group"
            aria-label="View collection"
          >
            <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}
