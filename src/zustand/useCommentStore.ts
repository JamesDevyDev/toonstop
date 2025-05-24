import { create } from 'zustand'


interface Comment {
    _id: string;
    manwhaId: string;
    text: string;
    commenterId: {
        _id: string;
        username: string;
        avatar: string;
    };
    createdAt: string;
    updatedAt: string;
}

interface CommentStore {
    currentComment: Comment[] | null;
    getComments: ({ manwhaId }: { manwhaId: string }) => Promise<void>;
}

const useCommentStore = create<CommentStore>((set, get) => ({
    currentComment: null,
    getComments: async ({ manwhaId }) => {
        try {
            let res = await fetch(`/discussion/comment/${manwhaId}`)
            let data = await res.json()
            console.log(data)
            set({ currentComment: data })
        } catch (error) {
            console.log(error)
        }
    }
}))

export default useCommentStore