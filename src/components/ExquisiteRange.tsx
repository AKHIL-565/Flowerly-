'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'

interface FlowerCard {
  name: string
  category: string
  href: string
  bgColor: string
  borderColor: string
  textColor: string
  apiImage: string
  fallbackImage: string
}

const flowers: FlowerCard[] = [
  {
    name: 'Roses',
    category: 'Roses',
    href: '/shop?category=Roses',
    bgColor: 'bg-[#FCECEF]',
    borderColor: 'border-[#F8D7DF]',
    textColor: 'text-[#9c2748]',
    apiImage: '/api/flower-image/rose',
    fallbackImage: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Gerberas',
    category: 'Mixed',
    href: '/shop?category=Mixed',
    bgColor: 'bg-[#FEF8E7]',
    borderColor: 'border-[#F9EDC7]',
    textColor: 'text-[#946200]',
    apiImage: '/api/flower-image/gerbera',
    fallbackImage: 'https://images.unsplash.com/photo-1508615070457-7baeba4003ab?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Orchids',
    category: 'Orchids',
    href: '/shop?category=Orchids',
    bgColor: 'bg-[#F7EFFC]',
    borderColor: 'border-[#EED9FA]',
    textColor: 'text-[#6e229c]',
    apiImage: '/api/flower-image/orchid',
    fallbackImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Lilies',
    category: 'Lilies',
    href: '/shop?category=Lilies',
    bgColor: 'bg-[#FCF5EC]',
    borderColor: 'border-[#F7E7D4]',
    textColor: 'text-[#85511b]',
    apiImage: '/api/flower-image/lily',
    fallbackImage: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Carnations',
    category: 'Carnations',
    href: '/shop?category=Carnations',
    bgColor: 'bg-[#FDEBF0]',
    borderColor: 'border-[#FBD3DF]',
    textColor: 'text-[#a12351]',
    apiImage: '/api/flower-image/carnation',
    fallbackImage: 'https://images.unsplash.com/photo-1584448141569-69f342da535c?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Sunflowers',
    category: 'Sunflowers',
    href: '/shop?category=Sunflowers',
    bgColor: 'bg-[#FFFBE6]',
    borderColor: 'border-[#FDF4B8]',
    textColor: 'text-[#876a00]',
    apiImage: '/api/flower-image/sunflower',
    fallbackImage: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80',
  },
]

function FlowerCardItem({ item }: { item: FlowerCard }) {
  const [imgSrc, setImgSrc] = useState(item.apiImage)
  const [failedOnce, setFailedOnce] = useState(false)

  const handleError = () => {
    if (!failedOnce) {
      setImgSrc(item.fallbackImage)
      setFailedOnce(true)
    }
  }

  return (
    <Link
      href={item.href}
      className={`
        group relative flex flex-col items-center justify-between
        rounded-[28px] sm:rounded-[32px]
        ${item.bgColor} border ${item.borderColor}
        min-h-[340px] sm:min-h-[400px]
        hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-900/10
        transition-all duration-300 cursor-pointer overflow-hidden
      `}
    >
      {/* ── Botanical Flower Stems (Seamlessly Blended) ── */}
      <div className="relative w-full flex-1 flex items-end justify-center pt-6 pb-2 px-4 overflow-hidden">
        <img
          src={imgSrc}
          alt={item.name}
          onError={handleError}
          className="
            w-full h-56 sm:h-72 object-contain object-bottom
            mix-blend-multiply
            transition-transform duration-500 ease-out
            group-hover:scale-105 group-hover:-translate-y-1
          "
        />
      </div>

      {/* ── Bottom Pill Button (FNP Reference Match) ── */}
      <div className="w-full px-4 pb-4 pt-2 z-10">
        <div className="
          w-full py-2.5 px-4
          bg-white text-gray-900 group-hover:text-pink-600
          font-bold text-xs sm:text-sm tracking-wide text-center
          rounded-full shadow-sm group-hover:shadow-md
          transition-all duration-200 select-none
        ">
          {item.name}
        </div>
      </div>
    </Link>
  )
}

export default function ExquisiteRange() {
  return (
    <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-[1520px] mx-auto">
      {/* ── Header with Sparkles (FNP Style) ── */}
      <div className="text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center justify-center gap-2.5 mb-2">
          <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
          <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Explore Our Exquisite Range
          </h2>
          <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
        </div>
        <p className="text-gray-500 text-xs sm:text-sm max-w-md mx-auto">
          Handcrafted luxury blooms curated by master florists for moments that deserve the extraordinary
        </p>
      </div>

      {/* ── 6 Exquisite Stem Cards Grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
        {flowers.map(item => (
          <FlowerCardItem key={item.name} item={item} />
        ))}
      </div>
    </section>
  )
}
