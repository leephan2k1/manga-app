import { KeyboardEvent, memo, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import { DotsHorizontalIcon } from '@heroicons/react/outline';

interface PageInputProps {
    totalPages: number;
    setCurrentPage: (page: number) => void;
}

function PageInput({ totalPages, setCurrentPage }: PageInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [showInput, setShowInput] = useState(false);

    const handleNavigatePage = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setCurrentPage(parseInt(e.currentTarget.value));
            setShowInput(false);
        }
    };

    useOnClickOutside(inputRef, () => setShowInput(false));

    if (showInput) {
        return (
            <input
                ref={inputRef}
                autoFocus
                className="h-14 w-20 rounded-lg border-[1px] border-white bg-transparent p-4"
                onKeyUp={handleNavigatePage}
                type={'number'}
                min={1}
                max={totalPages}
            />
        );
    } else {
        return (
            <button
                onClick={() => setShowInput(true)}
                className="rounded-lg p-4 hover:bg-highlight"
            >
                <DotsHorizontalIcon className="h-8 w-8" />
            </button>
        );
    }
}

export default memo(PageInput);
