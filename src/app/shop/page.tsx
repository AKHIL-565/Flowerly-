'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'

import {
  Search as SearchIcon,
  SlidersHorizontal as SlidersIcon,
  X as CloseIcon,
  ChevronDown as ChevronDownIcon,
  Minus as MinusIcon,
  Plus as PlusIcon,
  Check as CheckIcon,
  RotateCcw as ResetIcon,
  Filter as FilterIcon,
  Sparkles as SparklesIcon
} from 'lucide-react'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import StoryBar from '@/components/StoryBar'
import { products } from '@/data/products'
import { useSearchParams, useRouter } from 'next/navigation'

const categories = ['All', 'Roses', 'Bouquets', 'Lilies', 'Carnations', 'Orchids', 'Sunflowers', 'Mixed', 'Seasonal']

const sortOptions = [
  { value: 'featured',   label: 'Recommended' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Highest Rated' },
  { value: 'name',       label: 'Name A–Z' },
]

const occasionList = [
  'Birthday',
  'Anniversary',
  'Love & Romance',
  'Congratulations',
  'Thank You',
  'Sympathy & Get Well',
  'Housewarming',
]

const deliverySpeeds = [
  { label: 'Same-Day Delivery', icon: '⚡' },
  { label: 'Midnight Delivery', icon: '🌙' },
  { label: 'Express 2-Hour Delivery', icon: '🚀' },
]

const arrangementTypes = ['Bouquets', 'Vases & Jars', 'Luxury Boxes', 'Handcrafted Baskets']

const MAX_PRICE = 3500

function FilterSidebar({
  selectedCategories,
  toggleCategory,
  priceRange,
  setPriceRange,
  selectedOccasions,
  toggleOccasion,
  selectedSpeeds,
  toggleSpeed,
  selectedArrangements,
  toggleArrangement,
  onReset,
  onClose,
}: {
  selectedCategories: string[]
  toggleCategory: (c: string) => void
  priceRange: [number, number]
  setPriceRange: (r: [number, number]) => void
  selectedOccasions: string[]
  toggleOccasion: (o: string) => void
  selectedSpeeds: string[]
  toggleSpeed: (s: string) => void
  selectedArrangements: string[]
  toggleArrangement: (a: string) => void
  onReset: () => void
  onClose?: () => void
}) {
  const [openSections, setOpenSections] = useState({
    price: true,
    giftType: true,
    occasion: true,
    delivery: true,
    arrangement: true,
  })

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    priceRange[1] < MAX_PRICE ||
    selectedOccasions.length > 0 ||
    selectedSpeeds.length > 0 ||
    selectedArrangements.length > 0

  return (
    <div className="space-y-6 pb-8 text-sm">
      {/* ── Sidebar Top Header ── */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-200/80">
        <div className="flex items-center gap-2">
          <FilterIcon className="w-4 h-4 text-gray-700" />
          <h2 className="font-playfair text-xl font-bold text-gray-900 tracking-tight">Filter</h2>
        </div>

        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="text-xs font-semibold text-pink-600 hover:text-pink-700 hover:underline flex items-center gap-1 transition-colors"
            >
              <ResetIcon className="w-3 h-3" /> Reset
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full lg:hidden">
              <CloseIcon className="w-5 h-5 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {/* ── Price Filter Accordion ── */}
      <div className="border-b border-gray-100 pb-5">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between py-1 text-left font-bold text-gray-900 text-sm group"
        >
          <span>Price</span>
          <span className="text-gray-400 group-hover:text-gray-700 transition-colors">
            {openSections.price ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
          </span>
        </button>

        {openSections.price && (
          <div className="mt-4 space-y-3">
            {/* Histogram bars */}
            <div className="flex items-end gap-1 h-11 px-1">
              {[2, 3, 5, 8, 12, 17, 20, 18, 14, 9, 6, 4, 3, 2].map((height, idx) => {
                const barPrice = (idx / 13) * MAX_PRICE
                const isActive = barPrice <= priceRange[1]
                return (
                  <div
                    key={idx}
                    className={`flex-1 rounded-t-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-t from-emerald-500 to-emerald-400'
                        : 'bg-gray-200'
                    }`}
                    style={{ height: `${height * 2.2}px` }}
                  />
                )
              })}
            </div>

            <input
              type="range"
              min={800}
              max={MAX_PRICE}
              step={50}
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full accent-pink-500 h-1.5 bg-gray-200 rounded-lg cursor-pointer"
            />

            <div className="flex items-center justify-between text-xs text-gray-600 font-semibold pt-1">
              <span>₹800</span>
              <span className="text-pink-600 font-bold bg-pink-50 px-2 py-0.5 rounded border border-pink-200/60">
                Up to ₹{priceRange[1].toLocaleString('en-IN')}
              </span>
              <span>₹{MAX_PRICE.toLocaleString('en-IN')}</span>
            </div>
          </div>
        )}
      </div>

      {/* ── Category Accordion ── */}
      <div className="border-b border-gray-100 pb-5">
        <button
          onClick={() => toggleSection('giftType')}
          className="w-full flex items-center justify-between py-1 text-left font-bold text-gray-900 text-sm group"
        >
          <div className="flex items-center gap-2">
            <span>Flower Type</span>
            {selectedCategories.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-pink-500" />
            )}
          </div>
          <span className="text-gray-400 group-hover:text-gray-700 transition-colors">
            {openSections.giftType ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
          </span>
        </button>

        {openSections.giftType && (
          <div className="mt-3 space-y-1.5">
            {categories.map(cat => {
              const isChecked = cat === 'All'
                ? selectedCategories.length === 0
                : selectedCategories.includes(cat)

              const count = cat === 'All'
                ? products.length
                : products.filter(p => p.category === cat).length

              return (
                <label
                  key={cat}
                  className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                        isChecked
                          ? 'bg-pink-500 border-pink-500 text-white shadow-sm'
                          : 'border-gray-300 bg-white group-hover:border-pink-300'
                      }`}
                      onClick={() => toggleCategory(cat)}
                    >
                      {isChecked && <CheckIcon className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span
                      onClick={() => toggleCategory(cat)}
                      className={`text-xs transition-colors truncate ${
                        isChecked ? 'font-bold text-gray-900' : 'text-gray-600 group-hover:text-gray-900'
                      }`}
                    >
                      {cat === 'All' ? 'All Flowers' : cat}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400 font-medium">({count})</span>
                </label>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Occasion Accordion ── */}
      <div className="border-b border-gray-100 pb-5">
        <button
          onClick={() => toggleSection('occasion')}
          className="w-full flex items-center justify-between py-1 text-left font-bold text-gray-900 text-sm group"
        >
          <div className="flex items-center gap-2">
            <span>Occasion</span>
            {selectedOccasions.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-pink-500" />
            )}
          </div>
          <span className="text-gray-400 group-hover:text-gray-700 transition-colors">
            {openSections.occasion ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
          </span>
        </button>

        {openSections.occasion && (
          <div className="mt-3 space-y-1.5">
            {occasionList.map(occ => {
              const isChecked = selectedOccasions.includes(occ)
              const count = products.filter(p => p.occasions?.includes(occ)).length

              return (
                <label
                  key={occ}
                  className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                        isChecked
                          ? 'bg-pink-500 border-pink-500 text-white shadow-sm'
                          : 'border-gray-300 bg-white group-hover:border-pink-300'
                      }`}
                      onClick={() => toggleOccasion(occ)}
                    >
                      {isChecked && <CheckIcon className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span
                      onClick={() => toggleOccasion(occ)}
                      className={`text-xs truncate ${
                        isChecked ? 'font-bold text-gray-900' : 'text-gray-600 group-hover:text-gray-900'
                      }`}
                    >
                      {occ}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400">({count})</span>
                </label>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Arrangement Style Accordion ── */}
      <div className="border-b border-gray-100 pb-5">
        <button
          onClick={() => toggleSection('arrangement')}
          className="w-full flex items-center justify-between py-1 text-left font-bold text-gray-900 text-sm group"
        >
          <div className="flex items-center gap-2">
            <span>Arrangement Style</span>
            {selectedArrangements.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-pink-500" />
            )}
          </div>
          <span className="text-gray-400 group-hover:text-gray-700 transition-colors">
            {openSections.arrangement ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
          </span>
        </button>

        {openSections.arrangement && (
          <div className="mt-3 space-y-1.5">
            {arrangementTypes.map(arr => {
              const isChecked = selectedArrangements.includes(arr)
              const count = products.filter(p => p.arrangement === arr).length
              return (
                <label
                  key={arr}
                  className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                        isChecked
                          ? 'bg-pink-500 border-pink-500 text-white shadow-sm'
                          : 'border-gray-300 bg-white group-hover:border-pink-300'
                      }`}
                      onClick={() => toggleArrangement(arr)}
                    >
                      {isChecked && <CheckIcon className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span
                      onClick={() => toggleArrangement(arr)}
                      className={`text-xs truncate ${
                        isChecked ? 'font-bold text-gray-900' : 'text-gray-600 group-hover:text-gray-900'
                      }`}
                    >
                      {arr}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400">({count})</span>
                </label>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Delivery Speed Accordion ── */}
      <div>
        <button
          onClick={() => toggleSection('delivery')}
          className="w-full flex items-center justify-between py-1 text-left font-bold text-gray-900 text-sm group"
        >
          <div className="flex items-center gap-2">
            <span>Delivery Speed</span>
            {selectedSpeeds.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-pink-500" />
            )}
          </div>
          <span className="text-gray-400 group-hover:text-gray-700 transition-colors">
            {openSections.delivery ? <MinusIcon className="w-4 h-4" /> : <PlusIcon className="w-4 h-4" />}
          </span>
        </button>

        {openSections.delivery && (
          <div className="mt-3 space-y-1.5">
            {deliverySpeeds.map(speed => {
              const isChecked = selectedSpeeds.includes(speed.label)
              const count = products.filter(p => p.deliverySpeeds?.includes(speed.label)).length
              return (
                <label
                  key={speed.label}
                  className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                        isChecked
                          ? 'bg-pink-500 border-pink-500 text-white shadow-sm'
                          : 'border-gray-300 bg-white group-hover:border-pink-300'
                      }`}
                      onClick={() => toggleSpeed(speed.label)}
                    >
                      {isChecked && <CheckIcon className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span
                      onClick={() => toggleSpeed(speed.label)}
                      className={`text-xs flex items-center gap-1.5 truncate ${
                        isChecked ? 'font-bold text-gray-900' : 'text-gray-600 group-hover:text-gray-900'
                      }`}
                    >
                      <span>{speed.icon}</span> {speed.label}
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400">({count})</span>
                </label>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

function ShopContent() {
  const searchParams = useSearchParams()

  const [search, setSearch] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([])
  const [selectedSpeeds, setSelectedSpeeds] = useState<string[]>([])
  const [selectedArrangements, setSelectedArrangements] = useState<string[]>([])
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE])
  const [filtersOpen, setFiltersOpen] = useState(false)

  // ── Sync with searchParams on EVERY URL change ──
  useEffect(() => {
    const cat = searchParams.get('category')
    const occ = searchParams.get('occasion')
    const arr = searchParams.get('arrangement')
    const spd = searchParams.get('speed')
    const bdg = searchParams.get('badge')
    const query = searchParams.get('search') || searchParams.get('q')

    if (cat && cat !== 'All') {
      setSelectedCategories([cat])
    } else {
      setSelectedCategories([])
    }

    if (occ) {
      setSelectedOccasions([occ])
    } else {
      setSelectedOccasions([])
    }

    if (arr) {
      setSelectedArrangements([arr])
    } else {
      setSelectedArrangements([])
    }

    if (spd) {
      setSelectedSpeeds([spd])
    } else {
      setSelectedSpeeds([])
    }

    if (bdg) {
      setSelectedBadge(bdg)
    } else {
      setSelectedBadge(null)
    }

    if (query) {
      setSearch(query)
    } else {
      setSearch('')
    }
  }, [searchParams])

  const toggleCategory = (cat: string) => {
    if (cat === 'All') {
      setSelectedCategories([])
    } else {
      setSelectedCategories(prev =>
        prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
      )
    }
  }

  const toggleOccasion = (occ: string) => {
    setSelectedOccasions(prev =>
      prev.includes(occ) ? prev.filter(o => o !== occ) : [...prev, occ]
    )
  }

  const toggleSpeed = (spd: string) => {
    setSelectedSpeeds(prev =>
      prev.includes(spd) ? prev.filter(s => s !== spd) : [...prev, spd]
    )
  }

  const toggleArrangement = (arr: string) => {
    setSelectedArrangements(prev =>
      prev.includes(arr) ? prev.filter(a => a !== arr) : [...prev, arr]
    )
  }

  const handleResetFilters = () => {
    setSelectedCategories([])
    setSelectedOccasions([])
    setSelectedSpeeds([])
    setSelectedArrangements([])
    setSelectedBadge(null)
    setPriceRange([0, MAX_PRICE])
    setSearch('')
  }

  const filtered = useMemo(() => {
    let result = [...products]

    // 1. Text Search query
    if (search.trim()) {
      const q = search.toLowerCase().trim()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.occasions?.some(o => o.toLowerCase().includes(q)) ||
        p.arrangement?.toLowerCase().includes(q)
      )
    }

    // 2. Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category))
    }

    // 3. Occasion filter
    if (selectedOccasions.length > 0) {
      result = result.filter(p => {
        if (p.occasions && p.occasions.some(o => selectedOccasions.includes(o))) {
          return true
        }
        return selectedOccasions.some(occ => {
          const occLower = occ.toLowerCase()
          return p.name.toLowerCase().includes(occLower) || p.description.toLowerCase().includes(occLower)
        })
      })
    }

    // 4. Arrangement filter
    if (selectedArrangements.length > 0) {
      result = result.filter(p => {
        if (p.arrangement && selectedArrangements.includes(p.arrangement)) {
          return true
        }
        return selectedArrangements.some(arr => {
          const arrLower = arr.toLowerCase()
          return p.name.toLowerCase().includes(arrLower) || p.description.toLowerCase().includes(arrLower)
        })
      })
    }

    // 5. Delivery Speed filter
    if (selectedSpeeds.length > 0) {
      result = result.filter(p => {
        if (p.deliverySpeeds && p.deliverySpeeds.some(s => selectedSpeeds.includes(s))) {
          return true
        }
        if (selectedSpeeds.includes('Same-Day Delivery')) return true
        return false
      })
    }

    // 6. Badge filter (e.g. LUXE / Bestseller)
    if (selectedBadge) {
      result = result.filter(p => p.badge === selectedBadge)
    }

    // 7. Price range filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    // 8. Sorting
    switch (sortBy) {
      case 'price-asc':  result.sort((a, b) => a.price - b.price); break
      case 'price-desc': result.sort((a, b) => b.price - a.price); break
      case 'rating':     result.sort((a, b) => b.rating - a.rating); break
      case 'name':       result.sort((a, b) => a.name.localeCompare(b.name)); break
    }

    return result
  }, [search, selectedCategories, selectedOccasions, selectedArrangements, selectedSpeeds, selectedBadge, priceRange, sortBy])

  const totalReviews = products.reduce((sum, p) => sum + p.reviews, 0)
  const avgRating = (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)

  // Compute dynamic Page Title
  const pageTitle = useMemo(() => {
    if (selectedOccasions.length > 0) {
      return `${selectedOccasions.join(', ')} Flowers`
    }
    if (selectedArrangements.length > 0) {
      return `${selectedArrangements.join(', ')} Collection`
    }
    if (selectedSpeeds.length > 0) {
      return `${selectedSpeeds.join(', ')} Flowers`
    }
    if (selectedBadge) {
      return selectedBadge === 'Bestseller' ? 'LUXE Bestselling Flowers' : `${selectedBadge} Flowers`
    }
    if (selectedCategories.length === 1) {
      return `${selectedCategories[0]} Delivery`
    }
    if (selectedCategories.length > 1) {
      return `${selectedCategories.join(' & ')} Flowers`
    }
    if (search.trim()) {
      return `Search: "${search}"`
    }
    return 'Flower Delivery'
  }, [selectedOccasions, selectedArrangements, selectedSpeeds, selectedBadge, selectedCategories, search])

  return (
    <div className="min-h-screen bg-white">
      {/* ── Top Breadcrumb Bar ── */}
      <div className="border-b border-gray-100 bg-gray-50/50 py-2.5">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500">
            <Link href="/" className="hover:text-pink-600 transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <Link href="/shop" className="hover:text-pink-600 transition-colors">Shop</Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-800 font-medium truncate">
              {pageTitle}
            </span>
          </nav>
        </div>
      </div>

      {/* ── Circular Story Bar (FNP Horizontal Strip) ── */}
      <div className="border-b border-gray-100 bg-white">
        <StoryBar />
      </div>

      {/* ── Main Two-Column Layout ── */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-8 items-start">

          {/* ════ LEFT COLUMN: Dedicated Filter Rail ════ */}
          <aside className="hidden lg:block w-[260px] shrink-0 border-r border-gray-100 pr-6 sticky top-28 self-start max-h-[calc(100vh-130px)] overflow-y-auto scrollbar-hide">
            <FilterSidebar
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedOccasions={selectedOccasions}
              toggleOccasion={toggleOccasion}
              selectedSpeeds={selectedSpeeds}
              toggleSpeed={toggleSpeed}
              selectedArrangements={selectedArrangements}
              toggleArrangement={toggleArrangement}
              onReset={handleResetFilters}
            />
          </aside>

          {/* ════ RIGHT COLUMN: Header + Product Grid ════ */}
          <div className="flex-1 min-w-0">

            {/* Header: Title, Count, Rating, Sort */}
            <div className="pb-4 mb-5 border-b border-gray-100">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                      {pageTitle}
                    </h1>
                    <span className="text-xs sm:text-sm text-gray-500 font-medium">
                      {filtered.length} of {products.length} Gifts
                    </span>
                    <span className="text-gray-300 hidden sm:inline">|</span>
                    <div className="hidden sm:inline-flex items-center gap-1.5 text-xs">
                      <span className="inline-flex items-center gap-1 bg-emerald-600 text-white font-bold px-2 py-0.5 rounded">
                        ★ {avgRating}
                      </span>
                      <span className="text-pink-600 font-semibold">
                        {(totalReviews / 1000).toFixed(1)}K Reviews ▾
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right controls: Inline Search + Mobile filter trigger + Sort by */}
                <div className="flex items-center gap-3">
                  {/* Inline Search */}
                  <div className="relative hidden xl:block">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search within..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-pink-400 w-44 bg-gray-50"
                    />
                    {search && (
                      <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2">
                        <CloseIcon className="w-3.5 h-3.5 text-gray-400" />
                      </button>
                    )}
                  </div>

                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setFiltersOpen(true)}
                    className="lg:hidden flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:border-pink-300 hover:text-pink-600 transition-colors shadow-sm"
                  >
                    <SlidersIcon className="w-3.5 h-3.5" />
                    Filters
                    {(selectedCategories.length > 0 || selectedOccasions.length > 0 || selectedArrangements.length > 0 || selectedSpeeds.length > 0 || selectedBadge || priceRange[1] < MAX_PRICE) && (
                      <span className="w-4 h-4 bg-pink-500 text-white rounded-full flex items-center justify-center text-[10px]">
                        !
                      </span>
                    )}
                  </button>

                  {/* Sort By Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 font-medium whitespace-nowrap hidden sm:inline">
                      Sort by :
                    </span>
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                        className="appearance-none text-xs font-semibold border border-gray-200 rounded-xl pl-3 pr-8 py-2 bg-white text-gray-800 focus:outline-none focus:border-pink-400 cursor-pointer shadow-sm hover:border-pink-300 transition-colors"
                      >
                        {sortOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                      <ChevronDownIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Active Filter Tags */}
              {(selectedCategories.length > 0 || selectedOccasions.length > 0 || selectedArrangements.length > 0 || selectedSpeeds.length > 0 || selectedBadge || priceRange[1] < MAX_PRICE || search) && (
                <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-gray-50">
                  <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Active:</span>

                  {selectedCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className="inline-flex items-center gap-1 text-xs bg-pink-50 border border-pink-200 text-pink-600 font-medium px-2.5 py-1 rounded-full hover:bg-pink-100 transition-colors"
                    >
                      {cat} <CloseIcon className="w-3 h-3" />
                    </button>
                  ))}

                  {selectedOccasions.map(occ => (
                    <button
                      key={occ}
                      onClick={() => toggleOccasion(occ)}
                      className="inline-flex items-center gap-1 text-xs bg-purple-50 border border-purple-200 text-purple-700 font-medium px-2.5 py-1 rounded-full hover:bg-purple-100 transition-colors"
                    >
                      {occ} <CloseIcon className="w-3 h-3" />
                    </button>
                  ))}

                  {selectedArrangements.map(arr => (
                    <button
                      key={arr}
                      onClick={() => toggleArrangement(arr)}
                      className="inline-flex items-center gap-1 text-xs bg-amber-50 border border-amber-200 text-amber-700 font-medium px-2.5 py-1 rounded-full hover:bg-amber-100 transition-colors"
                    >
                      {arr} <CloseIcon className="w-3 h-3" />
                    </button>
                  ))}

                  {selectedSpeeds.map(spd => (
                    <button
                      key={spd}
                      onClick={() => toggleSpeed(spd)}
                      className="inline-flex items-center gap-1 text-xs bg-emerald-50 border border-emerald-200 text-emerald-700 font-medium px-2.5 py-1 rounded-full hover:bg-emerald-100 transition-colors"
                    >
                      {spd} <CloseIcon className="w-3 h-3" />
                    </button>
                  ))}

                  {selectedBadge && (
                    <button
                      onClick={() => setSelectedBadge(null)}
                      className="inline-flex items-center gap-1 text-xs bg-rose-50 border border-rose-200 text-rose-700 font-medium px-2.5 py-1 rounded-full hover:bg-rose-100 transition-colors"
                    >
                      Badge: {selectedBadge} <CloseIcon className="w-3 h-3" />
                    </button>
                  )}

                  {priceRange[1] < MAX_PRICE && (
                    <button
                      onClick={() => setPriceRange([0, MAX_PRICE])}
                      className="inline-flex items-center gap-1 text-xs bg-blue-50 border border-blue-200 text-blue-700 font-medium px-2.5 py-1 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      Under ₹{priceRange[1].toLocaleString('en-IN')} <CloseIcon className="w-3 h-3" />
                    </button>
                  )}

                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      className="inline-flex items-center gap-1 text-xs bg-gray-100 border border-gray-200 text-gray-700 font-medium px-2.5 py-1 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      "{search}" <CloseIcon className="w-3 h-3" />
                    </button>
                  )}

                  <button
                    onClick={handleResetFilters}
                    className="text-xs text-gray-400 hover:text-pink-600 underline font-medium ml-1 transition-colors"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Product Cards Grid (4 columns on wide screens) */}
            {filtered.length === 0 ? (
              <div className="text-center py-20 flex flex-col items-center">
                <span className="text-6xl mb-4 block">🌸</span>
                <h3 className="font-playfair text-2xl text-gray-800 mb-2">No flowers match your filter</h3>
                <p className="text-gray-400 text-sm mb-6 max-w-sm">
                  Try adjusting the price range, removing occasion filters, or clearing search keywords.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-full font-semibold text-xs shadow-md shadow-pink-200 hover:from-pink-600 hover:to-rose-700 transition-all"
                >
                  Show All 50 Flowers
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile Filter Slide-Over ── */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setFiltersOpen(false)}
          />
          <div className="absolute top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-white p-6 overflow-y-auto shadow-2xl z-10">
            <FilterSidebar
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedOccasions={selectedOccasions}
              toggleOccasion={toggleOccasion}
              selectedSpeeds={selectedSpeeds}
              toggleSpeed={toggleSpeed}
              selectedArrangements={selectedArrangements}
              toggleArrangement={toggleArrangement}
              onReset={handleResetFilters}
              onClose={() => setFiltersOpen(false)}
            />
            <div className="sticky bottom-0 bg-white pt-3 border-t border-gray-100 mt-4">
              <button
                onClick={() => setFiltersOpen(false)}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold rounded-xl text-xs shadow-lg shadow-pink-200"
              >
                Apply Filters ({filtered.length} Gifts)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-5xl animate-spin inline-block">🌸</span>
      </div>
    }>
      <ShopContent />
    </Suspense>
  )
}
