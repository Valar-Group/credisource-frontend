'use client';

import React from 'react';

export default function LandingPage() {
  const [selectedType, setSelectedType] = React.useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#152542] to-[#1a1535] p-6">
      <div className="max-w-4xl mx-auto py-20">
        <h1 className="text-6xl font-bold text-white text-center mb-6">
          Know what's real
        </h1>
        <p className="text-2xl text-[#B8C5D6] text-center mb-12">
          Verify images, videos, and text for AI generation
        </p>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <button
              onClick={() => setSelectedType('image')}
              className={`p-6 rounded-xl transition-all ${
                selectedType === 'image' ? 'bg-[#E91E8C] text-white' : 'bg-white/5 text-[#B8C5D6]'
              }`}
            >
              <div className="text-4xl mb-2">🖼️</div>
              <div className="font-semibold">Image</div>
            </button>
            
            <button
              onClick={() => setSelectedType('video')}
              className={`p-6 rounded-xl transition-all ${
                selectedType === 'video' ? 'bg-[#E91E8C] text-white' : 'bg-white/5 text-[#B8C5D6]'
              }`}
            >
              <div className="text-4xl mb-2">🎥</div>
              <div className="font-semibold">Video</div>
            </button>
            
            <button
              onClick={() => setSelectedType('text')}
              className={`p-6 rounded-xl transition-all ${
                selectedType === 'text' ? 'bg-[#E91E8C] text-white' : 'bg-white/5 text-[#B8C5D6]'
              }`}
            >
              <div className="text-4xl mb-2">📝</div>
              <div className="font-semibold">Text</div>
            </button>
            
            <button
              onClick={() => setSelectedType('news')}
              className={`p-6 rounded-xl transition-all ${
                selectedType === 'news' ? 'bg-[#E91E8C] text-white' : 'bg-white/5 text-[#B8C5D6]'
              }`}
            >
              <div className="text-4xl mb-2">📰</div>
              <div className="font-semibold">News</div>
            </button>
          </div>

          {selectedType && (
            <div className="border-2 border-dashed border-white/20 rounded-xl p-12">
              <div className="text-center space-y-4">
                <div className="text-white text-lg">
                  Enter a URL or upload a {selectedType} to verify
                </div>
                
                <div className="flex gap-3 max-w-2xl mx-auto">
                  <input
                    type="text"
                    placeholder={`Enter ${selectedType} URL...`}
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-6 py-4 text-white placeholder-white/50 focus:outline-none focus:border-[#E91E8C]"
                  />
                  <button className="bg-[#E91E8C] hover:bg-[#d11a7d] text-white px-8 py-4 rounded-lg font-semibold">
                    Verify
                  </button>
                </div>
              </div>
            </div>
          )}

          {!selectedType && (
            <div className="text-center py-12 text-[#B8C5D6]">
              Select a content type above to get started
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
