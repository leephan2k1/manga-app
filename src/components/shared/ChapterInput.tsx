import classNames from 'classnames';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

import { ChevronRightIcon } from '@heroicons/react/outline';

interface ChapterInputProps {
    style?: string;
    handleChangeNumber?: (n: string) => void;
}

export default function ChapterInput({
    style,
    handleChangeNumber,
}: ChapterInputProps) {
    const router = useRouter();
    const [selectValue, setSelectValue] = useState('');
    const debouncedValue = useDebounce<string>(selectValue, 500);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectValue(e.currentTarget.value);
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (handleChangeNumber) handleChangeNumber(debouncedValue);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        setSelectValue('');
    }, [router.asPath]);

    return (
        <div className={classNames(style)}>
            <input
                placeholder="Đi đến chương..."
                type="number"
                min={0}
                className="w-full bg-transparent p-2 transition-all"
                onChange={handleSearch}
                value={selectValue}
            />
            <button className="transition-all hover:text-primary">
                <ChevronRightIcon className="h-8 w-8" />
            </button>
        </div>
    );
}
