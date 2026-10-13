'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  ShoppingCart, Menu, X, Search, MapPin,
  User, Heart, ChevronDown, Gift, Sparkles, Zap, ArrowRight, Truck, ShieldCheck
} from 'lucide-react'
import { useCart } from '@/context/CartContext'

interface SubMenuItem {
  name: string
  href: string
  desc: string
  icon: string
}

interface NavItem {
  label: string
  href: string
  highlight?: 'green' | 'gold'
  items?: SubMenuItem[]
  featuredImage?: string
  featuredTitle?: string
  featuredPrice?: string
}

const navItems: NavItem[] = [
  {
    label: 'Flowers',
    href: '/shop',
    featuredImage: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=400&q=80',
    featuredTitle: 'Romantic Red Roses',
    featuredPrice: '₹1,649',
    items: [
      { name: 'Roses Collection', href: '/shop?category=Roses', desc: 'Dutch red, blush & yellow roses', icon: '🌹' },
      { name: 'Handcrafted Bouquets', href: '/shop?category=Bouquets', desc: 'Artisanal seasonal bouquets', icon: '💐' },
      { name: 'Exotic Orchids', href: '/shop?category=Orchids', desc: 'Phalaenopsis & Dendrobiums', icon: '🪷' },
      { name: 'Pure Lilies', href: '/shop?category=Lilies', desc: 'Oriental & Asiatic lilies', icon: '🌸' },
      { name: 'Carnations Bunch', href: '/shop?category=Carnations', desc: 'Ruffled long-lasting blooms', icon: '🌺' },
      { name: 'Golden Sunflowers', href: '/shop?category=Sunflowers', desc: 'Bright cheerful blossoms', icon: '🌻' },
      { name: 'Seasonal & Dried', href: '/shop?category=Seasonal', desc: 'Dutch tulips & lavender', icon: '🌷' },
      { name: 'View All 50 Flowers', href: '/shop', desc: 'Explore complete floral collection', icon: '✨' },
    ],
  },
  {
    label: 'Birthday',
    href: '/shop?occasion=Birthday',
    featuredImage: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=400&q=80',
    featuredTitle: 'Birthday Bliss Bouquet',
    featuredPrice: '₹1,349',
    items: [
      { name: 'Birthday Flowers', href: '/shop?occasion=Birthday', desc: 'Celebratory colorful bouquets', icon: '🎂' },
      { name: 'Birthday Roses', href: '/shop?occasion=Birthday&category=Roses', desc: 'Classic red & blush roses', icon: '🌹' },
      { name: 'Midnight Delivery', href: '/shop?speed=Midnight+Delivery', desc: 'Delivered sharp at 12:00 AM', icon: '🌙' },
      { name: 'Luxury Flower Boxes', href: '/shop?arrangement=Luxury+Boxes', desc: 'Parisian round hatboxes', icon: '🎁' },
    ],
  },
  {
    label: 'Anniversary',
    href: '/shop?occasion=Anniversary',
    featuredImage: 'https://images.unsplash.com/photo-1591886960571-74d43a9d4166?auto=format&fit=crop&w=400&q=80',
    featuredTitle: 'Velvet Crimson Hatbox',
    featuredPrice: '₹2,199',
    items: [
      { name: 'Anniversary Roses', href: '/shop?occasion=Anniversary&category=Roses', desc: 'Long-stem Dutch roses', icon: '❤️' },
      { name: '50 Roses Heart', href: '/shop?occasion=Anniversary&badge=Bestseller', desc: 'Grand romantic milestone', icon: '💖' },
      { name: 'Luxury Orchid Planters', href: '/shop?category=Orchids', desc: 'Twin stem Phalaenopsis', icon: '🪴' },
      { name: 'Anniversary Gifts', href: '/shop?occasion=Anniversary', desc: 'Flowers & signature boxes', icon: '🎀' },
    ],
  },
  {
    label: 'Occasions',
    href: '/shop',
    featuredImage: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=400&q=80',
    featuredTitle: 'Blush & White Serenade',
    featuredPrice: '₹1,799',
    items: [
      { name: 'Love & Romance', href: '/shop?occasion=Love+%26+Romance', desc: 'Express your feelings', icon: '💘' },
      { name: 'Congratulations', href: '/shop?occasion=Congratulations', desc: 'Vibrant celebratory blooms', icon: '🥂' },
      { name: 'Thank You Flowers', href: '/shop?occasion=Thank+You', desc: 'Show heartfelt gratitude', icon: '💛' },
      { name: 'Housewarming Gifts', href: '/shop?occasion=Housewarming', desc: 'Vases & planters', icon: '🏡' },
      { name: 'Get Well Soon', href: '/shop?occasion=Sympathy+%26+Get+Well', desc: 'Uplifting sunny arrangements', icon: '☀️' },
      { name: 'Sympathy & Solace', href: '/shop?occasion=Sympathy+%26+Get+Well', desc: 'Serene white lilies', icon: '🕊️' },
    ],
  },
  {
    label: 'Arrangements',
    href: '/shop',
    featuredImage: 'https://images.unsplash.com/photo-1583225214464-9296029427aa?auto=format&fit=crop&w=400&q=80',
    featuredTitle: 'Grand Floral Basket',
    featuredPrice: '₹2,299',
    items: [
      { name: 'Handcrafted Bouquets', href: '/shop?arrangement=Bouquets', desc: 'Korean matte wrap style', icon: '💐' },
      { name: 'Glass Vases & Jars', href: '/shop?arrangement=Vases+%26+Jars', desc: 'Tabletop centerpieces', icon: '🏺' },
      { name: 'Luxury Parisian Boxes', href: '/shop?arrangement=Luxury+Boxes', desc: 'Velvet round hatboxes', icon: '📦' },
      { name: 'Traditional Wicker Baskets', href: '/shop?arrangement=Handcrafted+Baskets', desc: 'Grand handle baskets', icon: '🧺' },
    ],
  },
  {
    label: 'Same-Day',
    href: '/shop?speed=Same-Day+Delivery',
    highlight: 'green',
  },
  {
    label: 'LUXE',
    href: '/shop?badge=Bestseller',
    highlight: 'gold',
  },
]

const deliveryCities = [
  { name: 'Mumbai', tag: '2-Hr Express', icon: '🌊' },
  { name: 'Delhi NCR', tag: '2-Hr Express', icon: '🏛️' },
  { name: 'Bengaluru', tag: 'Same-Day', icon: '🌳' },
  { name: 'Kerala', tag: 'Same-Day', icon: '🌴' },
  { name: 'Hyderabad', tag: 'Same-Day', icon: '💎' },
  { name: 'Chennai', tag: 'Same-Day', icon: '🏖️' },
  { name: 'Pune', tag: '2-Hr Express', icon: '⛰️' },
  { name: 'Kolkata', tag: 'Same-Day', icon: '🌉' },
  { name: 'Ahmedabad', tag: 'Same-Day', icon: '🪁' },
  { name: 'Jaipur', tag: 'Same-Day', icon: '🏰' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false)
  const [citySearch, setCitySearch] = useState('')

  const [pinnedDropdown, setPinnedDropdown] = useState<string | null>(null)
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null)

  const activeDropdown = pinnedDropdown || hoveredDropdown

  const { totalItems, totalWishlist, selectedCity, setSelectedCity } = useCart()
  const pathname = usePathname()
  const router = useRouter()

  const navRef = useRef<HTMLDivElement>(null)
  const cityDropdownRef = useRef<HTMLDivElement>(null)
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setPinnedDropdown(null)
    setHoveredDropdown(null)
    setCityDropdownOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setPinnedDropdown(null)
        setHoveredDropdown(null)
      }
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(e.target as Node)) {
        setCityDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleMouseEnter = (label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
    setHoveredDropdown(label)
  }

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
    closeTimeoutRef.current = setTimeout(() => {
      setHoveredDropdown(null)
    }, 250)
  }

  const handleToggleClick = (label: string) => {
    if (pinnedDropdown === label) {
      setPinnedDropdown(null)
      setHoveredDropdown(null)
    } else {
      setPinnedDropdown(label)
      setHoveredDropdown(label)
    }
  }

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push('/shop')
    }
  }

  const filteredCities = deliveryCities.filter(c =>
    c.name.toLowerCase().includes(citySearch.toLowerCase())
  )

  return (
    <>
      <div className={`sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}>

        <div className="bg-white border-b border-gray-100">
          <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 h-[72px]">

              <Link href="/" className="flex items-center gap-3 shrink-0 group">
                <div className="relative w-11 h-11 shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <img
                    src="/logo.svg"
                    alt="Flowerly Brand Logo"
                    className="w-full h-full object-contain filter drop-shadow-sm"
                  />
                </div>
                <div className="hidden sm:block leading-none">
                  <span className="font-playfair text-[1.45rem] font-bold tracking-tight text-gray-900 group-hover:text-pink-600 transition-colors">
                    Flower<span className="text-pink-500">ly</span>
                  </span>
                  <p className="text-[9px] font-semibold tracking-[0.18em] text-gray-400 uppercase mt-0.5">
                    Floral Boutique
                  </p>
                </div>
              </Link>

              <div ref={cityDropdownRef} className="relative hidden lg:block shrink-0">
                <button
                  type="button"
                  onClick={() => setCityDropdownOpen(prev => !prev)}
                  className={`flex items-center gap-2 shrink-0 px-3.5 py-2.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                    cityDropdownOpen || selectedCity !== 'Select City'
                      ? 'border-pink-300 bg-pink-50/40'
                      : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50/40'
                  } group`}
                >
                  <MapPin className="w-4 h-4 text-pink-500 shrink-0" />
                  <div className="text-left leading-tight">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Deliver to</p>
                    <p className="text-xs font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">
                      {selectedCity}
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-3 h-3 text-gray-400 group-hover:text-pink-400 transition-transform duration-200 ${
                      cityDropdownOpen ? 'rotate-180 text-pink-500' : ''
                    }`}
                  />
                </button>

                {cityDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-pink-100 p-4 z-[110] animate-fade-in">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-pink-500" />
                        Select Delivery City
                      </span>
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Express Active
                      </span>
                    </div>

                    <div className="relative mb-3">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search your city..."
                        value={citySearch}
                        onChange={e => setCitySearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-gray-200 focus:border-pink-400 focus:outline-none bg-gray-50 focus:bg-white"
                      />
                    </div>

                    <div className="max-h-56 overflow-y-auto space-y-1 pr-1">
                      {filteredCities.length > 0 ? (
                        filteredCities.map(city => {
                          const isSelected = selectedCity === city.name
                          return (
                            <button
                              key={city.name}
                              type="button"
                              onClick={() => {
                                setSelectedCity(city.name)
                                setCityDropdownOpen(false)
                                setCitySearch('')
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-pink-50 text-pink-600 border border-pink-200 font-bold'
                                  : 'hover:bg-gray-50 text-gray-700 font-medium'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="text-sm">{city.icon}</span>
                                <span className="text-xs">{city.name}</span>
                              </div>
                              <span
                                className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                                  isSelected
                                    ? 'bg-pink-500 text-white'
                                    : 'bg-gray-100 text-gray-500'
                                }`}
                              >
                                {city.tag}
                              </span>
                            </button>
                          )
                        })
                      ) : (
                        <p className="text-center text-xs text-gray-400 py-4">
                          No matching city found
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex-1 relative min-w-0 max-w-2xl mx-auto">
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <Search className="absolute left-4 w-4 h-4 text-gray-400 pointer-events-none z-10" />
                  <input
                    type="text"
                    placeholder="Search roses, orchids, bouquets, birthday flowers..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleSearchSubmit()
                    }}
                    className="
                      w-full pl-11 pr-32 py-2.5 rounded-full
                      border border-gray-200 bg-gray-50
                      text-xs sm:text-sm text-gray-800 placeholder-gray-400
                      hover:bg-white hover:border-pink-300
                      focus:bg-white focus:border-pink-400 focus:ring-4 focus:ring-pink-100
                      transition-all duration-200 outline-none
                    "
                  />
                  <button
                    type="submit"
                    className="
                      absolute right-1.5 flex items-center gap-1.5
                      bg-gradient-to-r from-pink-500 to-rose-600
                      hover:from-pink-600 hover:to-rose-700
                      active:scale-95
                      text-white text-xs font-bold px-4 py-2 rounded-full
                      shadow-sm shadow-pink-200
                      transition-all duration-200 cursor-pointer
                    "
                  >
                    <Gift className="w-3.5 h-3.5" />
                    Finder
                  </button>
                </form>
              </div>

              <div className="flex items-center shrink-0">
                <Link
                  href="/wishlist"
                  className="hidden md:flex flex-col items-center gap-0.5 w-14 py-2 rounded-xl hover:bg-pink-50 transition-colors text-gray-600 hover:text-pink-600 group relative"
                >
                  <div className="relative">
                    <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    {totalWishlist > 0 && (
                      <span className="absolute -top-1.5 -right-2 bg-pink-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center ring-2 ring-white">
                        {totalWishlist}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-semibold tracking-wide">Wishlist</span>
                </Link>

                <Link
                  href="/orders"
                  className="hidden md:flex flex-col items-center gap-0.5 w-14 py-2 rounded-xl hover:bg-pink-50 transition-colors text-gray-600 hover:text-pink-600 group relative"
                  title="Track Your Order"
                >
                  <Truck className="w-5 h-5 group-hover:scale-110 transition-transform text-gray-600 group-hover:text-pink-600" />
                  <span className="text-[10px] font-semibold tracking-wide">Track</span>
                </Link>

                <Link
                  href="/cart"
                  className="flex flex-col items-center gap-0.5 w-14 py-2 rounded-xl hover:bg-pink-50 transition-colors text-gray-600 hover:text-pink-600 group relative"
                >
                  <div className="relative">
                    <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    {totalItems > 0 && (
                      <span className="absolute -top-1.5 -right-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center ring-2 ring-white shadow-sm">
                        {totalItems}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-semibold tracking-wide">Cart</span>
                </Link>

                <button
                  onClick={() => setMobileOpen(true)}
                  className="md:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-700 ml-1"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>

            </div>
          </div>
        </div>

        <div ref={navRef} className="bg-white border-b border-gray-200/80 hidden md:block relative">
          <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1 h-11">

              {navItems.map(nav => {
                const hasSubmenu = Boolean(nav.items && nav.items.length > 0)
                const isOpen = activeDropdown === nav.label
                const isPinned = pinnedDropdown === nav.label

                return (
                  <div
                    key={nav.label}
                    className="relative shrink-0"
                    onMouseEnter={() => hasSubmenu && handleMouseEnter(nav.label)}
                    onMouseLeave={hasSubmenu ? handleMouseLeave : undefined}
                  >
                    {hasSubmenu ? (
                      <button
                        onClick={() => handleToggleClick(nav.label)}
                        className={`
                          flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                          transition-all duration-150 cursor-pointer select-none
                          ${isOpen
                            ? 'text-pink-600 bg-pink-50/80 shadow-xs ring-1 ring-pink-200/60'
                            : 'text-gray-700 hover:text-pink-600 hover:bg-gray-50'
                          }
                        `}
                      >
                        <span>{nav.label}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-pink-500' : 'text-gray-400'}`}
                        />
                      </button>
                    ) : (
                      <Link
                        href={nav.href}
                        className={`
                          flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                          transition-all duration-150
                          ${nav.highlight === 'green'
                            ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 font-bold'
                            : nav.highlight === 'gold'
                            ? 'text-amber-800 bg-amber-50 hover:bg-amber-100 font-bold'
                            : 'text-gray-700 hover:text-pink-600 hover:bg-gray-50'
                          }
                        `}
                      >
                        {nav.highlight === 'green' && <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />}
                        {nav.highlight === 'gold' && <Sparkles className="w-3.5 h-3.5 text-amber-600" />}
                        <span>{nav.label}</span>
                      </Link>
                    )}

                    {hasSubmenu && isOpen && (
                      <div
                        onMouseEnter={() => handleMouseEnter(nav.label)}
                        onMouseLeave={handleMouseLeave}
                        className={`
                          absolute top-full pt-1 z-[100]
                          ${nav.label === 'Arrangements' ? 'right-0' : 'left-0'}
                        `}
                      >
                        <div className="w-[620px] max-w-[94vw] bg-white rounded-3xl shadow-2xl border border-pink-100/80 p-6 animate-fade-in">
                          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                              <span className="text-base">🌸</span>
                              <h3 className="font-playfair text-base font-bold text-gray-900">
                                {nav.label} Collections
                              </h3>
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-2.5 py-0.5 rounded-full">
                              Handcrafted Fresh Stems
                            </span>
                          </div>

                          <div className="grid grid-cols-12 gap-6 items-stretch">
                            <div className="col-span-8 grid grid-cols-2 gap-2.5">
                              {nav.items?.map(sub => (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  onClick={() => {
                                    setPinnedDropdown(null)
                                    setHoveredDropdown(null)
                                  }}
                                  className="flex items-start gap-3 p-2.5 rounded-2xl border border-gray-100 hover:border-pink-300 hover:bg-pink-50/50 transition-all duration-200 group/item shadow-xs hover:shadow-sm"
                                >
                                  <div className="w-9 h-9 rounded-xl bg-pink-50 group-hover/item:bg-white text-base flex items-center justify-center shrink-0 shadow-xs group-hover/item:scale-110 transition-transform">
                                    {sub.icon}
                                  </div>
                                  <div className="min-w-0">
                                    <p className="text-xs font-bold text-gray-800 group-hover/item:text-pink-600 transition-colors truncate">
                                      {sub.name}
                                    </p>
                                    <p className="text-[10px] text-gray-400 group-hover/item:text-gray-600 line-clamp-1 mt-0.5">
                                      {sub.desc}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>

                            {nav.featuredImage && (
                              <div className="col-span-4 rounded-2xl bg-gradient-to-br from-pink-50/90 via-rose-50/40 to-amber-50/40 p-4 border border-pink-100/80 flex flex-col justify-between shadow-sm">
                                <div>
                                  <span className="inline-block text-[9px] font-black uppercase tracking-wider text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded-md mb-2">
                                    ⭐ TOP PICK
                                  </span>
                                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-white shadow-sm mb-2.5 group/img">
                                    <img
                                      src={nav.featuredImage}
                                      alt={nav.featuredTitle}
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                                    />
                                  </div>
                                  <p className="text-xs font-bold text-gray-900 leading-snug">
                                    {nav.featuredTitle}
                                  </p>
                                  <div className="flex items-baseline gap-1 mt-1">
                                    <span className="text-xs font-black text-pink-600">
                                      {nav.featuredPrice}
                                    </span>
                                    <span className="text-[10px] text-green-600 font-medium">
                                      • Free Delivery
                                    </span>
                                  </div>
                                </div>
                                <Link
                                  href={nav.href}
                                  onClick={() => {
                                    setPinnedDropdown(null)
                                    setHoveredDropdown(null)
                                  }}
                                  className="mt-3 w-full py-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white text-xs font-bold rounded-xl shadow-md shadow-pink-200 transition-all text-center flex items-center justify-center gap-1.5"
                                >
                                  <span>View Collection</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                              </div>
                            )}
                          </div>

                          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
                            <span className="flex items-center gap-1.5">
                              <Truck className="w-3.5 h-3.5 text-emerald-600" />
                              Free Same-Day Express Delivery Across India
                            </span>
                            <span className="flex items-center gap-1.5">
                              <ShieldCheck className="w-3.5 h-3.5 text-pink-500" />
                              100% Farm Fresh Guarantee
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        onClick={() => setMobileOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full z-[70] w-80 bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
            <div className="w-9 h-9 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center text-lg shadow-sm">
              🌸
            </div>
            <span className="font-playfair text-xl font-bold text-gray-900">
              Flower<span className="text-pink-500">ly</span>
            </span>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          <div className="mb-4 px-2">
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1.5">
              Deliver To City
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-pink-500 pointer-events-none" />
              <select
                value={selectedCity === 'Select City' ? '' : selectedCity}
                onChange={e => {
                  if (e.target.value) setSelectedCity(e.target.value)
                }}
                className="w-full pl-8 pr-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800 bg-pink-50/40 focus:border-pink-400 focus:outline-none"
              >
                <option value="" disabled>Select Delivery City</option>
                {deliveryCities.map(c => (
                  <option key={c.name} value={c.name}>
                    {c.icon} {c.name} ({c.tag})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-3 pt-1 pb-2">
            Categories & Collections
          </p>
          {navItems.map(nav => (
            <div key={nav.label} className="border-b border-gray-50 pb-1">
              <Link
                href={nav.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-gray-800 hover:bg-pink-50 hover:text-pink-600 transition-colors font-semibold text-xs"
              >
                <span>{nav.label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 -rotate-90" />
              </Link>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-2">
          <Link
            href="/wishlist"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold text-xs"
          >
            <Heart className="w-4 h-4 text-pink-500" />
            Wishlist {totalWishlist > 0 && `(${totalWishlist})`}
          </Link>
          <Link
            href="/cart"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold text-xs shadow-lg shadow-pink-200"
          >
            <ShoppingCart className="w-4 h-4" />
            View Cart {totalItems > 0 && `(${totalItems})`}
          </Link>
        </div>
      </div>
    </>
  )
}
