import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-8">

      <div className="text-center space-y-3">
        <h2 className="text-3xl font-semibold text-gray-900">
          Your personal AI assistant
        </h2>
        <p className="text-gray-500 text-lg">
          Upload your documents and ask questions about them
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <Link href="/upload">
          <div className="border border-gray-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer bg-white">
            <div className="text-2xl mb-3">📄</div>
            <h3 className="font-semibold text-gray-900 mb-1">Upload Documents</h3>
            <p className="text-sm text-gray-500">
              Add PDFs or text files to your knowledge base
            </p>
          </div>
        </Link>

        <Link href="/chat">
          <div className="border border-gray-200 rounded-xl p-6 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer bg-white">
            <div className="text-2xl mb-3">💬</div>
            <h3 className="font-semibold text-gray-900 mb-1">Ask Questions</h3>
            <p className="text-sm text-gray-500">
              Chat with your documents using AI
            </p>
          </div>
        </Link>

      </div>

      <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-3">How it works</h3>
        <div className="space-y-2">
          <div className="flex items-start gap-3">
            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">1</span>
            <p className="text-sm text-gray-600">Upload any PDF or text file</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">2</span>
            <p className="text-sm text-gray-600">AI reads and stores your document as searchable knowledge</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full">3</span>
            <p className="text-sm text-gray-600">Ask any question — get answers from your own documents</p>
          </div>
        </div>
      </div>

    </div>
  )
}