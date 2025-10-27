'use client';

import { useEffect, useState } from 'react';

interface ResultDisplayProps {
  result: any;
  isLoading: boolean;
}

export default function ResultDisplay({ result, isLoading }: ResultDisplayProps) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (result?.trust_score?.score !== undefined) {
      let current = 0;
      const target = Math.round(result.trust_score.score);
      const increment = target / 50;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setDisplayScore(target);
          clearInterval(timer);
        } else {
          setDisplayScore(Math.round(current));
        }
      }, 20);

      return () => clearInterval(timer);
    }
  }, [result]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
        <div className="flex flex-col items-center">
          {/* Animated Loading Diamonds */}
          <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-1 animate-pulse">
                <div className="w-6 h-6 bg-brand-pink transform rotate-45"></div>
                <div className="w-6 h-6 bg-brand-pink transform rotate-45 animation-delay-100"></div>
                <div className="w-6 h-6 bg-navy transform rotate-45 animation-delay-200"></div>
                <div className="w-6 h-6 bg-brand-pink transform rotate-45 animation-delay-300"></div>
                <div className="w-6 h-6 bg-navy transform rotate-45 animation-delay-400"></div>
                <div className="w-6 h-6 bg-brand-pink transform rotate-45 animation-delay-500"></div>
                <div className="w-6 h-6 bg-navy transform rotate-45 animation-delay-600"></div>
                <div className="w-6 h-6 bg-brand-pink transform rotate-45 animation-delay-700"></div>
                <div className="w-6 h-6 bg-navy transform rotate-45 animation-delay-800"></div>
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-navy mb-2">Analyzing Content...</h3>
          <p className="text-gray-600">Using multiple AI detection models</p>
        </div>
      </div>
    );
  }

  if (!result) return null;

  if (result.error) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center border-4 border-red-500">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-2xl font-bold text-red-600 mb-4">Verification Failed</h3>
        <p className="text-gray-700">{result.error}</p>
      </div>
    );
  }

  const score = result?.trust_score?.score !== undefined ? result.trust_score.score : displayScore;
  
  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 70) return 'Likely Real';
    if (score >= 40) return 'Uncertain';
    return 'Likely AI-Generated';
  };

  const getBarColor = (score: number) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
      {/* Logo + Title */}
      <div className="flex items-center justify-center mb-8">
        <div className="grid grid-cols-3 gap-1 mr-3">
          <div className="w-4 h-4 bg-brand-pink transform rotate-45"></div>
          <div className="w-4 h-4 bg-brand-pink transform rotate-45"></div>
          <div className="w-4 h-4 bg-brand-pink transform rotate-45"></div>
          <div className="w-4 h-4 bg-brand-pink transform rotate-45"></div>
          <div className="w-4 h-4 bg-navy transform rotate-45"></div>
          <div className="w-4 h-4 bg-navy transform rotate-45"></div>
          <div className="w-4 h-4 bg-navy transform rotate-45"></div>
          <div className="w-4 h-4 bg-navy transform rotate-45"></div>
          <div className="w-4 h-4 bg-navy transform rotate-45"></div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-navy">credisource score</h2>
      </div>

      {/* Score Display */}
      <div className="text-center mb-8">
        <div className={`text-7xl md:text-8xl font-bold mb-4 ${getScoreColor(displayScore)}`}>
          {displayScore}%
        </div>
        <p className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
          {result.trust_score?.label || getScoreLabel(displayScore)}
        </p>
        {result.trust_score?.explanation && (
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            {result.trust_score.explanation}
          </p>
        )}
      </div>

      {/* Gradient Bar */}
      <div className="mb-8">
        <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`absolute top-0 left-0 h-full ${getBarColor(displayScore)} transition-all duration-1000 ease-out`}
            style={{ width: `${displayScore}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>

      {/* Evidence Breakdown */}
      {result.evidence && result.evidence.length > 0 && (
        <div className="border-t pt-6">
          <h3 className="text-xl font-bold text-navy mb-4">Detection Evidence</h3>
          <div className="space-y-3">
            {result.evidence.map((item: any, index: number) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-navy">
                    {item.category || item.source || `Source ${index + 1}`}
                  </span>
                  <span className={`font-bold ${getScoreColor(Math.round((item.confidence || 0) * 100))}`}>
                    {Math.round((item.confidence || 0) * 100)}%
                  </span>
                </div>
                {item.signal && (
                  <p className="text-sm text-gray-700 mb-1">{item.signal}</p>
                )}
                {item.details && typeof item.details === 'string' && (
                  <p className="text-sm text-gray-600">{item.details}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Confidence Band */}
      {result.trust_score?.confidence && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Confidence Level:</strong> {result.trust_score.confidence}
          </p>
          {result.trust_score.recommended_action && (
            <p className="text-sm text-gray-700 mt-2">
              <strong>Recommendation:</strong> {result.trust_score.recommended_action}
            </p>
          )}
        </div>
      )}

      {/* Learn More Link */}
      <div className="text-center mt-8">
        <a href="#about" className="text-brand-pink hover:text-pink-700 font-semibold underline">
          Learn how our scores are calculated
        </a>
      </div>
    </div>
  );
}
