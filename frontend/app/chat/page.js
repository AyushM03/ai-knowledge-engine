'use client'
import { useState } from 'react'

export default function ChatPage() {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const handleAsk = async () => {
    if (!question.trim() || loading) return

    const userQuestion = question
    setQuestion('')
    setMessages(prev => [...prev, { role: 'user', content: userQuestion }])
    setLoading(true)

    try {
      const response = await fetch('http://127.0.0.1:8000/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userQuestion, top_k: 3 }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Query failed')
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.answer,
        sources: data.sources
      }])

    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Something went wrong. Please try again.',
        sources: []
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleAsk()
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Ask Your Documents</h2>
        <p className="text-gray-500 mt-1">Ask any question about your uploaded documents</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl min-h-96 flex flex-col">

        <div className="flex-1 p-4 space-y-4 min-h-80">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 mt-16">
              <p className="text-3xl mb-3">💬</p>
              <p className="text-sm">Ask a question about your uploaded documents</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xl rounded-xl px-4 py-3 text-sm ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <p>{msg.content}</p>
                {msg.sources && msg.sources.length > 0 && (
                  <p className="text-xs mt-2 opacity-60">
                    Source: {msg.sources.join(', ')}
                  </p>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-500">
                Thinking...
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 p-4 flex gap-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about your documents..."
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-400"
          />
          <button
            onClick={handleAsk}
            disabled={!question.trim() || loading}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Ask
          </button>
        </div>

      </div>
    </div>
  )
}