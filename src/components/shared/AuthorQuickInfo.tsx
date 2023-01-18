import { memo, useEffect, useState } from 'react';
import Image from 'next/image';
import { Author } from '~/types';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import toast from 'react-hot-toast';

interface AuthorQuickInfoProps {
    author: Author;
}

function AuthorQuickInfo({ author }: AuthorQuickInfoProps) {
    const { data: session, status } = useSession();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userId = session?.user.id;
    const [followState, setFollowState] = useState<Author | undefined>(
        undefined,
    );

    const { data: authorsFollowing } = useSWR<Author[]>(
        `/api/users/followAuthor?userId=${userId}`,
        async (slug) => {
            const { authors } = await (await axios.get(slug)).data;

            return authors;
        },
    );

    useEffect(() => {
        setFollowState(
            authorsFollowing?.find((authorF) => authorF?.name === author?.name),
        );
    }, [authorsFollowing, author]);

    const handleFollowAuthor = async () => {
        try {
            if (!author?.name || !userId) {
                throw new Error();
            }

            if (followState) {
                await axios.delete('/api/users/followAuthor', {
                    data: {
                        authorName: author.name,
                        userId,
                    },
                });

                setFollowState(undefined);
                toast.success('Ngừng theo dõi thành công');
            } else {
                await axios.post('/api/users/followAuthor', {
                    authorName: author.name,
                    userId,
                });

                setFollowState(author);
                toast.success('Theo dõi thành công');
            }
        } catch (error) {
            toast.error('Oops! Lỗi rồi :( thử lại bạn nhé!');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center space-y-6">
            <figure className="relative h-[10rem] w-[10rem] overflow-hidden rounded-full md:h-[15rem] md:w-[15rem]">
                <Image
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    alt="author-avatar"
                    layout="fill"
                    priority
                    src={
                        author?.avatar
                            ? author.avatar
                            : 'https://i.ibb.co/1qQJr6S/blank-user.png'
                    }
                />
            </figure>
            <h1 className="text-center font-secondary text-4xl font-bold md:text-5xl">
                {author?.name}
            </h1>

            <button
                onClick={handleFollowAuthor}
                disabled={
                    status === 'unauthenticated' ||
                    status === 'loading' ||
                    !author
                }
                className="smooth-effect w-[20rem] rounded-xl bg-primary py-4 hover:bg-primary/70"
            >
                {followState ? 'Ngừng theo dõi' : 'Theo dõi'}
            </button>
        </div>
    );
}

export default memo(AuthorQuickInfo);
