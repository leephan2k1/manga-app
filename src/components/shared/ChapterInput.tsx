import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { MANGA_RESOURCE } from '~/constants';

import { ChevronRightIcon } from '@heroicons/react/outline';

interface ChapterInputProps {
    inputType: 'number' | 'select';
    style?: string;
}

const ListBoxButton = dynamic(() => import('../buttons/ListBoxButton'));

export default function ChapterInput({ style, inputType }: ChapterInputProps) {
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

    return (
        <div className={classNames(style)}>
            <input
                placeholder="Đi đến chương..."
                type="number"
                min={0}
                className="w-full bg-transparent p-2 transition-all "
            />
            <button className="transition-all hover:text-primary">
                <ChevronRightIcon className="h-8 w-8" />
            </button>
        </div>
    );
}
