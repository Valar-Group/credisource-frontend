'use client';

interface ScoreDisplayProps {
  score: number;
  verdict: string;
  details: any;
}

export default function ScoreDisplay({ score, verdict, details }: ScoreDisplayProps) {
  console.log('========== SCORE DISPLAY RENDERED ==========');
  console.log('Score:', score);
  console.log('Verdict:', verdict);
  console.log('Details:', details);

  // SAFETY CHECK: If score or verdict is undefined, don't render
  if (score === undefined || verdict === undefined || !details) {
    console.log('⚠️ MISSING DATA - Score, verdict, or details is undefined');
    return (
      <div className="p-12 text-center">
        <p className="text-red-600">Error: Missing display data</p>
        <pre className="text-xs mt-4">{JSON.stringify({ score, verdict, details }, null, 2)}</pre>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
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

  const scoringFactors = details?.trust_score?.scoring_factors || [];
  const hasFactors = scoringFactors && scoringFactors.length > 0;

  return (
    <div className="max-w-4xl mx-auto">
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
          <div className={`text-7xl md:text-8xl font-bold mb-4 ${getScoreColor(score)}`}>
            {Math.round(score)}%
          </div>
          <p className="text-2xl md:text-3xl font-semibold text-gray-700 mb-2">
            {verdict}
          </p>
          {details?.trust_score?.explanation && (
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
              {details.trust_score.explanation}
            </p>
          )}
        </div>

        {/* Gradient Bar */}
        <div className="mb-8">
          <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`absolute top-0 left-0 h-full ${getBarColor(score)} transition-all duration-1000 ease-out`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>

        {/* SCORING FACTORS BREAKDOWN */}
        {hasFactors && (
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="text-xl font-bold text-navy mb-4">
              📊 Scoring Breakdown
            </h3>
            <div className="space-y-4">
              {scoringFactors.map((factor: any, index: number) => (
                <div key={index} className="bg-gray-50 p-5 rounded-lg border-l-4 border-brand-pink">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-navy mb-1">
                        {factor.factor || 'Unknown Factor'}
                      </h4>
                      <span className="text-sm text-gray-500">
                        Weight: {factor.weight || 'N/A'}
                      </span>
                    </div>
                    <div className="ml-4">
                      <span className={`inline-block px-4 py-2 rounded-full font-bold text-lg border-2 ${getBadgeColor(factor.score || 0)}`}>
                        {factor.score || 0}/100
                      </span>
                    </div>
                  </div>
                  {factor.reasoning && (
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {factor.reasoning}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {details?.trust_score?.methodology && (
              <p className="text-xs text-gray-500 mt-4 italic">
                Method: {details.trust_score.methodology}
              </p>
            )}
          </div>
        )}

        {/* RED FLAGS */}
        {details?.content_analysis?.red_flags && details.content_analysis.red_flags.length > 0 && (
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="text-xl font-bold text-navy mb-4">
              🚩 Quality Issues Detected
            </h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
              <ul className="space-y-2">
                {details.content_analysis.red_flags.map((flag: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-600 mr-2">⚠️</span>
                    <span className="text-gray-700 capitalize">{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* SOURCE INFO */}
        {details?.source_credibility && (
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="text-xl font-bold text-navy mb-4">
              🏢 Source Information
            </h3>
            <div className="bg-blue-50 p-5 rounded-lg">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 mb-1">Domain</p>
                  <p className="font-semibold text-navy">{details.article?.domain || 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Credibility Tier</p>
                  <p className="font-semibold text-navy capitalize">{details.source_credibility.tier}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Bias</p>
                  <p className="font-semibold text-navy capitalize">{details.source_credibility.bias}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Type</p>
                  <p className="font-semibold text-navy capitalize">
                    {details.source_credibility.type?.replace('_', ' ')}
                  </p>
                </div>
              </div>
              {details.source_credibility.verdict && (
                <p className="text-sm text-gray-700 mt-4 pt-4 border-t border-blue-200">
                  <strong>Assessment:</strong> {details.source_credibility.verdict}
                </p>
              )}
            </div>
          </div>
        )}

        {/* ARTICLE INFO */}
        {details?.article && (
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="text-xl font-bold text-navy mb-4">
              📰 Article Details
            </h3>
            <div className="bg-gray-50 p-5 rounded-lg space-y-3 text-sm">
              {details.article.title && (
                <div>
                  <p className="text-gray-600 mb-1">Title</p>
                  <p className="font-semibold text-navy">{details.article.title}</p>
                </div>
              )}
              {details.article.author && (
                <div>
                  <p className="text-gray-600 mb-1">Author</p>
                  <p className="text-gray-700">{details.article.author}</p>
                </div>
              )}
              {details.article.word_count && (
                <div>
                  <p className="text-gray-600 mb-1">Word Count</p>
                  <p className="text-gray-700">{details.article.word_count} words</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Confidence & Recommendation */}
        {details?.trust_score?.confidence && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm text-gray-700">
              <strong>Confidence:</strong> {details.trust_score.confidence}
            </p>
            {details.trust_score.recommended_action && (
              <p className="text-sm text-gray-700 mt-2">
                <strong>Recommendation:</strong> {details.trust_score.recommended_action}
              </p>
            )}
          </div>
        )}

        {/* Verify Another Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-brand-pink text-white font-semibold rounded-lg hover:bg-pink-600 transition-colors"
          >
            Verify Another
          </button>
        </div>
      </div>
    </div>
  );
}
