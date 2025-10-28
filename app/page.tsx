'use client'

import { useState } from 'react'
import axios from 'axios'
import Logo from '@/components/Logo'
import VerifyInput from '@/components/VerifyInput'
import LoadingAnimation from '@/components/LoadingAnimation'
import ScoreDisplay from '@/components/ScoreDisplay'
import PartnerTicker from '@/components/PartnerTicker'

// Railway API endpoint
const API_BASE_URL = 'https://credisource-production.up.railway.app'

export default function Home() {
  const [status, setStatus] = useState<'input' | 'loading' | 'results'>('input')
  const [loadingMessage, setLoadingMessage] = useState('Analyzing...')
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const determineContentType = (data: { type: string; content: string | File }) => {
    if (data.type === 'text') return 'text'
    if (data.type === 'file') {
      const file = data.content as File
      if (file.type.startsWith('video/')) return 'video'
      if (file.type.startsWith('image/')) return 'image'
    }
    if (data.type === 'url') {
      const url = data.content as string
      // Check if it's a social media URL
      if (url.includes('tiktok.com') || url.includes('twitter.com') || 
          url.includes('youtube.com') || url.includes('instagram.com')) {
        return 'video'
      }
      // Check file extension
      if (url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) return 'image'
      if (url.match(/\.(mp4|mov|avi|webm)$/i)) return 'video'
      return 'image' // Default to image for URLs
    }
    return 'image'
  }

  const pollJobStatus = async (jobId: string) => {
    const maxAttempts = 120 // 2 minutes max (1 second intervals)
    let attempts = 0

    const poll = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/job/${jobId}`)
        const job = response.data

        if (job.status === 'completed') {
          setResults(job.result)
          setStatus('results')
          return
        }

        if (job.status === 'failed') {
          setError(job.error || 'Verification failed')
          setStatus('input')
          return
        }

        // Update loading message based on progress
        if (job.progress) {
          setLoadingMessage(job.progress)
        }

        attempts++
        if (attempts < maxAttempts) {
          setTimeout(poll, 1000) // Poll every second
        } else {
          setError('Verification timed out. Please try again.')
          setStatus('input')
        }
      } catch (err) {
        console.error('Polling error:', err)
        setError('Failed to check job status')
        setStatus('input')
      }
    }

    poll()
  }

  const handleSubmit = async (data: { type: string; content: string | File }) => {
    setStatus('loading')
    setError(null)
    setLoadingMessage('Starting verification...')

    try {
      const contentType = determineContentType(data)
      let response

      if (data.type === 'text') {
        // Text verification
        setLoadingMessage('Analyzing text for AI patterns...')
        response = await axios.post(`${API_BASE_URL}/verify/text`, {
          text: data.content,
          content_type: 'text'
        })
      } else if (data.type === 'url') {
        // URL verification
        setLoadingMessage(`Downloading and analyzing ${contentType}...`)
        const endpoint = contentType === 'video' ? '/verify/video' : '/verify/image'
        response = await axios.post(`${API_BASE_URL}${endpoint}`, {
          url: data.content,
          content_type: contentType
        })
      } else if (data.type === 'file') {
        // File upload - FIXED: Use /verify/file endpoint
        setLoadingMessage(`Uploading and analyzing ${contentType}...`)
        const formData = new FormData()
        formData.append('file', data.content as File)
        formData.append('content_type', contentType)

        // FIXED: Always use /verify/file for file uploads
        response = await axios.post(`${API_BASE_URL}/verify/file`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      }

      if (response?.data?.job_id) {
        setLoadingMessage('Processing your content...')
        pollJobStatus(response.data.job_id)
      } else {
        setError('Failed to start verification')
        setStatus('input')
      }
    } catch (err: any) {
      console.error('Submission error:', err)
      setError(err.response?.data?.detail || 'Verification failed. Please try again.')
      setStatus('input')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <Logo />
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {status === 'input' && (
          <div className="text-center mb-12">
            {/* Hero headline */}
            <h1 className="text-5xl md:text-6xl font-bold text-brand-navy mb-4">
              Know What's Real
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Verify images, videos, and text for AI generation
            </p>
            <p className="text-lg text-gray-500">
              Multi-provider detection for accurate results
            </p>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            <p className="font-medium">⚠️ {error}</p>
          </div>
        )}

        {/* Content based on status */}
        {status === 'input' && (
          <VerifyInput onSubmit={handleSubmit} isLoading={false} />
        )}

        {status === 'loading' && (
          <LoadingAnimation status={loadingMessage} />
        )}

        {status === 'results' && results && (
          <ScoreDisplay
            score={results.trust_score.score}
            verdict={results.trust_score.label}
            details={results}
          />
        )}

        {/* Features section (only show on input) */}
        {status === 'input' && (
          <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">Multi-Provider</h3>
              <p className="text-gray-600">
                Combines results from multiple AI detection APIs for higher accuracy
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">Fast Results</h3>
              <p className="text-gray-600">
                Get verification results in 5-60 seconds depending on content type
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">Trust Score</h3>
              <p className="text-gray-600">
                Clear 0-100 scale with detailed evidence breakdown
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Partner ticker (only show on input) */}
      {status === 'input' && (
        <div className="mt-20">
          <PartnerTicker />
        </div>
      )}

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 mt-20 border-t border-gray-200">
        <div className="text-center text-gray-600">
          <Logo className="justify-center mb-4" />
          <p className="text-sm">
            Restoring trust by making it possible to know what's real.
          </p>
          <p className="text-xs mt-4 text-gray-500">
            © 2025 CrediSource. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
