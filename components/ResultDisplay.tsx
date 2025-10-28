'use client';

import ScoreDisplay from './ScoreDisplay';

interface ResultDisplayProps {
  result: any;
  isLoading: boolean;
}

export default function ResultDisplay({ result, isLoading }: ResultDisplayProps) {
  console.log('========== RESULT DISPLAY RENDERED ==========');
  console.log('Result:', result);
  console.log('Is Loading:', isLoading);
  
  if (isLoading) {
    return (
      <div className="p-12 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-brand-pink mx-auto mb-4"></div>
        <p className="text-gray-600">Analyzing content...</p>
      </div>
    );
  }

  if (!result) {
    return <div className="p-12 text-center text-gray-600">No result yet</div>;
  }

  // IMPORTANT: Handle API response structure
  // The API returns: { status: "completed", result: { trust_score: 97, ... } }
  // So we need to extract the actual result data
  const actualResult = result.result || result; // Handle both cases
  
  // DEBUG: Let's see what we're working with
  console.log('========== EXTRACTION DEBUG ==========');
  console.log('actualResult:', actualResult);
  console.log('actualResult.trust_score:', actualResult.trust_score);
  console.log('actualResult.label:', actualResult.label);

  // Backend returns:
  // {
  //   "trust_score": 97,              <- THE SCORE (number)
  //   "label": "Highly Credible",     <- THE VERDICT
  //   "verdict": "Based on...",       <- LONGER EXPLANATION
  //   "source_credibility": 95,
  //   "content_quality": 100,
  //   "cross_reference": 95,
  //   "evidence": { ... }
  // }

  const score = actualResult.trust_score || 0;  // ✅ FIXED: Get score directly
  const label = actualResult.label || 'Unknown';  // ✅ FIXED: Use label for verdict
  
  // Build details object for ScoreDisplay
  const details = {
    trust_score: {
      explanation: actualResult.explanation || actualResult.verdict || '',
      confidence: score >= 80 ? 'High' : score >= 50 ? 'Medium' : 'Low',
      recommended_action: score >= 70 
        ? 'This content appears credible based on our analysis.'
        : score >= 40
        ? 'Exercise caution - verify with additional sources.'
        : 'This content has low credibility - verify carefully before trusting.',
      scoring_factors: [
        {
          factor: 'Source Credibility',
          score: actualResult.source_credibility || 0,
          weight: actualResult.weights_used?.source ? `${Math.round(actualResult.weights_used.source * 100)}%` : '40%',
          reasoning: actualResult.evidence?.source?.verdict || 'Source analysis completed'
        },
        {
          factor: 'Content Quality',
          score: actualResult.content_quality || 0,
          weight: actualResult.weights_used?.content ? `${Math.round(actualResult.weights_used.content * 100)}%` : '35%',
          reasoning: actualResult.evidence?.content?.verdict || 'Content analysis completed'
        },
        {
          factor: 'Cross-Reference',
          score: actualResult.cross_reference || 0,
          weight: actualResult.weights_used?.cross_ref ? `${Math.round(actualResult.weights_used.cross_ref * 100)}%` : '25%',
          reasoning: actualResult.evidence?.cross_reference?.verdict || 'Cross-reference check completed'
        }
      ],
      methodology: `Story type: ${actualResult.story_type || 'standard'}. Weighted analysis across multiple factors.`
    },
    content_analysis: {
      red_flags: actualResult.evidence?.content?.red_flags || []
    },
    source_credibility: actualResult.evidence?.source ? {
      tier: actualResult.evidence.source.tier || 'unknown',
      bias: actualResult.evidence.source.bias || 'unknown',
      type: actualResult.evidence.source.type || 'unknown',
      verdict: actualResult.evidence.source.verdict || ''
    } : null,
    article: {
      domain: actualResult.evidence?.source?.domain || 'Unknown',
      title: 'News Article', // Backend doesn't return title in current version
      word_count: null // Backend doesn't return word count in current version
    }
  };

  return (
    <ScoreDisplay 
      score={score}
      verdict={label}
      details={details}
    />
  );
}
