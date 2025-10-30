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

  // SAFETY CHECK: If score or verdict is undefined, show error
  if (score === undefined || score === null || verdict === undefined || !details) {
    console.log('⚠️ MISSING DATA - Score, verdict, or details is undefined');
    return (
      <div className="p-12 text-center">
        <p className="text-red-600 mb-4">Error: Missing display data</p>
        <div className="text-left max-w-2xl mx-auto">
          <p className="text-sm text-gray-600 mb-2">Debug info:</p>
          <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-96">
            {JSON.stringify({ score, verdict, details }, null, 2)}
          </pre>
        </div>
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

  // Check if we have news verification breakdown (source/content/cross-ref scores)
  const hasNewsBreakdown = details.source_credibility !== undefined && 
                           details.content_quality !== undefined && 
                           details.cross_reference !== undefined;

  // Check if we have image/video/text detection info
  const hasDetectionInfo = details.detectors_used || details.providers || details.provider;

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
          
          {/* Status Badge - DO NOT SHARE / SAFE TO SHARE */}
          {details.warning_level && (
            <div className="mt-4 flex justify-center">
              {(details.warning_level === 'critical' || details.warning_level === 'high') ? (
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-50 border-2 border-red-500 rounded-lg shadow-sm">
                  <span className="text-red-600 text-xl">⚠️</span>
                  <span className="text-red-800 font-bold text-sm uppercase tracking-wide">DO NOT SHARE</span>
                </div>
              ) : details.warning_level === 'medium' ? (
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-50 border-2 border-yellow-500 rounded-lg shadow-sm">
                  <span className="text-yellow-600 text-xl">⚠️</span>
                  <span className="text-yellow-800 font-bold text-sm uppercase tracking-wide">VERIFY BEFORE SHARING</span>
                </div>
              ) : details.should_share && (
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-50 border-2 border-green-500 rounded-lg shadow-sm">
                  <span className="text-green-600 text-xl">✓</span>
                  <span className="text-green-800 font-bold text-sm uppercase tracking-wide">SAFE TO SHARE</span>
                </div>
              )}
            </div>
          )}
          
          {/* Explanation Text */}
          {details.explanation && (
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
              {details.explanation}
            </p>
          )}
          
          {/* Recommendation (fallback if no explanation) */}
          {!details.explanation && details.recommendation && (
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
              {details.recommendation}
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

        {/* NEWS VERIFICATION BREAKDOWN */}
        {hasNewsBreakdown && (
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="text-xl font-bold text-navy mb-4">
              📊 Scoring Breakdown
            </h3>
            <div className="space-y-4">
              {/* Source Credibility */}
              <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-brand-pink">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-navy mb-1">
                      Source Credibility
                    </h4>
                    <span className="text-sm text-gray-500">
                      Weight: {details.weights_used?.source ? `${Math.round(details.weights_used.source * 100)}%` : '40%'}
                    </span>
                  </div>
                  <div className="ml-4">
                    <span className={`inline-block px-4 py-2 rounded-full font-bold text-lg border-2 ${getBadgeColor(details.source_credibility)}`}>
                      {details.source_credibility}/100
                    </span>
                  </div>
                </div>
                {details.evidence?.source?.verdict && (
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {details.evidence.source.verdict}
                  </p>
                )}
              </div>

              {/* Content Quality */}
              <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-brand-pink">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-navy mb-1">
                      Content Quality
                    </h4>
                    <span className="text-sm text-gray-500">
                      Weight: {details.weights_used?.content ? `${Math.round(details.weights_used.content * 100)}%` : '35%'}
                    </span>
                  </div>
                  <div className="ml-4">
                    <span className={`inline-block px-4 py-2 rounded-full font-bold text-lg border-2 ${getBadgeColor(details.content_quality)}`}>
                      {details.content_quality}/100
                    </span>
                  </div>
                </div>
                {details.evidence?.content?.verdict && (
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {details.evidence.content.verdict}
                  </p>
                )}
                {details.evidence?.content?.contradiction_warning && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-800 text-sm font-medium">
                      {details.evidence.content.contradiction_warning}
                    </p>
                  </div>
                )}
              </div>

              {/* Cross-Reference */}
              <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-brand-pink">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg text-navy mb-1">
                      Cross-Reference
                    </h4>
                    <span className="text-sm text-gray-500">
                      Weight: {details.weights_used?.cross_ref ? `${Math.round(details.weights_used.cross_ref * 100)}%` : '25%'}
                    </span>
                  </div>
                  <div className="ml-4">
                    <span className={`inline-block px-4 py-2 rounded-full font-bold text-lg border-2 ${getBadgeColor(details.cross_reference)}`}>
                      {details.cross_reference}/100
                    </span>
                  </div>
                </div>
                {details.evidence?.cross_reference?.verdict && (
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {details.evidence.cross_reference.verdict}
                  </p>
                )}
                {details.evidence?.cross_reference?.contradiction_warning && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-800 text-sm font-medium">
                      {details.evidence.cross_reference.contradiction_warning}
                    </p>
                  </div>
                )}
              </div>
            </div>
            {details.story_type && (
              <p className="text-xs text-gray-500 mt-4 italic">
                Story type: {details.story_type}. Weighted analysis across multiple factors.
              </p>
            )}
          </div>
        )}

        {/* IMAGE/VIDEO/TEXT DETECTION INFO */}
        {hasDetectionInfo && !hasNewsBreakdown && (
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="text-xl font-bold text-navy mb-4">
              🤖 AI Detection Analysis
            </h3>
            <div className="bg-gray-50 p-5 rounded-lg">
              {details.detectors_used && (
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Detectors used:</strong> {details.detectors_used}
                </p>
              )}
              {details.providers && Array.isArray(details.providers) && (
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Providers:</strong> {details.providers.join(', ')}
                </p>
              )}
              {details.provider && (
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Provider:</strong> {details.provider}
                </p>
              )}
              {details.confidence && (
                <p className="text-sm text-gray-700">
                  <strong>Confidence:</strong> {details.confidence}
                </p>
              )}
            </div>
          </div>
        )}

        {/* RED FLAGS */}
        {details.evidence?.content?.red_flags && details.evidence.content.red_flags.length > 0 && (
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="text-xl font-bold text-navy mb-4">
              🚩 Quality Issues Detected
            </h3>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
              <ul className="space-y-2">
                {details.evidence.content.red_flags.map((flag: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-yellow-600 mr-2">⚠️</span>
                    <span className="text-gray-700">{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* SOURCE INFORMATION */}
        {details.evidence?.source && (
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="text-xl font-bold text-navy mb-4">
              🏢 Source Information
            </h3>
            <div className="bg-blue-50 p-5 rounded-lg">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 mb-1">Domain</p>
                  <p className="font-semibold text-navy">{details.evidence.source.domain || 'Unknown'}</p>
                </div>
                {details.evidence.source.tier && (
                  <div>
                    <p className="text-gray-600 mb-1">Credibility Tier</p>
                    <p className="font-semibold text-navy capitalize">{details.evidence.source.tier}</p>
                  </div>
                )}
                {details.evidence.source.bias && (
                  <div>
                    <p className="text-gray-600 mb-1">Bias</p>
                    <p className="font-semibold text-navy capitalize">{details.evidence.source.bias}</p>
                  </div>
                )}
                {details.evidence.source.type && (
                  <div>
                    <p className="text-gray-600 mb-1">Type</p>
                    <p className="font-semibold text-navy capitalize">
                      {details.evidence.source.type.replace('_', ' ')}
                    </p>
                  </div>
                )}
              </div>
              {details.evidence.source.verdict && (
                <p className="text-sm text-gray-700 mt-4 pt-4 border-t border-blue-200">
                  <strong>Assessment:</strong> {details.evidence.source.verdict}
                </p>
              )}
            </div>
          </div>
        )}

        {/* CORROBORATING SOURCES */}
        {details.evidence?.cross_reference?.corroborating_sources && 
         details.evidence.cross_reference.corroborating_sources.length > 0 && (
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="text-xl font-bold text-navy mb-4">
              🔍 Corroborating Sources ({details.evidence.cross_reference.sources_found || details.evidence.cross_reference.corroborating_sources.length} found)
            </h3>
            <div className="bg-gray-50 p-5 rounded-lg space-y-3">
              {details.evidence.cross_reference.corroborating_sources.slice(0, 3).map((source: any, index: number) => (
                <div key={index} className="border-l-2 border-blue-500 pl-3">
                  <p className="font-semibold text-navy text-sm">{source.source}</p>
                  <p className="text-xs text-gray-600 mt-1">{source.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ERROR DISPLAY */}
        {details.error && (
          <div className="border-t border-gray-200 pt-6 mb-6">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-red-800 mb-2">⚠️ Error</h3>
              <p className="text-sm text-red-700">{details.error}</p>
            </div>
          </div>
        )}

        {/* CONFIDENCE & RECOMMENDATION */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <p className="text-sm text-gray-700">
            <strong>Confidence:</strong> {
              details.confidence || 
              (score >= 80 ? 'High' : score >= 50 ? 'Medium' : 'Low')
            }
          </p>
          {details.recommendation && (
            <p className="text-sm text-gray-700 mt-2">
              <strong>Recommendation:</strong> {details.recommendation}
            </p>
          )}
        </div>

        {/* VERIFY ANOTHER BUTTON */}
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
