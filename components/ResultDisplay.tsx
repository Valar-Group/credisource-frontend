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

  const score = result.trust_score || 0;  // ✅ FIXED: Get score directly
  const label = result.label || 'Unknown';  // ✅ FIXED: Use label for verdict
  
  // Build details object for ScoreDisplay
  const details = {
    trust_score: {
      explanation: result.explanation || result.verdict || '',
      confidence: score >= 80 ? 'High' : score >= 50 ? 'Medium' : 'Low',
      recommended_action: score >= 70 
        ? 'This content appears credible based on our analysis.'
        : score >= 40
        ? 'Exercise caution - verify with additional sources.'
        : 'This content has low credibility - verify carefully before trusting.',
      scoring_factors: [
        {
          factor: 'Source Credibility',
          score: result.source_credibility || 0,
          weight: result.weights_used?.source ? `${Math.round(result.weights_used.source * 100)}%` : '40%',
          reasoning: result.evidence?.source?.verdict || 'Source analysis completed'
        },
        {
          factor: 'Content Quality',
          score: result.content_quality || 0,
          weight: result.weights_used?.content ? `${Math.round(result.weights_used.content * 100)}%` : '35%',
          reasoning: result.evidence?.content?.verdict || 'Content analysis completed'
        },
        {
          factor: 'Cross-Reference',
          score: result.cross_reference || 0,
          weight: result.weights_used?.cross_ref ? `${Math.round(result.weights_used.cross_ref * 100)}%` : '25%',
          reasoning: result.evidence?.cross_reference?.verdict || 'Cross-reference check completed'
        }
      ],
      methodology: `Story type: ${result.story_type || 'standard'}. Weighted analysis across multiple factors.`
    },
    content_analysis: {
      red_flags: result.evidence?.content?.red_flags || []
    },
    source_credibility: result.evidence?.source ? {
      tier: result.evidence.source.tier || 'unknown',
      bias: result.evidence.source.bias || 'unknown',
      type: result.evidence.source.type || 'unknown',
      verdict: result.evidence.source.verdict || ''
    } : null,
    article: {
      domain: result.evidence?.source?.domain || 'Unknown',
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
