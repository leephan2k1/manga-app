import { memo, useState, useEffect } from 'react';
import {
    ArrowSmallDownIcon,
    ArrowSmallUpIcon,
} from '@heroicons/react/24/outline';
import useSWR from 'swr';
import { axiosClientV2 } from '~/services/axiosClient';
import { Comic } from '~/types';
import { useSession } from 'next-auth/react';
import { useCountdown } from 'usehooks-ts';
import toast from 'react-hot-toast';

interface VoteProps {
    comicName: string;
    comicSlug: string;
}

const toastOptions = { duration: 3000, style: { zIndex: 899 } };

function Vote({ comicName, comicSlug }: VoteProps) {
    const [voted, setVoted] = useState(false);
    const { data: session, status } = useSession();
    const [voteNumber, setVoteNumber] = useState(0);

    const [count, { startCountdown, stopCountdown, resetCountdown }] =
        useCountdown({
            countStart: 3,
            intervalMs: 1000,
        });

    const { data: comicInfo } = useSWR<Comic>(
        `/comics/${comicSlug}/info`,
        async (slug) => {
            const { data } = await axiosClientV2.get(slug);

            return data?.comic;
        },
    );

    useEffect(() => {
        startCountdown();

        if (!Array.isArray(comicInfo?.votes)) {
            return;
        }

        if (comicInfo?.votes?.length) {
            setVoteNumber(comicInfo?.votes?.length);
        }

        if (status === 'authenticated') {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            const userId = session?.user?.id;

            if (comicInfo?.votes.find((e) => e === userId)) {
                setVoted(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [comicInfo, status]);

    const handleUpVote = async () => {
        if (status === 'unauthenticated') {
            toast.error('Đăng nhập để bình chọn bạn nhé!', toastOptions);
            return;
        }

        if (count !== 0) {
            toast(`Đợi ${count}s và thử lại nhé!`, {
                icon: '🤪',
            });

            resetCountdown();
            startCountdown();

            return;
        }

        setVoted(true);
        setVoteNumber((prevState) => ++prevState);

        toast.success('Bình chọn thành công!', toastOptions);

        resetCountdown();
        startCountdown();

        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            const userId = session?.user?.id;

            if (!userId) throw new Error('User id not found');

            if (!comicName) throw new Error('Comic name not found');

            await axiosClientV2.post(`/comics/upvote`, {
                userId,
                comicName,
            });
        } catch (error) {
            console.error(error);

            toast.error('Lỗi! hãy thử lại sau!', toastOptions);

            stopCountdown();

            setVoted(false);

            setVoteNumber((prevState) => --prevState);
        }
    };

    const handleDownVote = async () => {
        //fallback
        if (status === 'unauthenticated') {
            toast.error('Đăng nhập để bình chọn bạn nhé!', toastOptions);
            return;
        }

        if (count !== 0) {
            toast(`Đợi ${count}s và thử lại nhé!`, {
                icon: '🤪',
            });

            resetCountdown();
            startCountdown();

            return;
        }

        setVoted(false);
        setVoteNumber((prevState) => --prevState);

        toast.success('Đã huỷ bình chọn!', toastOptions);

        resetCountdown();
        startCountdown();

        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            const userId = session?.user?.id;

            if (!userId) throw new Error('User id not found');

            if (!comicName) throw new Error('Comic name not found');

            await axiosClientV2.delete(`/comics/downvote`, {
                data: {
                    userId,
                    comicName,
                },
            });
        } catch (error) {
            console.error(error);

            toast.error('Lỗi! hãy thử lại sau!', toastOptions);

            stopCountdown();

            setVoted(true);

            setVoteNumber((prevState) => ++prevState);
        }
    };

    return (
        <div className="my-4 flex w-full items-center justify-center text-white md:justify-start">
            {comicInfo ? (
                <button
                    onClick={voted ? handleDownVote : handleUpVote}
                    className={`absolute-center h-3/4 w-48 space-x-2 rounded-2xl border-2 ${
                        voted ? 'border-primary' : 'border-white'
                    } px-4 py-3 transition-all duration-300 hover:scale-[90%] md:w-52`}
                >
                    <span>{voteNumber}</span>

                    {voted ? (
                        <ArrowSmallDownIcon className="animate__animated animate__rotateIn h-8 w-8" />
                    ) : (
                        <ArrowSmallUpIcon className="animate__animated animate__rotateIn h-8 w-8" />
                    )}
                </button>
            ) : (
                <button className="absolute-center loading-pulse h-20 w-52 space-x-2 rounded-2xl bg-white/20 p-4"></button>
            )}
        </div>
    );
}

export default memo(Vote);
