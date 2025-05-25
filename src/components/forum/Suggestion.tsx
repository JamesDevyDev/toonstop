'use client'

import React, { useEffect, useState } from 'react'
import useCommentStore from '@/zustand/useCommentStore'
import useAuthStore from '@/zustand/useAuthStore'

const SuggestionsComponent = () => {
  const { authUser } = useAuthStore()
  const { suggestionComments, getSuggestionComments } = useCommentStore()

  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false) // for POST
  const [isFetchingSuggestions, setIsFetchingSuggestions] = useState(true) // for GET

  useEffect(() => {
    const fetchComments = async () => {
      setIsFetchingSuggestions(true)
      await getSuggestionComments()
      setIsFetchingSuggestions(false)
    }

    fetchComments()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setLoading(true)
    try {
      const res = await fetch('/discussion/comment/suggestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newComment }),
      })

      if (!res.ok) throw new Error('Failed to post comment')

      setNewComment('')
      setIsFetchingSuggestions(true)
      await getSuggestionComments() // Refresh comments after posting
      setIsFetchingSuggestions(false)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <div className="w-full flex flex-col gap-4">
      {authUser && (
        <form
          onSubmit={handleSubmit}
          className="w-full mt-2 bg-gray-600 rounded-lg p-4 flex flex-col gap-3 shadow"
        >
          <textarea
            className="textarea textarea-bordered w-full resize-none bg-gray-700 text-white"
            placeholder="Write your suggestion..."
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            type="submit"
            disabled={loading || !newComment.trim()}
            className="btn bg-[#d7af57] self-end"
          >
            {loading ? 'Posting...' : 'Post Suggestion'}
          </button>
        </form>
      )}

      {/* Render Suggestions or Skeleton */}
      {isFetchingSuggestions ? (
        <div className="space-y-4">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="card w-full bg-gray-600 shadow-md">
              <div className="card-body p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="skeleton w-10 h-10 rounded-full bg-gray-900"></div>
                  <div className="skeleton h-4 w-24 rounded bg-gray-900"></div>
                </div>
                <div className="skeleton h-3 w-3/4 rounded bg-gray-900"></div>
                <div className="skeleton h-3 w-full rounded bg-gray-900"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        suggestionComments?.map((comment, index) => (
          <div
            key={index}
            className="bg-gray-500/70 rounded-xl p-4 shadow-md w-full text-sm"
          >
            <div className="flex items-center space-x-2 mb-2">
              <span className="cursor-pointer font-bold text-[#d7af57]">Suggestions</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-400">
                {new Date(comment?.createdAt).toLocaleString([], {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </span>
            </div>

            <p className="text-gray-300 text-sm mb-3">{comment?.text}</p>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <img
                  src={comment?.commenterId.avatar}
                  alt="avatar"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-yellow-400 text-sm font-medium">
                  {comment?.commenterId?.username}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default SuggestionsComponent
