import { memo, ReactNode, useRef } from 'react';
import { useToggle, useOnClickOutside } from 'usehooks-ts';

interface EmojiPickerProps {
    pickerIcon?: ReactNode;
    emojisToBeUsed: {
        emoji: string;
        label: string;
    }[];
    getEmoji: (emoji: string) => void;
}

function EmojiPicker({
    pickerIcon,
    emojisToBeUsed,
    getEmoji,
}: EmojiPickerProps) {
    const [value, toggle, setValue] = useToggle();
    const ref = useRef<HTMLButtonElement>(null);

    useOnClickOutside(ref, () => {
        setTimeout(() => {
            if (value) {
                setValue(false);
            }
        }, 100);
    });

    return (
        <>
            <button
                ref={ref}
                onClick={toggle}
                className="absolute-center h-fit w-fit p-4"
            >
                {pickerIcon}
            </button>
            {value && (
                <div
                    className={`${
                        value && 'animate__zoomIn'
                    } animate__animated animate__faster absolute -right-[50%] bottom-[100%] z-[200] grid h-[250px] w-[300px] grid-cols-5 gap-2 overflow-y-scroll rounded-2xl bg-deep-black py-4 md:right-0`}
                >
                    {emojisToBeUsed.map((emoji) => {
                        return (
                            <button
                                onClick={(e) => {
                                    getEmoji(
                                        String(e.currentTarget?.textContent),
                                    );
                                }}
                                className="smooth-effect absolute-center m-2 cursor-pointer rounded-3xl p-4 hover:bg-highlight"
                                key={emoji.label}
                            >
                                <span className="text-4xl">{emoji.emoji}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </>
    );
}

export default memo(EmojiPicker);
