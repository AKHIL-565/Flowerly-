import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CartProvider } from '@/context/CartContext'

export const metadata: Metadata = {
  title: 'Flowerly - Fresh Flowers Delivered',
  description:
    'Discover our beautiful collection of fresh flowers, handcrafted bouquets, and elegant floral arrangements. Same-day delivery available.',
  keywords: 'flowers, bouquets, fresh flowers, flower delivery, roses, orchids, sunflowers',
  openGraph: {
    title: 'Flowerly - Fresh Flowers Delivered',
    description: 'Beautiful flowers delivered to your door with love.',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-inter antialiased min-h-screen bg-white">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
