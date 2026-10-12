import Link from 'next/link'
import { Heart, Sparkles, ShieldCheck, Truck, Users, Award, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'About Us - Flowerly Floral Boutique',
  description: 'Learn about Flowerly, our journey, and our commitment to bringing farm-fresh handcrafted floral arrangements to India.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/70 via-pink-50/40 to-white py-16 sm:py-24 text-center px-4">
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-100/80 border border-pink-200 text-pink-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Floral Journey</span>
          </div>
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-6">
            Handcrafted Blooms,{' '}
            <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500 bg-clip-text text-transparent">
              Bound by Emotion
            </span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            At Flowerly, every flower tells a story. We believe that gifting flowers is the purest expression of affection, gratitude, and heartfelt celebrations.
          </p>
        </div>
      </section>

      {/* Story & Mission */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1000&q=80"
              alt="Artisan florist assembling fresh bouquet"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-pink-500">
              Our Heritage
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Sourced Fresh From Growers Every Morning
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Founded in 2024, Flowerly was born out of a passion to bridge the gap between world-class farm growers and discerning flower lovers across India. We cut out intermediaries so that every single blossom reaches your recipient within hours of being clipped.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Each arrangement is curated by master florists trained in European botanical stylings, ensuring that every gift looks opulent, pristine, and unforgettable.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100">
                <p className="font-playfair text-3xl font-black text-pink-600">50,000+</p>
                <p className="text-xs font-semibold text-gray-700 mt-1">Bouquets Delivered</p>
              </div>
              <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100">
                <p className="font-playfair text-3xl font-black text-pink-600">99.8%</p>
                <p className="text-xs font-semibold text-gray-700 mt-1">On-Time Midnight Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50/60 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-gray-900">
              Our 4 Pillars of Freshness
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              The promises that guide our craft every single day
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Truck,
                title: 'Express 2-Hr Delivery',
                desc: 'Chilled courier dispatch to ensure petals never wilt in transit.',
              },
              {
                icon: ShieldCheck,
                title: '100% Farm Fresh',
                desc: 'Handpicked daily from sustainable domestic and imported growers.',
              },
              {
                icon: Award,
                title: 'Master Floristry',
                desc: 'Individually styled and wrapped in luxury biodegradable paper.',
              },
              {
                icon: Heart,
                title: 'Customer Happiness',
                desc: 'If blooms do not delight you, we replace them free of charge.',
              },
            ].map(pillar => {
              const Icon = pillar.icon
              return (
                <div key={pillar.title} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-playfair text-lg font-bold text-gray-900 mb-1">{pillar.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{pillar.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center px-4">
        <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Ready to Brighten Someone’s Day?
        </h2>
        <p className="text-gray-600 text-sm max-w-md mx-auto mb-8">
          Browse through our curated seasonal collection of fresh blooms and bouquets.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold rounded-2xl shadow-lg shadow-pink-200 transition-all hover:-translate-y-0.5"
        >
          <span>Explore Floral Catalog</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  )
}
