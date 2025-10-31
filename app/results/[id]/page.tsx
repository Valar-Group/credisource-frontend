'use client';

import React from 'react';

interface VerificationResult {
  jobId: string;
  contentType: 'image' | 'video' | 'text' | 'news';
  status: 'processing' | 'completed' | 'failed';
  trustScore: number;
  label: string;
  verdict: string;
  confidence: string;
  detectors?: string[];
  evidence?: {
    provider: string;
    score: number;
    weight: number;
  }[];
  processingTime?: number;
}

export default function ResultsPage({ params }: { params: { id: string } }) {
  const [result, setResult] = React.useState<VerificationResult>({
    jobId: params.id,
    contentType: 'image',
    status: 'processing',
    trustScore: 0,
    label: '',
    verdict: '',
    confidence: '',
  });

  return <ResultsDisplay result={result} />;
}

function ResultsDisplay({ result }: { result: VerificationResult }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (result.status === 'processing') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 15;
        });
      }, 500);
      return () => clearInterval(interval);
    } else if (result.status === 'completed') {
      setProgress(100);
    }
  }, [result.status]);

  if (result.status === 'processing') {
    return <ProcessingState progress={progress} contentType={result.contentType} />;
  }

  if (result.status === 'failed') {
    return <ErrorState />;
  }

  return <CompletedState result={result} />;
}

function ProcessingState({ progress, contentType }: { progress: number; contentType: string }) {
  const messages = ['Analyzing content...', 'Running AI detection models...', 'Computing trust score...', 'Almost there...'];
  const messageIndex = Math.min(Math.floor(progress / 25), messages.length - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#152542] to-[#1a1535] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-12 border border-white/10">
          <div className="text-center mb-8">
            <div className="inline-block p-6 bg-[#E91E8C]/20 rounded-full mb-4">
              <ContentTypeIcon type={contentType} className="w-16 h-16 text-[#E91E8C]" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Verifying {contentType}</h2>
            <p className="text-[#B8C5D6]">{messages[messageIndex]}</p>
          </div>

          <div className="space-y-3">
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#E91E8C] to-[#7B2D8E] transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
            </div>
            <div className="text-right text-[#E91E8C] font-semibold">{Math.round(progress)}%</div>
          </div>

          <div className="mt-8 space-y-3">
            <ProcessingStep label="Downloading content" completed={progress > 20} active={progress <= 20} />
            <ProcessingStep label="Running AI detection" completed={progress > 60} active={progress > 20 && progress <= 60} />
            <ProcessingStep label="Calculating trust score" completed={progress > 90} active={progress > 60 && progress <= 90} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProcessingStep({ label, completed, active }: { label: string; completed: boolean; active: boolean }) {
  return (
    <div className="flex items-center gap-3">
      {completed ? (
        <div className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      ) : active ? (
        <div className="w-6 h-6 rounded-full border-3 border-[#E91E8C] border-t-transparent animate-spin" />
      ) : (
        <div className="w-6 h-6 rounded-full bg-white/10" />
      )}
      <span className={completed ? 'text-white' : active ? 'text-[#E91E8C]' : 'text-[#B8C5D6]'}>{label}</span>
    </div>
  );
}

function CompletedState({ result }: { result: VerificationResult }) {
  const scoreColor = getTrustScoreColor(result.trustScore);
  const scoreLabel = getTrustScoreLabel(result.trustScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#152542] to-[#1a1535] p-6">
      <div className="max-w-4xl mx-auto py-12">
        <div className="text-center mb-8">
          <a href="/" className="inline-block mb-6">
            <img src="/credisource-logo.png" alt="CrediSource" className="h-10" />
          </a>
          <h1 className="text-4xl font-bold text-white mb-2">Verification Complete</h1>
          <p className="text-[#B8C5D6]">Analysis completed in {result.processingTime}s</p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-12 border border-white/10 mb-8">
          <div className="text-center">
            <div className="mb-6">
              <div className="inline-block text-8xl font-bold mb-4" style={{ color: scoreColor }}>{result.trustScore}</div>
              <div className="text-2xl text-white font-semibold">{scoreLabel.label}</div>
            </div>

            <div className="max-w-md mx-auto mb-8">
              <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full transition-all duration-1000 ease-out" style={{ width: `${result.trustScore}%`, backgroundColor: scoreColor }} />
              </div>
              <div className="flex justify-between mt-2 text-sm text-[#B8C5D6]">
                <span>0</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6 mb-6">
              <div className="text-lg text-[#B8C5D6] mb-2">Verdict</div>
              <div className="text-xl text-white">{result.verdict}</div>
            </div>

            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full" style={{ backgroundColor: `${scoreColor}20` }}>
              <span className="text-sm font-semibold" style={{ color: scoreColor }}>{scoreLabel.confidence} Confidence</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button className="bg-[#E91E8C] hover:bg-[#d11a7d] text-white px-8 py-4 rounded-lg font-semibold transition-colors">Verify Another</button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold transition-colors border border-white/20">Download Report</button>
        </div>
      </div>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A1628] via-[#152542] to-[#1a1535] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-12 border border-white/10 text-center">
          <div className="inline-block p-6 bg-[#EF4444]/20 rounded-full mb-6">
            <svg className="w-16 h-16 text-[#EF4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">Verification Failed</h2>
          <p className="text-[#B8C5D6] mb-8">We couldn't verify this content.</p>

          <button className="bg-[#E91E8C] hover:bg-[#d11a7d] text-white px-8 py-4 rounded-lg font-semibold transition-colors">Try Again</button>
        </div>
      </div>
    </div>
  );
}

function ContentTypeIcon({ type, className }: { type: string; className?: string }) {
  const icons = {
    image: <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-5.5-7L13 15l-2-2-3 4h12l-4.5-6z"/>,
    video: <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>,
    text: <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>,
    news: <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>,
  };

  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      {icons[type as keyof typeof icons] || icons.image}
    </svg>
  );
}

function getTrustScoreColor(score: number): string {
  if (score >= 85) return '#10B981';
  if (score >=
