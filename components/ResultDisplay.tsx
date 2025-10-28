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
        {result.recommendation && (
          <p className="text-gray-600 mt-4 text-sm">{result.recommendation}</p>
        )}
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

  const getBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800 border-green-300';
    if (score >= 60) return 'bg-blue-100 text-blue-800 border-blue-300';
    if (score >= 40) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
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
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
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

      {/* NEW: Scoring Factors Breakdown (for News) */}
{(() => {
  console.log('🔍 Full result object:', result);
  console.log('🔍 Trust score exists?', result?.trust_score);
  console.log('🔍 Scoring factors:', result?.trust_score?.scoring_factors);
  return null;
})()}
{result.trust_score?.scoring_factors && result.trust_score.scoring_factors.length > 0 && (
  <div className="border-t pt-6 mb-6">
    <h3 className="text-xl font-bold text-navy mb-4 flex items-center">
      <span className="mr-2">📊</span>
      Scoring Breakdown
    </h3>
          <div className="space-y-4">
            {result.trust_score.scoring_factors.map((factor: any, index: number) => (
              <div key={index} className="bg-gray-50 p-5 rounded-lg border-l-4 border-brand-pink">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-navy mb-1">
                      {factor.factor}
                    </h4>
                    <span className="text-sm text-gray-500">
                      Weight: {factor.weight}
                    </span>
                  </div>
                  <div className="ml-4">
                    <span className={`inline-block px-4 py-2 rounded-full font-bold text-lg border-2 ${getBadgeColor(factor.score)}`}>
                      {factor.score}/100
                    </span>
                  </div>
                </div>
                {factor.reasoning && (
                  <p className="text-gray-700 leading-relaxed">
                    {factor.reasoning}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Methodology Note */}
          {result.trust_score?.methodology && (
            <p className="text-xs text-gray-500 mt-4 italic">
              Method: {result.trust_score.methodology}
            </p>
          )}
        </div>
      )}

      {/* NEW: Content Quality Details (for News) */}
      {result.content_analysis?.red_flags && result.content_analysis.red_flags.length > 0 && (
        <div className="border-t pt-6 mb-6">
          <h3 className="text-xl font-bold text-navy mb-4 flex items-center">
            <span className="mr-2">🚩</span>
            Quality Issues Detected
          </h3>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
            <ul className="space-y-2">
              {result.content_analysis.red_flags.map((flag: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-yellow-600 mr-2">⚠️</span>
                  <span className="text-gray-700 capitalize">{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* NEW: Source Credibility (for News) */}
      {result.source_credibility && (
        <div className="border-t pt-6 mb-6">
          <h3 className="text-xl font-bold text-navy mb-4 flex items-center">
            <span className="mr-2">🏢</span>
            Source Information
          </h3>
          <div className="bg-blue-50 p-5 rounded-lg">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Domain</p>
                <p className="font-semibold text-navy">{result.article?.domain || 'Unknown'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Credibility Tier</p>
                <p className="font-semibold text-navy capitalize">{result.source_credibility.tier}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Bias</p>
                <p className="font-semibold text-navy capitalize">{result.source_credibility.bias}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Type</p>
                <p className="font-semibold text-navy capitalize">{result.source_credibility.type?.replace('_', ' ')}</p>
              </div>
            </div>
            {result.source_credibility.verdict && (
              <p className="text-sm text-gray-700 mt-4 pt-4 border-t border-blue-200">
                <strong>Verdict:</strong> {result.source_credibility.verdict}
              </p>
            )}
          </div>
        </div>
      )}

      {/* NEW: Article Information (for News) */}
      {result.article && (
        <div className="border-t pt-6 mb-6">
          <h3 className="text-xl font-bold text-navy mb-4 flex items-center">
            <span className="mr-2">📰</span>
            Article Details
          </h3>
          <div className="bg-gray-50 p-5 rounded-lg space-y-3">
            {result.article.title && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Title</p>
                <p className="font-semibold text-navy">{result.article.title}</p>
              </div>
            )}
            {result.article.author && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Author</p>
                <p className="text-gray-700">{result.article.author}</p>
              </div>
            )}
            {result.article.word_count && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Word Count</p>
                <p className="text-gray-700">{result.article.word_count} words</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* EXISTING: Evidence Breakdown (for Images/Videos) */}
      {result.evidence && result.evidence.length > 0 && (
        <div className="border-t pt-6 mb-6">
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
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
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
