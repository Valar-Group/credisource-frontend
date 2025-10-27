'use client'

export default function PartnerTicker() {
  const partners = [
    { name: 'Facebook', icon: '📘' },
    { name: 'Instagram', icon: '📷' },
    { name: 'Twitter/X', icon: '🐦' },
    { name: 'TikTok', icon: '🎵' },
    { name: 'YouTube', icon: '▶️' },
    { name: 'WhatsApp', icon: '💬' },
    { name: 'LinkedIn', icon: '💼' },
    { name: 'Reddit', icon: '🤖' },
  ]

  // Double the array for seamless loop
  const doubledPartners = [...partners, ...partners]

  return (
    <div className="w-full bg-gray-50 py-12 overflow-hidden">
      <div className="text-center mb-8">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          Supports Content From
        </h3>
      </div>

      {/* Infinite scroll container */}
      <div className="relative flex overflow-hidden">
        <div className="flex animate-slide-left">
          {doubledPartners.map((partner, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center px-12 py-4 mx-4 bg-white rounded-2xl shadow-sm min-w-[200px] grayscale hover:grayscale-0 transition-all"
            >
              <span className="text-4xl mr-3">{partner.icon}</span>
              <span className="text-lg font-medium text-gray-700">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
