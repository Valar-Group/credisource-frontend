'use client';

import { useState } from 'react';
import axios from 'axios';

const API_BASE = 'https://credisource-production.up.railway.app';

type ContentType = 'image' | 'video' | 'text' | 'news';

interface VerifyInterfaceProps {
  onResult: (result: any) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export default function VerifyInterface({ onResult, isLoading, setIsLoading }: VerifyInterfaceProps) {
  const [contentType, setContentType] = useState<ContentType>('image');
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    onResult(null);

    try {
      let jobId: string;

      // Submit verification job
      if (contentType === 'text') {
        const response = await axios.post(`${API_BASE}/verify/text`, {
          text,
          content_type: 'text'
        });
        jobId = response.data.job_id;
      } else if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('content_type', contentType);
        
        const response = await axios.post(`${API_BASE}/verify/${contentType}`, formData);
        jobId = response.data.job_id;
      } else if (url) {
        const response = await axios.post(`${API_BASE}/verify/${contentType}`, {
          url,
          content_type: contentType
        });
        jobId = response.data.job_id;
      } else {
        throw new Error('Please provide content to verify');
      }

      // Poll for results
      const pollResult = async () => {
        const statusResponse = await axios.get(`${API_BASE}/job/${jobId}`);
        const data = statusResponse.data;

        if (data.status === 'completed') {
          onResult(data.result);
          setIsLoading(false);
        } else if (data.status === 'failed') {
          onResult({ error: data.error || 'Verification failed' });
          setIsLoading(false);
        } else {
          setTimeout(pollResult, 2000);
        }
      };

      pollResult();
    } catch (error: any) {
      onResult({ error: error.response?.data?.detail || error.message });
      setIsLoading(false);
    }
  };

  const canSubmit = contentType === 'text' ? text.length > 0 : (url || file);

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        {/* Content Type Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['image', 'video', 'text', 'news'] as ContentType[]).map((type) => (
            <button
              key={type}
              onClick={() => {
                setContentType(type);
                setUrl('');
                setText('');
                setFile(null);
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                contentType === type
                  ? 'bg-brand-pink text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Input Section */}
        {contentType === 'text' ? (
          <div className="mb-6">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste the text you want to verify (minimum 300 characters)..."
              className="w-full h-40 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-brand-pink focus:outline-none resize-none"
            />
            <p className="text-sm text-gray-500 mt-2">
              {text.length} / 300 characters minimum
            </p>
          </div>
        ) : (
          <>
            {/* URL Input */}
            <div className="mb-4">
              <input
                type="text"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  setFile(null);
                }}
                placeholder={`Enter ${contentType === 'news' ? 'news article' : contentType} URL (TikTok, Twitter, Instagram, etc.)`}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:border-brand-pink focus:outline-none text-lg"
              />
            </div>

            <div className="text-center text-gray-500 mb-4">OR</div>

            {/* File Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-brand-pink transition-colors">
              <input
                type="file"
                id="file-upload"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFile(e.target.files[0]);
                    setUrl('');
                  }
                }}
                accept={contentType === 'image' ? 'image/*' : contentType === 'video' ? 'video/*' : '*'}
                className="hidden"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="text-6xl mb-4">📁</div>
                {file ? (
                  <p className="text-lg font-semibold text-brand-pink">{file.name}</p>
                ) : (
                  <>
                    <p className="text-lg font-semibold mb-2">Drop {contentType} here or click to upload</p>
                    <p className="text-sm text-gray-500">
                      {contentType === 'image' ? 'PNG, JPG, WebP up to 10MB' : 'MP4, MOV up to 150MB'}
                    </p>
                  </>
                )}
              </label>
            </div>
          </>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit || isLoading}
          className={`w-full mt-6 py-4 rounded-lg font-bold text-lg transition-all ${
            canSubmit && !isLoading
              ? 'bg-brand-pink text-white hover:bg-pink-600 shadow-lg hover:shadow-xl'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? 'Verifying...' : '✓ Verify Content'}
        </button>
      </div>
    </div>
  );
}
