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
  const actualResult = result.result || result;
  
  console.log('========== EXTRACTION DEBUG ==========');
  console.log('actualResult:', actualResult);
  console.log('actualResult.trust_score:', actualResult?.trust_score);
  console.log('actualResult.label:', actualResult?.label);

  // Extract score and label
  const score = actualResult?.trust_score ?? 50; // Default to 50 if undefined
  const verdict = actualResult?.label || actualResult?.verdict || 'Unknown';
  
  console.log('========== EXTRACTED VALUES ==========');
  console.log('Extracted score:', score);
  console.log('Extracted verdict:', verdict);
  
  // Build details object with FLAT STRUCTURE that ScoreDisplay expects
  const details = {
    // Top-level fields (ScoreDisplay looks here first)
    explanation: actualResult?.explanation || actualResult?.verdict || '',
    warning_level: actualResult?.warning_level,
    should_share: actualResult?.should_share,
    recommendation: actualResult?.recommendation,
    
    // Score breakdown (FLAT, not nested)
    source_credibility: actualResult?.source_credibility,
    content_quality: actualResult?.content_quality,
    cross_reference: actualResult?.cross_reference,
    
    // Metadata
    weights_used: actualResult?.weights_used,
    story_type: actualResult?.story_type,
    
    // Evidence (keep structure from backend)
    evidence: actualResult?.evidence,
    
    // Additional fields for compatibility
    detectors_used: actualResult?.detectors_used,
    providers: actualResult?.providers,
    provider: actualResult?.provider,
    confidence: actualResult?.confidence,
    error: actualResult?.error
  };

  console.log('========== FINAL DATA STRUCTURE ==========');
  console.log('score:', score);
  console.log('verdict:', verdict);
  console.log('details.explanation:', details.explanation);
  console.log('details.source_credibility:', details.source_credibility);
  console.log('details.evidence:', details.evidence);

  return (
    <ScoreDisplay 
      score={score}
      verdict={verdict}
      details={details}
    />
  );
}
