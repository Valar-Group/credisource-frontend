'use client'

import { useState } from 'react'

interface VerifyInputProps {
  onSubmit: (data: { type: string; content: string | File }) => void
  isLoading: boolean
}

export default function VerifyInput({ onSubmit, isLoading }: VerifyInputProps) {
  const [inputType, setInputType] = useState<'url' | 'file' | 'text'>('url')
  const [urlInput, setUrlInput] = useState('')
  const [textInput, setTextInput] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (inputType === 'url' && urlInput) {
      onSubmit({ type: 'url', content: urlInput })
    } else if (inputType === 'text' && textInput) {
      onSubmit({ type: 'text', content: textInput })
    } else if (inputType === 'file' && selectedFile) {
      onSubmit({ type: 'file', content: selectedFile })
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
      setInputType('file')
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      setInputType('file')
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Tab selector */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setInputType('url')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            inputType === 'url'
              ? 'bg-brand-pink text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          URL
        </button>
        <button
          onClick={() => setInputType('file')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            inputType === 'file'
              ? 'bg-brand-pink text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Upload File
        </button>
        <button
          onClick={() => setInputType('text')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            inputType === 'text'
              ? 'bg-brand-pink text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Text
        </button>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        {/* URL Input */}
        {inputType === 'url' && (
          <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden border-2 border-gray-100 hover:border-brand-pink transition-all">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Enter a URL or drop an image to verify"
              className="flex-1 px-6 py-4 text-lg outline-none"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!urlInput || isLoading}
              className="bg-brand-navy text-white px-8 py-4 hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
            </button>
          </div>
        )}

        {/* File Upload */}
        {inputType === 'file' && (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-4 border-dashed rounded-3xl p-12 text-center transition-all ${
              dragActive
                ? 'border-brand-pink bg-pink-50'
                : 'border-gray-300 bg-white hover:border-brand-pink'
            }`}
          >
            <input
              type="file"
              id="file-upload"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="text-6xl mb-4">📁</div>
              <p className="text-xl font-medium text-gray-700 mb-2">
                {selectedFile ? selectedFile.name : 'Drop your file here or click to browse'}
              </p>
              <p className="text-gray-500">Supports images and videos</p>
            </label>
            {selectedFile && (
              <button
                type="submit"
                disabled={isLoading}
                className="mt-6 bg-brand-pink text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all disabled:opacity-50"
              >
                Verify File
              </button>
            )}
          </div>
        )}

        {/* Text Input */}
        {inputType === 'text' && (
          <div className="bg-white rounded-3xl shadow-lg p-6 border-2 border-gray-100 hover:border-brand-pink transition-all">
            <textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Paste text to verify for AI generation (minimum 300 characters)..."
              rows={8}
              className="w-full px-4 py-3 outline-none resize-none text-lg"
              disabled={isLoading}
            />
            <div className="flex justify-between items-center mt-4">
              <span className={`text-sm ${textInput.length >= 300 ? 'text-green-600' : 'text-gray-500'}`}>
                {textInput.length} / 300 characters minimum
              </span>
              <button
                type="submit"
                disabled={textInput.length < 300 || isLoading}
                className="bg-brand-navy text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Verify Text
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
