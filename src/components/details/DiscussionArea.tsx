'use client'

import React, { useEffect, useState } from 'react';
import { format } from 'timeago.js';
import useCommentStore from '@/zustand/useCommentStore';
import useAuthStore from '@/zustand/useAuthStore';

const DiscussionArea = ({ manwhaid }: { manwhaid: string }) => {
    const { currentComment, getCurrentComments } = useCommentStore();
    const { authUser } = useAuthStore();

    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [commentsLoading, setCommentsLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            setCommentsLoading(true);
            await getCurrentComments({ manwhaId: manwhaid });
            setCommentsLoading(false);
        };
        fetchComments();
    }, [manwhaid]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Sanitize input
        let cleanedComment = newComment.trim();

        // Remove HTML-like tags (e.g. <script>, <b>, etc.)
        cleanedComment = cleanedComment.replace(/<[^>]*>?/gm, '');

        if (!cleanedComment || cleanedComment.length > 200) return;

        try {
            setLoading(true);
            const res = await fetch(`/discussion/comment/${manwhaid}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: cleanedComment }),
            });

            if (res.ok) {
                setNewComment('');
                await getCurrentComments({ manwhaId: manwhaid });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full bg-gray-700/60 p-[15px] grid grid-cols-1 gap-4 relative rounded-lg min-h-[150px]'>

            {authUser && (
                <form onSubmit={handleSubmit} className="w-full mt-2 bg-gray-600 rounded-lg p-4 flex flex-col gap-3 shadow">
                    <textarea
                        className="textarea textarea-bordered w-full resize-none bg-gray-700 text-white"
                        placeholder="Write your comment..."
                        rows={3}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    ></textarea>
                    <button type="submit" disabled={loading || !newComment.trim()} className="btn bg-[#d7af57] self-end">
                        {loading ? 'Posting...' : 'Post Comment'}
                    </button>
                </form>
            )}

            {commentsLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
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
                ))
            ) : currentComment && currentComment.length === 0 ? (
                <div className="text-gray-300 text-center py-6 min-h-[50px] bg-gray-600 rounded-lg">No Comments</div>
            ) : (
                currentComment?.map((comment, index) => (
                    <div key={index} className="card w-full bg-gray-600 shadow-md">
                        <div className="card-body p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="w-10 rounded-full ring ring-[#d7af57] ring-offset-base-100 ring-offset-2">
                                            <img src={comment.commenterId.avatar} alt={comment.commenterId.username} />
                                        </div>
                                    </div>
                                    <h2 className="font-semibold text-lg">{comment.commenterId.username}</h2>
                                </div>
                                <span className="text-xs text-gray-400">
                                    {new Date(comment.createdAt).toLocaleString([], {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                    })}
                                </span>
                            </div>
                            <p className="text-sm text-gray-300">
                                {comment.text.length > 200 ? comment.text.slice(0, 200) + '...' : comment.text}
                            </p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default DiscussionArea;
