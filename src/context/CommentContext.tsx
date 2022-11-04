import { createContext, ReactNode, useContext, useState } from 'react';
import { Comment } from '~/types';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { axiosClientV2 } from '~/services/axiosClient';

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
    comic: {
        comicSlug: string;
        comicName: string;
    };
}

const CommentContext = createContext<CommentContextType | null>(null);

export const CommentContextProvider = ({
    children,
    comic,
}: CommentContextProps) => {
    const [commentWillBeDeleted, setCommentWillBeDeleted] = useState<{
        userId: string;
        commentId: string;
    } | null>(null);
    const [page, setPage] = useState(1);
    const router = useRouter();
    const section = router.pathname.includes('details') ? 'details' : 'read';

    const { data: comments, mutate } = useSWR<Comment[]>(
        `${router.query?.slug}${setPage}`,
        async () => {
            const { data } = await axiosClientV2.get(`/comments`, {
                params: {
                    comicSlug: router.query?.slug,
                    section,
                    page,
                },
            });

            return data?.comments;
        },
    );

    const value = {
        comments,
        isFetching: !Array.isArray(comments),
        reFetch: () => {
            mutate();
        },
        comic,
        section,
        commentNeedToBeDeleted: commentWillBeDeleted,
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
