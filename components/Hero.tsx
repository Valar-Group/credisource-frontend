export default function Hero() {
  return (
    <div className="max-w-6xl mx-auto px-4 text-center mb-16">
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
        Know What's <span className="text-brand-pink">Real</span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
        The internet has lost its anchor. With AI generating content faster than humans can fact-check,{' '}
        <span className="text-brand-pink font-semibold">trust is collapsing at scale.</span>
      </p>
      <p className="text-lg text-gray-400 max-w-2xl mx-auto">
        Verify images, videos, text, and news articles with our multi-provider AI detection platform
      </p>
    </div>
  );
}
