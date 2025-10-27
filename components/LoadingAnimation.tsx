'use client'

interface LoadingAnimationProps {
  status?: string
}

export default function LoadingAnimation({ status = 'Analyzing...' }: LoadingAnimationProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      {/* Animated diamond pattern */}
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 animate-pulse-diamond">
          <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Pink diamonds */}
            <rect x="32" y="16" width="24" height="24" transform="rotate(45 44 28)" fill="#e4154b" opacity="0.8"/>
            <rect x="56" y="16" width="24" height="24" transform="rotate(45 68 28)" fill="#e4154b" opacity="0.6"/>
            
            {/* Middle row */}
            <rect x="32" y="40" width="24" height="24" transform="rotate(45 44 52)" fill="#e4154b" opacity="0.9"/>
            <rect x="56" y="40" width="24" height="24" transform="rotate(45 68 52)" fill="#1a2332" opacity="0.8"/>
            
            {/* Navy diamonds */}
            <rect x="16" y="64" width="24" height="24" transform="rotate(45 28 76)" fill="#1a2332" opacity="0.7"/>
            <rect x="40" y="64" width="24" height="24" transform="rotate(45 52 76)" fill="#1a2332" opacity="0.9"/>
            <rect x="64" y="64" width="24" height="24" transform="rotate(45 76 76)" fill="#1a2332" opacity="0.8"/>
          </svg>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div className="h-full score-gradient animate-pulse" style={{ width: '60%' }}></div>
      </div>

      {/* Status text */}
      <p className="text-xl font-medium text-brand-navy animate-pulse">{status}</p>
      <p className="text-sm text-gray-500 mt-2">This may take 5-60 seconds</p>
    </div>
  )
}
