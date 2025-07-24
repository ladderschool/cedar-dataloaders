import { useState } from 'react'

import type { FindBookQuery } from 'types/graphql'

type BookProps = {
  book: FindBookQuery['book']
}

const Book = ({ book }: BookProps) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0)

  // Split the book content into pages (simulating pages)
  const pages = book.pages || []
  const totalPages = pages.length

  const goToPreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(currentPageIndex + 1)
    }
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      goToPreviousPage()
    } else if (event.key === 'ArrowRight') {
      goToNextPage()
    }
  }

  // Add keyboard event listener
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeyPress)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Book Details Section */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Book Cover */}
            <div className="flex-shrink-0">
              <div className="w-48 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-4xl font-bold mb-2">
                    {book.title.charAt(0)}
                  </div>
                  <div className="text-sm opacity-90">Book Cover</div>
                </div>
              </div>
            </div>

            {/* Book Information */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {book.title}
              </h1>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-gray-600 font-medium w-20">
                    Author:
                  </span>
                  <span className="text-gray-900">{book.author}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 font-medium w-20">Year:</span>
                  <span className="text-gray-900">{book.year}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 font-medium w-20">Genre:</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {book.genre}
                  </span>
                </div>
                {book.description && (
                  <div className="pt-2">
                    <span className="text-gray-600 font-medium block mb-2">
                      Description:
                    </span>
                    <p className="text-gray-700 leading-relaxed">
                      {book.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pages Section */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {totalPages > 0 ? (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Page Navigation */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPageIndex === 0}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span>Previous</span>
                </button>

                <div className="text-center">
                  <span className="text-sm text-gray-500">Page</span>
                  <div className="text-lg font-semibold text-gray-900">
                    {currentPageIndex + 1} of {totalPages}
                  </div>
                </div>

                <button
                  onClick={goToNextPage}
                  disabled={currentPageIndex === totalPages - 1}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <span>Next</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Page Content */}
            <div className="p-8">
              <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {pages[currentPageIndex].title}
                  </h2>
                  <div className="text-sm text-gray-500 mb-4">
                    {pages[currentPageIndex].published ? (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        Published
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                        Draft
                      </span>
                    )}
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {pages[currentPageIndex].content}
                  </div>
                </div>
              </div>
            </div>

            {/* Page Number Footer */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
              <div className="text-center text-sm text-gray-500">
                Page {currentPageIndex + 1} of {totalPages}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Pages Available
            </h3>
            <p className="text-gray-600">
              This book doesn&apos;t have any pages yet. Pages will appear here
              once they&apos;re added to the book.
            </p>
          </div>
        )}
      </div>

      {/* Keyboard Navigation Hint */}
      {totalPages > 1 && (
        <div className="max-w-4xl mx-auto px-6 pb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-4 text-sm text-blue-700">
              <span>💡 Use arrow keys to navigate:</span>
              <kbd className="px-2 py-1 bg-blue-100 rounded text-xs font-mono">
                ←
              </kbd>
              <span>Previous</span>
              <kbd className="px-2 py-1 bg-blue-100 rounded text-xs font-mono">
                →
              </kbd>
              <span>Next</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Book
