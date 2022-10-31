import { EmojiPicker } from 'lepre';
import { FormEvent, memo, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { emojisToBeUsed } from '~/constants';
import { Checkbox } from 'ariakit/checkbox';

import { FaceSmileIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useOnClickOutside } from 'usehooks-ts';

interface CommentInputProps {
    containerStyles?: string;
}

function CommentInput({ containerStyles }: CommentInputProps) {
    const buttonEmoji = useRef<HTMLButtonElement | null>(null);
    const [text, setText] = useState('');

    /* I have to manual implement it bc
       lepre docs there is no way to click outside to disable the emoji menu:
       https://github.com/PandaSekh/lepre
    */
    useOnClickOutside(buttonEmoji, () => {
        const emoji = document.getElementsByClassName(
            'emoji-adder',
        )[0] as HTMLElement;

        const emojiMenu = document.querySelector('.emoji-menu-open');

        if (emoji && emojiMenu) {
            emoji.click();
        }
    });

    return (
        <div className={`${containerStyles} h-fit   border-red-500 p-2`}>
            <TextareaAutosize
                onInput={(e: FormEvent<HTMLTextAreaElement>) => {
                    setText(e.currentTarget.value);
                }}
                value={text}
                className="min-h-[100px] w-full resize-none overflow-hidden rounded-2xl bg-highlight p-4"
                maxLength={1000}
                placeholder="Để lại bình luận..."
            />

            <div className="my-2 flex items-center justify-between space-x-4">
                <label className="absolute-center space-x-4">
                    <Checkbox className="h-6 w-6" />{' '}
                    <span className="italic text-gray-400">
                        Có tiết lộ nội dung
                    </span>
                </label>

                <div>
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
                        disabled={text.replace(/\s/g, '') === ''}
                        className={`${
                            text.replace(/\s/g, '') === ''
                                ? 'bg-deep-black'
                                : 'bg-primary'
                        } smooth-effect h-fit w-fit rounded-2xl px-6 py-4 hover:scale-110`}
                    >
                        <PaperAirplaneIcon className="h-8 w-8" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default memo(CommentInput);
