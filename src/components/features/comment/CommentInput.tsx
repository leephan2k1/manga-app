import { Checkbox } from 'ariakit/checkbox';
import { EmojiPicker } from 'lepre';
import { FormEvent, memo, MouseEvent, useRef, useState } from 'react';
import { Else, If, Then } from 'react-if';
import TextareaAutosize from 'react-textarea-autosize';
import { emojisToBeUsed } from '~/constants';

import {
    Cog6ToothIcon,
    FaceSmileIcon,
    PaperAirplaneIcon,
} from '@heroicons/react/24/outline';

interface CommentInputProps {
    containerStyles?: string;
    initialTextValue?: string;
    inputMode: 'new' | 'edit';
    handleCancel?: () => void;
}

function CommentInput({
    containerStyles,
    initialTextValue = '',
    inputMode,
    handleCancel,
}: CommentInputProps) {
    const buttonEmoji = useRef<HTMLButtonElement | null>(null);
    const [text, setText] = useState(initialTextValue);

    const handleGetSuggestion = (e: MouseEvent) => {
        const text = e.currentTarget?.textContent;
        setText((prevState) => prevState + ` ${text}`);
    };

    const handleClickSubmit = (e: MouseEvent) => {
        const text = e.currentTarget?.textContent;

        if (text?.toLowerCase() === 'huỷ' && handleCancel) {
            handleCancel();
        }
    };

    return (
        <div className={`${containerStyles} h-fit p-2`}>
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
                    <Checkbox className="h-6 w-6" />{' '}
                    <span className="italic text-gray-400">
                        Tiết lộ nội dung
                    </span>
                </label>

                <div className="absolute-center">
                    <button className="smooth-effect h-fit w-fit rounded-2xl bg-deep-black p-4 hover:scale-110 hover:bg-highlight">
                        <Cog6ToothIcon className="h-10 w-10" />
                    </button>

                    <button
                        ref={buttonEmoji}
                        className="smooth-effect relative rounded-2xl p-2 hover:bg-highlight"
                    >
                        <EmojiPicker
                            selectedEmojis={[]}
                            availableEmojis={emojisToBeUsed}
                            pickerIcon={<FaceSmileIcon className="h-10 w-10" />}
                            onClick={(e) => {
                                setText(
                                    (prevState) => prevState + `${e.emoji}`,
                                );
                            }}
                        />
                    </button>

                    <button
                        onClick={handleClickSubmit}
                        disabled={text.replace(/\s/g, '') === ''}
                        className={`${
                            text.replace(/\s/g, '') === ''
                                ? 'bg-deep-black'
                                : 'bg-primary'
                        } smooth-effect h-fit w-fit rounded-2xl px-6 py-4 hover:scale-110`}
                    >
                        <If condition={inputMode === 'new'}>
                            <Then>
                                <PaperAirplaneIcon className="h-8 w-8" />
                            </Then>

                            <Else>
                                <If condition={text !== initialTextValue}>
                                    <Then>Cập nhật</Then>

                                    <Else>Huỷ</Else>
                                </If>
                            </Else>
                        </If>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default memo(CommentInput);
