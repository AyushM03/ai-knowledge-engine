'use client'
import { useState } from 'react'

export default function UploadPage() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleUpload = async () => {
    if (!file) return

    setLoading(true)
    setError(null)
    setResult(null)

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('http://127.0.0.1:8000/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Upload failed')
      }

      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Upload Document</h2>
        <p className="text-gray-500 mt-1">Add a PDF or text file to your knowledge base</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">

        <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
          <input
            type="file"
            accept=".pdf,.txt"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
            id="file-input"
          />
          <label htmlFor="file-input" className="cursor-pointer space-y-2 block">
            <div className="text-3xl">📁</div>
            <p className="text-sm font-medium text-gray-700">
              {file ? file.name : 'Click to choose a file'}
            </p>
            <p className="text-xs text-gray-400">PDF or TXT files only</p>
          </label>
        </div>

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Uploading and processing...' : 'Upload to Knowledge Base'}
        </button>

      </div>

      {result && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <p className="font-medium text-green-800">Upload successful</p>
          <p className="text-sm text-green-700 mt-1">{result.message}</p>
          <p className="text-xs text-green-600 mt-2">
            {result.chunks_created} chunks stored in your knowledge base
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <p className="font-medium text-red-800">Upload failed</p>
          <p className="text-sm text-red-700 mt-1">{error}</p>
        </div>
      )}

    </div>
  )
}