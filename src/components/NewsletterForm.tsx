'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return submitted ? (
    <p className="text-pink-300 text-sm font-medium py-4">
      🌸 Thanks for subscribing! Check your inbox soon.
    </p>
  ) : (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Your email address"
        required
        className="bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-gray-600 transition-all duration-200"
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-pink-500/25"
      >
        Subscribe 🌸
      </button>
    </form>
  )
}
