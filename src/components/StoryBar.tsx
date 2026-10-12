'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronRight, ChevronLeft } from 'lucide-react'

const stories = [
  {
    name: 'All Flowers',
    href: '/shop',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Roses',
    href: '/shop?category=Roses',
    image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Bouquets',
    href: '/shop?category=Bouquets',
    image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Lilies',
    href: '/shop?category=Lilies',
    image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Orchids',
    href: '/shop?category=Orchids',
    image: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Carnations',
    href: '/shop?category=Carnations',
    image: 'https://images.unsplash.com/photo-1584448141569-69f342da535c?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Sunflowers',
    href: '/shop?category=Sunflowers',
    image: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Dried Flowers',
    href: '/shop?category=Seasonal',
    image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Luxury Blooms',
    href: '/shop?badge=Bestseller',
    image: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Birthdays',
    href: '/shop?occasion=Birthday',
    image: 'https://images.unsplash.com/photo-1508615070457-7baeba4003ab?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Anniversaries',
    href: '/shop?occasion=Anniversary',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Love & Romance',
    href: '/shop?occasion=Love+%26+Romance',
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Get Same Day',
    href: '/shop?speed=Same-Day+Delivery',
    image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Flower Vases',
    href: '/shop?arrangement=Vases+%26+Jars',
    image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Flower Baskets',
    href: '/shop?arrangement=Handcrafted+Baskets',
    image: 'https://images.unsplash.com/photo-1583225214464-9296029427aa?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'New In',
    href: '/shop?badge=New',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=400&q=80',
  },
]

function StoryCircle({ item }: { item: typeof stories[0] }) {
  const [imgSrc, setImgSrc] = useState(item.image)

  return (
    <Link
      href={item.href}
      className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer"
    >
      {/* Circle container */}
      <div className="w-[82px] h-[82px] sm:w-[90px] sm:h-[90px] rounded-full overflow-hidden bg-gray-50 border border-gray-200/90 shadow-sm group-hover:shadow-md group-hover:scale-105 group-hover:border-pink-400 transition-all duration-300">
        <img
          src={imgSrc}
          alt={item.name}
          onError={() => setImgSrc('https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=400&q=80')}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Label */}
      <span className="text-[12px] font-medium text-gray-700 group-hover:text-pink-600 transition-colors text-center whitespace-nowrap">
        {item.name}
      </span>
    </Link>
  )
}

export default function StoryBar() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'right' ? 320 : -320,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="relative max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
      <div className="relative flex items-center">
        {/* Left scroll button */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white border border-gray-200 shadow-md hover:shadow-lg rounded-full items-center justify-center text-gray-700 hover:text-black transition-all hover:scale-105"
          aria-label="Previous categories"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Story Circles Track - Full continuous width */}
        <div
          ref={scrollRef}
          className="flex items-center gap-6 sm:gap-7 overflow-x-auto scrollbar-hide py-1 px-1 scroll-smooth w-full"
        >
          {stories.map(item => (
            <StoryCircle key={item.name} item={item} />
          ))}
        </div>

        {/* Right scroll button (matching reference) */}
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white border border-gray-200 shadow-md hover:shadow-lg rounded-full items-center justify-center text-gray-700 hover:text-black transition-all hover:scale-105"
          aria-label="Next categories"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
