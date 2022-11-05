import { Checkbox, useCheckboxState } from 'ariakit/checkbox';
import { useSetAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import { FormEvent, memo, MouseEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { Else, If, Then } from 'react-if';
import TextareaAutosize from 'react-textarea-autosize';
import { useReadLocalStorage } from 'usehooks-ts';
import { commentSettingsModal } from '~/atoms/commentSettingsModal';
import LoadingIcon from '~/components/icons/LoadingIcon';
import { emojisToBeUsed } from '~/constants';
import useComment from '~/context/CommentContext';
import { axiosClientV2 } from '~/services/axiosClient';
import EmojiPicker from './EmojiPicker';

import {
    Cog6ToothIcon,
    FaceSmileIcon,
    PaperAirplaneIcon,
} from '@heroicons/react/24/outline';

interface CommentInputProps {
    containerStyles?: string;
    initialTextValue?: string;
    commentId?: string;
    replyTo?: string;
    replyToCommentId?: string;
    inputMode: 'new' | 'edit';
    submitType: 'create' | 'reply' | 'update';
    handleCancel?: () => void;
}

function CommentInput({
    containerStyles,
    initialTextValue = '',
    replyTo,
    commentId,
    inputMode,
    submitType,
    handleCancel,
}: CommentInputProps) {
    const comment = useComment();

    const { data: session } = useSession();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userId = session?.user?.id;

    const commentTextColor = useReadLocalStorage('commentTextColor');

    const [isSubmitting, setIsSubmitting] = useState(false);

    const setOpenCommentSettingsModal = useSetAtom(commentSettingsModal);

    const [text, setText] = useState(
        initialTextValue + `${replyTo ? `@${replyTo} ` : ''}`,
    );
    const checkbox = useCheckboxState();

    const handleGetSuggestion = (e: MouseEvent) => {
        const text = e.currentTarget?.textContent;
        setText((prevState) => prevState + ` ${text}`);
    };

    const handleClickSubmit = async (e: MouseEvent) => {
        const btnText = e.currentTarget?.textContent;

        if (btnText?.toLowerCase() === 'huỷ' && handleCancel) {
            handleCancel();
            return;
        }

        try {
            setIsSubmitting(true);

            if (submitType === 'create') {
                const { data } = await axiosClientV2.post(
                    `/comments/${userId}/create`,
                    {
                        comicSlug: comment?.comic.comicSlug,
                        comicName: comment?.comic.comicName,
                        section: comment?.section,
                        contents: text.trim(),
                        isSpoil: checkbox.value,
                    },
                );

                if (data && data.status === 'success') {
                    comment?.reFetch();
                    setText('');
                    setIsSubmitting(false);
                } else {
                    throw new Error();
                }
            }

            if (submitType === 'reply') {
                const { data } = await axiosClientV2.post(
                    `/comments/${userId}/reply`,
                    {
                        replyTo: commentId,
                        contents: text.trim(),
                        isSpoil: checkbox.value,
                    },
                );

                if (data && data.status === 'success') {
                    comment?.reFetch();
                    setIsSubmitting(false);
                } else {
                    throw new Error();
                }

                handleCancel && handleCancel();
            }

            if (submitType === 'update' && commentId) {
                const { data } = await axiosClientV2.patch(
                    `/comments/${commentId}/${userId}`,
                    {
                        contents: text.trim(),
                        isSpoil: checkbox.value,
                    },
                );
                setIsSubmitting(false);

                if (data && data.status === 'success') {
                    comment?.reFetch();
                    setIsSubmitting(false);
                } else {
                    throw new Error();
                }

                handleCancel && handleCancel();
            }
        } catch (error) {
            setIsSubmitting(false);
            toast.error('Oops! Thử lại sau nhé bạn :"(');
        }
    };

    return (
        <div
            style={{
                color: commentTextColor ? String(commentTextColor) : '#f9fafb',
            }}
            className={`${containerStyles} h-fit p-2`}
        >
            <TextareaAutosize
                onInput={(e: FormEvent<HTMLTextAreaElement>) => {
                    setText(e.currentTarget.value);
                }}
                value={text}
                className="min-h-[100px] w-full resize-none overflow-hidden rounded-2xl bg-highlight p-4"
                maxLength={1000}
                placeholder="Để lại bình luận..."
            />

            <div className="my-4 flex h-fit flex-wrap gap-4">
                <button
                    onClick={handleGetSuggestion}
                    className="rounded-2xl border border-gray-500 py-2 px-4 line-clamp-1"
                >
                    Lorem ipsum
                </button>
                <button
                    onClick={handleGetSuggestion}
                    className="rounded-2xl border border-gray-500 py-2 px-4 line-clamp-1"
                >
                    Lorem ipsum
                </button>
                <button
                    onClick={handleGetSuggestion}
                    className="rounded-2xl border border-gray-500 py-2 px-4 line-clamp-1"
                >
                    Lorem ipsum
                </button>
            </div>

            <div className="my-2 flex items-center justify-between space-x-4">
                <label className="absolute-center space-x-4">
                    <Checkbox state={checkbox} className="h-6 w-6"></Checkbox>
                    <span className="italic text-gray-400">Có spoil</span>
                </label>

                <div className="absolute-center">
                    <button
                        onClick={() => {
                            setOpenCommentSettingsModal(true);
                        }}
                        className="smooth-effect h-fit w-fit rounded-2xl bg-deep-black p-4 hover:scale-110 hover:bg-highlight"
                    >
                        <Cog6ToothIcon className="h-10 w-10" />
                    </button>

                    <div className="smooth-effect relative rounded-2xl hover:bg-highlight">
                        <EmojiPicker
                            getEmoji={(emoji: string) => {
                                setText((prevState) => prevState + `${emoji}`);
                            }}
                            emojisToBeUsed={emojisToBeUsed}
                            pickerIcon={<FaceSmileIcon className="h-10 w-10" />}
                        />
                    </div>

                    <If condition={isSubmitting}>
                        <Then>
                            <button
                                style={{
                                    backgroundColor: commentTextColor
                                        ? String(commentTextColor)
                                        : '#f9fafb',
                                }}
                                className="absolute-center rounded-2xl px-6 py-4"
                            >
                                <LoadingIcon />
                            </button>
                        </Then>

                        <Else>
                            <button
                                onClick={handleClickSubmit}
                                style={{
                                    backgroundColor:
                                        text.replace(/\s/g, '') === ''
                                            ? '#1a1a1a'
                                            : commentTextColor
                                            ? String(commentTextColor)
                                            : '#f9fafb',
                                }}
                                disabled={text.replace(/\s/g, '') === ''}
                                className={`smooth-effect h-fit w-fit rounded-2xl px-6 py-4 text-gray-600 hover:scale-110`}
                            >
                                <If condition={inputMode === 'new'}>
                                    <Then>
                                        <PaperAirplaneIcon className="h-8 w-8" />
                                    </Then>

                                    <Else>
                                        <If
                                            condition={
                                                text !== initialTextValue
                                            }
                                        >
                                            <Then>Cập nhật</Then>

                                            <Else>Huỷ</Else>
                                        </If>
                                    </Else>
                                </If>
                            </button>
                        </Else>
                    </If>
                </div>
            </div>
        </div>
    );
}

export default memo(CommentInput);
