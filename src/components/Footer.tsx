import Link from 'next/link'
import NewsletterForm from '@/components/NewsletterForm'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <img
                src="/logo.svg"
                alt="Flowerly Brand Logo"
                className="w-10 h-10 object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <span className="font-playfair text-2xl font-bold text-white group-hover:text-pink-300 transition-colors">
                Flower<span className="text-pink-400">ly</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              We bring the beauty of nature to your doorstep. Fresh, handcrafted floral arrangements delivered with care and love.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { icon: '📘', label: 'Facebook' },
                { icon: '📷', label: 'Instagram' },
                { icon: '🐦', label: 'Twitter' },
                { icon: '📌', label: 'Pinterest' },
              ].map(social => (
                <button
                  key={social.label}
                  aria-label={social.label}
                  className="w-9 h-9 bg-gray-700 hover:bg-pink-500 rounded-full flex items-center justify-center text-sm transition-colors duration-200"
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-lg font-semibold text-white mb-5 relative">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-pink-400 rounded-full" />
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'Shop All Flowers', href: '/shop' },
                { label: 'Seasonal Collections', href: '/shop?category=Seasonal' },
                { label: 'Bouquets', href: '/shop?category=Bouquets' },
                { label: 'About Us', href: '/about' },
              ].map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-pink-300 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-playfair text-lg font-semibold text-white mb-5 relative">
              Customer Service
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-pink-400 rounded-full" />
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Delivery Info', href: '/delivery' },
                { label: 'Returns & Refunds', href: '/returns' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Care Instructions', href: '/care' },
              ].map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-pink-300 text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-playfair text-lg font-semibold text-white mb-5 relative">
              Stay in Bloom
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-pink-400 rounded-full" />
            </h4>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Subscribe to get special offers, floral tips, and seasonal updates.
            </p>
            <NewsletterForm />
            <p className="text-xs text-gray-500 mt-3">
              No spam, ever. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Strip */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-6 justify-center md:justify-start text-sm text-gray-400">
            <span className="flex items-center gap-2">📞 +1 (555) 123-FLOWER</span>
            <span className="flex items-center gap-2">✉️ hello@flowerly.com</span>
            <span className="flex items-center gap-2">📍 123 Petal Lane, Garden City</span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Flowerly. All rights reserved. Made with 💕</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-pink-300 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-pink-300 transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
