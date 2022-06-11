import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { MANGA_RESOURCE } from '~/constants';

import { ChevronRightIcon } from '@heroicons/react/outline';

interface ChapterInputProps {
    inputType: 'number' | 'select';
    style?: string;
    handleChangeNumber?: (n: string) => void;
}

const ListBoxButton = dynamic(() => import('../buttons/ListBoxButton'));

export default function ChapterInput({
    style,
    inputType,
    handleChangeNumber,
}: ChapterInputProps) {
    const router = useRouter();
    const [selectValue, setSelectValue] = useState('');
    const debouncedValue = useDebounce<string>(selectValue, 500);

    if (inputType === 'select')
        return (
            <ListBoxButton
                title="Nguồn:"
                listDropDown={MANGA_RESOURCE.map((item) => ({
                    title: item.sourceName,
                    id: item.sourceId,
                }))}
            />
        );

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
