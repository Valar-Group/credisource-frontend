'use client';

interface ResultDisplayProps {
  result: any;
  isLoading: boolean;
}

export default function ResultDisplay({ result, isLoading }: ResultDisplayProps) {
  // ALWAYS show this for debugging
  console.log('========== RESULT DISPLAY RENDERED ==========');
  console.log('Result:', result);
  console.log('Is Loading:', isLoading);
  
  if (isLoading) {
    return <div className="p-12 text-center">Loading...</div>;
  }

  if (!result) {
    return <div className="p-12 text-center">No result yet</div>;
  }

  // FORCE SHOW EVERYTHING - NO CONDITIONS
  const factors = result?.trust_score?.scoring_factors || [];
  
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        {result?.trust_score?.score || 0}%
      </h1>
      
      <div className="border-4 border-red-500 p-4 mb-4">
        <h2 className="text-2xl font-bold mb-2">DEBUG INFO</h2>
        <p>Has result: {result ? 'YES' : 'NO'}</p>
        <p>Has trust_score: {result?.trust_score ? 'YES' : 'NO'}</p>
        <p>Has scoring_factors: {result?.trust_score?.scoring_factors ? 'YES' : 'NO'}</p>
        <p>Factors count: {factors.length}</p>
      </div>

      <div className="border-4 border-blue-500 p-4 mb-4">
        <h2 className="text-2xl font-bold mb-4">📊 SCORING FACTORS</h2>
        <p className="mb-2">Attempting to render {factors.length} factors...</p>
        {factors.length === 0 && <p className="text-red-600">NO FACTORS FOUND!</p>}
        {factors.map((factor: any, i: number) => (
          <div key={i} className="bg-gray-100 p-4 mb-2 rounded">
            <p className="font-bold">{i + 1}. {factor?.factor || 'UNKNOWN'}</p>
            <p>Score: {factor?.score || 0}/100</p>
            <p>Weight: {factor?.weight || 'N/A'}</p>
            <p className="text-sm text-gray-600">{factor?.reasoning || 'No reasoning'}</p>
          </div>
        ))}
      </div>

      <div className="border-4 border-green-500 p-4">
        <h2 className="text-2xl font-bold mb-2">RAW DATA</h2>
        <pre className="text-xs overflow-auto max-h-40 bg-black text-green-400 p-2">
          {JSON.stringify(result, null, 2)}
        </pre>
      </div>
    </div>
  );
}
