import { useSetAtom } from 'jotai';
import { EmojiCounter, useEmojis } from 'lepre';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { memo, useState } from 'react';
import toast from 'react-hot-toast';
import { Case, If, Switch, Then, Else } from 'react-if';
import { useToggle } from 'usehooks-ts';
import { confirmModal } from '~/atoms/confirmModalAtom';
import { Comment as IComment } from '~/types';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { calculateDiffDate } from '~/utils/dateHandler';
import CommentOptions from './CommentOptions';
import useComment from '~/context/CommentContext';

const CommentInput = dynamic(
    () =>
        import('./CommentInput', {
            ssr: false,
        } as ImportCallOptions),
);

const MY_EMOJIS = [
    { emoji: '🤡', label: 'clown face', counter: 0 },
    { emoji: '❤', label: 'heart', counter: 0 },
    { emoji: '👍', label: 'thumbs up', counter: 0 },
    { emoji: '😡', label: 'enraged face', counter: 0 },
];

export type DisplayMode = 'edit' | 'remove' | 'show';

interface CommentProps {
    comment: IComment;
}

function Comment({ comment }: CommentProps) {
    const [value, toggle] = useToggle();

    const commentCtx = useComment();

    const [shouldHiddenContents, setShouldHiddenContents] = useState(
        !!comment?.isSpoil,
    );

    const { data: session, status } = useSession();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userId = session?.user?.id;

    const [animationParent] = useAutoAnimate<HTMLDivElement>();
    const [_, increment] = useEmojis(MY_EMOJIS);
    const [displayMode, setDisplayMode] = useState<DisplayMode>('show');

    const setShouldMountConfirmModal = useSetAtom(confirmModal);

    const handleSelectOptions = (value: DisplayMode) => {
        if (value !== 'remove') {
            setDisplayMode(value);
        } else {
            setShouldMountConfirmModal(true);
            // set comment location
            commentCtx?.setCommentWillBeDeleted &&
                commentCtx?.setCommentWillBeDeleted(userId, comment._id);
        }
    };

    return (
        <div id={comment._id} className="h-fit" ref={animationParent}>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <figure className="relative h-20 w-20 overflow-hidden rounded-full">
                        <Image
                            className="absolute inset-0"
                            layout="fill"
                            src={comment.owner.image}
                            alt="user-avatar"
                        />
                    </figure>
                    <h2>{comment.owner.name}</h2>
                    <span className="text-lg italic text-gray-500 md:text-xl">
                        <If condition={Boolean(comment.lastEdited)}>
                            <Then>
                                {`(Đã chỉnh sửa) ${calculateDiffDate(
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    comment.lastEdited,
                                )}`}
                            </Then>

                            <Else>{calculateDiffDate(comment.createdAt)}</Else>
                        </If>
                    </span>
                </div>

                <If
                    condition={
                        status === 'authenticated' &&
                        userId === comment.owner._id
                    }
                >
                    <Then>
                        <CommentOptions
                            handleSelectOptions={handleSelectOptions}
                        />
                    </Then>
                </If>
            </div>

            <Switch>
                <Case
                    condition={
                        displayMode === 'show' || displayMode === 'remove'
                    }
                >
                    <p
                        onClick={() => setShouldHiddenContents(false)}
                        className={`${shouldHiddenContents ? 'blur' : ''} my-4`}
                    >
                        {comment.contents}
                    </p>
                </Case>
                <Case condition={displayMode === 'edit'}>
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore  */}
                    <CommentInput
                        submitType="update"
                        handleCancel={() => {
                            setDisplayMode('show');
                        }}
                        inputMode="edit"
                        commentId={comment._id}
                        initialTextValue={comment.contents}
                    />
                </Case>
            </Switch>

            <div className="flex">
                <button
                    onClick={() => {
                        if (status !== 'authenticated') {
                            toast.error('Đăng nhập để tương tác bạn nhé!');
                            return;
                        }

                        toggle();
                    }}
                    className="smooth-effect rounded-xl bg-black py-4 px-5 hover:bg-highlight"
                >
                    <ArrowUturnLeftIcon className="h-8 w-8" />
                </button>

                {MY_EMOJIS.map((emoji) => {
                    return (
                        <EmojiCounter
                            key={emoji.label}
                            emoji={emoji}
                            initialValue={emoji.counter}
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            onClick={(emoji) => {
                                if (status !== 'authenticated') {
                                    toast.error(
                                        'Đăng nhập để tương tác bạn nhé!',
                                    );
                                    return;
                                }

                                increment(emoji);
                            }}
                        />
                    );
                })}
            </div>

            {value && (
                /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
                /* @ts-ignore  */
                <CommentInput
                    // anchor a original comment, avoid nested reply
                    commentId={comment.replyTo || comment._id}
                    replyTo={comment.owner.name}
                    handleCancel={toggle}
                    submitType="reply"
                    inputMode="new"
                />
            )}
        </div>
    );
}

export default memo(Comment);
