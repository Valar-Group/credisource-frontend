'use client';

import React from 'react';

export default function ResultsPage() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 5;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#152542] to-[#1a1535] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-12 border border-white/10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Verifying Content</h2>
            <p className="text-[#B8C5D6]">Please wait...</p>
          </div>
          <div className="space-y-3">
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#E91E8C] to-[#7B2D8E] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-right text-[#E91E8C] font-semibold">{progress}%</div>
          </div>
          {progress === 100 && (
            <div className="mt-8 text-center">
              <div className="text-8xl font-bold text-green-500 mb-4">85</div>
              <div className="text-2xl text-white font-semibold mb-4">Likely Real</div>
              <button className="bg-[#E91E8C] text-white px-8 py-4 rounded-lg font-semibold">
                Verify Another
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Commit: "Clean minimal results page - 50 lines only"


⚠️ IMPORTANT
Make sure the file is EXACTLY 50 lines!
After pasting, scroll down - if you see MORE than 50 lines (like line 208!), then something got pasted wrong!
Delete everything and try again!

💡 ALTERNATIVE: Type It Line by Line
If copy/paste keeps breaking, manually type these key parts:
typescript'use client';

import React from 'react';

export default function ResultsPage() {
  const [progress, setProgress] = React.useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/5 rounded-2xl p-12">
          <h2 className="text-3xl text-white text-center">Verifying...</h2>
          <div className="h-3 bg-white/10 rounded-full mt-8">
            <div className="h-full bg-pink-500" style={{ width: '50%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
