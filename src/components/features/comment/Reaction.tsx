import { useSession } from 'next-auth/react';
import { memo, useState } from 'react';
import toast from 'react-hot-toast';
import { useToggle } from 'usehooks-ts';
import { axiosClientV2 } from '~/services/axiosClient';

interface ReactionProps {
    commentId: string;
    userId: string;
    reaction: { emoji: string; label: string };
    count: string[];
}

function Reaction({ count, reaction, commentId, userId }: ReactionProps) {
    const { status } = useSession();
    const [localCount, setLocalCount] = useState(count.length);
    const [value, toggle] = useToggle(count.some((id) => id === userId));

    const handleClickReaction = async () => {
        if (status === 'unauthenticated') {
            toast.error('Đăng nhập để thao tác bạn nhé!');
            return;
        }

        toggle();

        // true -> down
        // false -> up
        setLocalCount((prevState) => {
            return value ? --prevState : ++prevState;
        });

        try {
            const { data } = await axiosClientV2.post(
                `/comments/${commentId}/${userId}/reaction`,
                {
                    options: value ? 'down' : 'up',
                    reactionType: reaction.label,
                },
            );

            if (!data && data.status !== 'success') {
                throw new Error();
            }
        } catch (error) {
            // reverse state
            setLocalCount((prevState) => {
                return value ? ++prevState : --prevState;
            });

            toggle();
        }
    };

    return (
        <div className="absolute-center flex space-x-4">
            <button
                onClick={handleClickReaction}
                className="smooth-effect rounded-xl py-2 hover:bg-highlight md:px-4"
            >
                {reaction.emoji}
            </button>
            <span
                className={`${
                    value ? 'animate__slideInUp' : 'animate__slideInDown'
                }  animate__animated text-lg text-gray-400 md:text-xl`}
            >
                {Intl.NumberFormat('en', { notation: 'compact' }).format(
                    localCount,
                )}
            </span>
        </div>
    );
}

export default memo(Reaction);
