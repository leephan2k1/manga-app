import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useState } from 'react';
import useSWR from 'swr';
import { axiosClientV2 } from '~/services/axiosClient';
import { Comment } from '~/types';

interface CommentContextType {
    comments?: Comment[];
    reFetch: () => void;
    isFetching: boolean;
    comic: {
        comicSlug: string;
        comicName: string;
    };
    section: string;
    commentNeedToBeDeleted: {
        userId: string;
        commentId: string;
    } | null;
    setCommentWillBeDeleted?: (userId: string, commentId: string) => void;
}

interface CommentContextProps {
    children: ReactNode;
    shouldFetch?: boolean;
    comic: {
        comicSlug: string;
        comicName: string;
    };
}

const CommentContext = createContext<CommentContextType | null>(null);

export const CommentContextProvider = ({
    children,
    shouldFetch,
    comic,
}: CommentContextProps) => {
    const [commentWillBeDeleted, setCommentWillBeDeleted] = useState<{
        userId: string;
        commentId: string;
    } | null>(null);
    // const [page, setPage] = useState(1);
    const router = useRouter();
    const section = router.pathname.includes('details') ? 'details' : 'read';

    const { data: comments, mutate } = useSWR<Comment[]>(
        shouldFetch ? `${router.query?.slug}_comments_` : null,
        async () => {
            const { data } = await axiosClientV2.get(`/comments`, {
                params: {
                    comicSlug: router.query?.slug,
                    section,
                    limit: 0,
                },
            });

            return data?.comments;
        },
    );

    const value = {
        comments,
        isFetching: !Array.isArray(comments),
        comic,
        section,
        commentNeedToBeDeleted: commentWillBeDeleted,
        reFetch: () => {
            mutate();
        },
        setCommentWillBeDeleted: (userId: string, commentId: string) => {
            setCommentWillBeDeleted({ userId, commentId });
        },
    };

    return (
        <CommentContext.Provider value={value}>
            {children}
        </CommentContext.Provider>
    );
};

export default function useComment() {
    return useContext(CommentContext);
}
