'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  size: string
}

export interface WishlistItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  badge?: 'New' | 'Bestseller' | 'Sale'
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: number, size: string) => void
  updateQuantity: (id: number, size: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  wishlist: WishlistItem[]
  toggleWishlist: (product: WishlistItem) => void
  removeFromWishlist: (id: number) => void
  isInWishlist: (id: number) => boolean
  totalWishlist: number
  selectedCity: string
  setSelectedCity: (city: string) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [selectedCity, setSelectedCityState] = useState<string>('Select City')
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('flowerly_cart')
      if (savedCart) setItems(JSON.parse(savedCart))

      const savedWishlist = localStorage.getItem('flowerly_wishlist')
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist))

      const savedCity = localStorage.getItem('flowerly_city')
      if (savedCity) setSelectedCityState(savedCity)
    } catch (e) {
      console.error('Failed to parse local storage', e)
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) {
      try {
        localStorage.setItem('flowerly_cart', JSON.stringify(items))
      } catch (e) {
        console.error('Failed to save cart', e)
      }
    }
  }, [items, hydrated])

  useEffect(() => {
    if (hydrated) {
      try {
        localStorage.setItem('flowerly_wishlist', JSON.stringify(wishlist))
      } catch (e) {
        console.error('Failed to save wishlist', e)
      }
    }
  }, [wishlist, hydrated])

  const setSelectedCity = useCallback((city: string) => {
    setSelectedCityState(city)
    try {
      localStorage.setItem('flowerly_city', city)
    } catch (e) {
      console.error('Failed to save city', e)
    }
  }, [])

  const addToCart = useCallback((newItem: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(
        item => item.id === newItem.id && item.size === newItem.size
      )
      if (existing) {
        return prev.map(item =>
          item.id === newItem.id && item.size === newItem.size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...newItem, quantity: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((id: number, size: string) => {
    setItems(prev => prev.filter(item => !(item.id === id && item.size === size)))
  }, [])

  const updateQuantity = useCallback((id: number, size: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => !(item.id === id && item.size === size)))
    } else {
      setItems(prev =>
        prev.map(item =>
          item.id === id && item.size === size ? { ...item, quantity } : item
        )
      )
    }
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const toggleWishlist = useCallback((product: WishlistItem) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id)
      if (exists) {
        return prev.filter(item => item.id !== product.id)
      } else {
        return [...prev, product]
      }
    })
  }, [])

  const removeFromWishlist = useCallback((id: number) => {
    setWishlist(prev => prev.filter(item => item.id !== id))
  }, [])

  const isInWishlist = useCallback(
    (id: number) => wishlist.some(item => item.id === id),
    [wishlist]
  )

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalWishlist = wishlist.length

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        wishlist,
        toggleWishlist,
        removeFromWishlist,
        isInWishlist,
        totalWishlist,
        selectedCity,
        setSelectedCity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
