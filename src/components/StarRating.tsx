import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  size?: 'sm' | 'md' | 'lg'
  showNumber?: boolean
}

export default function StarRating({ rating, size = 'md', showNumber = false }: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => {
        const filled = star <= Math.floor(rating)
        const half = !filled && star - 0.5 <= rating

        return (
          <span key={star} className="relative inline-block">
            {half ? (
              <span className="relative">
                <Star className={`${sizeClasses[size]} text-gray-200 fill-gray-200`} />
                <span className="absolute inset-0 overflow-hidden w-1/2">
                  <Star className={`${sizeClasses[size]} fill-amber-400 text-amber-400`} />
                </span>
              </span>
            ) : (
              <Star
                className={`${sizeClasses[size]} ${
                  filled ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'
                }`}
              />
            )}
          </span>
        )
      })}
      {showNumber && (
        <span className="text-sm text-gray-500 ml-1">{rating.toFixed(1)}</span>
      )}
    </div>
  )
}
