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
    //Para sa DETAILS PAGE comments
    currentComment: Comment[] | null;
    getCurrentComments: ({ manwhaId }: { manwhaId: string }) => Promise<void>;

    //For Forums Page
    ForumComments: Comment[] | null;
    getLatestComment: () => Promise<void>

    suggestionComments: Comment[] | null;
    getSuggestionComments: () => Promise<void>
}

const useCommentStore = create<CommentStore>((set, get) => ({
    //Para sa DETAILS PAGE comments
    currentComment: null,
    getCurrentComments: async ({ manwhaId }) => {
        try {
            let res = await fetch(`/discussion/comment/${manwhaId}`)
            let data = await res.json()
            console.log(data)
            set({ currentComment: data })
        } catch (error) {
            console.log(error)
        }
    },


    //For Forums Page
    ForumComments: null,
    getLatestComment: async () => {
        try {
            let res = await fetch(`/discussion/comment/latestComment`)
            let data = await res.json()
            console.log(data)
            set({ ForumComments: data })
        } catch (error) {
            console.log(error)
        }
    },
    suggestionComments: null,
    getSuggestionComments: async () => {
        try {
            let res = await fetch(`/discussion/comment/suggestion`)
            let data = await res.json()
            console.log(data)
            set({ suggestionComments: data })
        } catch (error) {
            console.log(error)
        }
    }

}))

export default useCommentStore