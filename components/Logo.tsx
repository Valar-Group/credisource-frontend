export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Diamond pattern logo */}
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Top pink diamonds */}
        <rect x="8" y="0" width="8" height="8" transform="rotate(45 8 5.66)" fill="#e4154b"/>
        <rect x="16" y="0" width="8" height="8" transform="rotate(45 16 5.66)" fill="#e4154b"/>
        
        {/* Middle row - pink and navy */}
        <rect x="8" y="8" width="8" height="8" transform="rotate(45 8 13.66)" fill="#e4154b"/>
        <rect x="16" y="8" width="8" height="8" transform="rotate(45 16 13.66)" fill="#1a2332"/>
        
        {/* Bottom navy diamonds */}
        <rect x="0" y="16" width="8" height="8" transform="rotate(45 0 21.66)" fill="#1a2332"/>
        <rect x="8" y="16" width="8" height="8" transform="rotate(45 8 21.66)" fill="#1a2332"/>
        <rect x="16" y="16" width="8" height="8" transform="rotate(45 16 21.66)" fill="#1a2332"/>
      </svg>
      <span className="text-2xl font-bold text-brand-navy">credisource</span>
    </div>
  )
}
