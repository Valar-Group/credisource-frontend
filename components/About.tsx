export default function About() {
  return (
    <div id="about" className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
          How It Works
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We combine multiple AI detection providers to give you the most accurate results
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-navy mb-3">Multi-Provider Detection</h3>
          <p className="text-gray-600">
            We use AIorNOT, Winston AI, Hugging Face, and Google to cross-validate results
          </p>
        </div>

        <div className="text-center p-6">
          <div className="text-6xl mb-4">⚡</div>
          <h3 className="text-2xl font-bold text-navy mb-3">Fast Results</h3>
          <p className="text-gray-600">
            Get verification results in 5-60 seconds depending on content type
          </p>
        </div>

        <div className="text-center p-6">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-2xl font-bold text-navy mb-3">High Accuracy</h3>
          <p className="text-gray-600">
            90-95% accuracy for images, 85-90% for videos, 85% for casual text
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
        <h3 className="text-3xl font-bold text-navy mb-6 text-center">
          Understanding Your Score
        </h3>
        
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-24 text-center">
              <span className="text-3xl font-bold text-green-600">70-100</span>
            </div>
            <div className="ml-6">
              <h4 className="text-xl font-bold text-green-600 mb-2">Likely Real</h4>
              <p className="text-gray-700">
                Content shows strong indicators of being human-created or authentic. Multiple detection models agree.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-24 text-center">
              <span className="text-3xl font-bold text-yellow-600">40-69</span>
            </div>
            <div className="ml-6">
              <h4 className="text-xl font-bold text-yellow-600 mb-2">Uncertain</h4>
              <p className="text-gray-700">
                Mixed signals from detection models. Could be edited content, artistic work, or edge cases. Proceed with caution.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 w-24 text-center">
              <span className="text-3xl font-bold text-red-600">0-39</span>
            </div>
            <div className="ml-6">
              <h4 className="text-xl font-bold text-red-600 mb-2">Likely AI-Generated</h4>
              <p className="text-gray-700">
                Content shows strong indicators of AI generation. Multiple models detected artificial patterns.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h4 className="font-bold text-navy mb-3">Our Detection Sources:</h4>
          <ul className="space-y-2 text-gray-700">
            <li><strong>AIorNOT:</strong> Industry-leading image and video AI detection</li>
            <li><strong>Winston AI:</strong> Text AI detection with 99.6% claimed accuracy</li>
            <li><strong>Hugging Face:</strong> Open-source AI models for backup detection</li>
            <li><strong>Google:</strong> Reverse image search for provenance checking</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
