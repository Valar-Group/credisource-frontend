'use client'

import { useEffect, useState } from 'react'

interface ScoreDisplayProps {
  score: number
  verdict: string
  details?: any
}

export default function ScoreDisplay({ score, verdict, details }: ScoreDisplayProps) {
  const [displayScore, setDisplayScore] = useState(0)
  const [showDetails, setShowDetails] = useState(false)

  // Animate score counting up
  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = score / steps
    const stepDuration = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= score) {
        setDisplayScore(score)
        clearInterval(timer)
      } else {
        setDisplayScore(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [score])

  // Determine color based on score
  const getScoreColor = () => {
    if (score >= 70) return 'text-green-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getBarColor = () => {
    if (score >= 70) return 'from-green-500 to-green-600'
    if (score >= 40) return 'from-yellow-500 to-orange-500'
    return 'from-red-500 to-pink-600'
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Score card */}
      <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
        {/* Logo header */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="0" width="8" height="8" transform="rotate(45 8 5.66)" fill="#e4154b"/>
            <rect x="16" y="0" width="8" height="8" transform="rotate(45 16 5.66)" fill="#e4154b"/>
            <rect x="8" y="8" width="8" height="8" transform="rotate(45 8 13.66)" fill="#e4154b"/>
            <rect x="16" y="8" width="8" height="8" transform="rotate(45 16 13.66)" fill="#1a2332"/>
            <rect x="0" y="16" width="8" height="8" transform="rotate(45 0 21.66)" fill="#1a2332"/>
            <rect x="8" y="16" width="8" height="8" transform="rotate(45 8 21.66)" fill="#1a2332"/>
            <rect x="16" y="16" width="8" height="8" transform="rotate(45 16 21.66)" fill="#1a2332"/>
          </svg>
          <span className="text-xl font-bold text-brand-navy">credisource score</span>
        </div>

        {/* Score bar */}
        <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden mb-6">
          <div
            className={`h-full bg-gradient-to-r ${getBarColor()} animate-fill-bar`}
            style={{ width: `${score}%` }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-between px-4 text-xs font-medium text-gray-600">
            <span>0</span>
            <span>100</span>
          </div>
        </div>

        {/* Score percentage */}
        <div className={`text-7xl font-bold text-center mb-4 ${getScoreColor()}`}>
          {displayScore}%
        </div>

        {/* Verdict */}
        <p className="text-2xl text-center text-brand-navy mb-6">
          {verdict}
        </p>

        {/* Learn more link */}
        <div className="text-center">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-brand-pink hover:underline font-medium"
          >
            {showDetails ? 'Hide details' : 'Learn how our scores are calculated'}
          </button>
        </div>

        {/* Details section */}
        {showDetails && details && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="font-bold text-lg mb-4 text-brand-navy">Detection Details</h3>
            <div className="space-y-3 text-sm">
              {details.evidence && details.evidence.map((item: any, idx: number) => (
                <div key={idx} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                  <span className="text-2xl">{item.confidence > 70 ? '✅' : '⚠️'}</span>
                  <div>
                    <p className="font-medium text-gray-900">{item.source}</p>
                    <p className="text-gray-600">{item.finding}</p>
                    <p className="text-xs text-gray-500 mt-1">Confidence: {item.confidence}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Try another button */}
      <div className="text-center mt-8">
        <button
          onClick={() => window.location.reload()}
          className="bg-brand-navy text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all"
        >
          Verify Another
        </button>
      </div>
    </div>
  )
}
