import Link from 'next/link';
import { ChapterList } from '~/types';
import { memo } from 'react';

import { BookOpenIcon, DocumentTextIcon } from '@heroicons/react/solid';

import ChapterInput from './ChapterInput';

interface DetailsChapterListProps {
    mobileUI?: boolean;
    chapterList: ChapterList[];
}

function DetailsChapterList({
    mobileUI,
    chapterList,
}: DetailsChapterListProps) {
    // const matchesMobile = useMediaQuery('(max-width: 768px)');

    return (
        <div className="my-6 flex h-[500px] w-full flex-col overflow-x-hidden rounded-xl bg-hight-light md:h-fit md:overflow-hidden">
            {/* chapter controls  */}
            <div className="z-40 my-4 flex  h-[60px] w-full items-center gap-4 text-white md:my-2">
                <ChapterInput
                    inputType="number"
                    style="mx-4 flex h-[32px] w-[50%] items-center justify-center rounded-xl bg-[#5f5f5f] px-2 hover:bg-white/25 md:w-[30%] lg:w-[20%]"
                />
                <ChapterInput inputType="select" />
            </div>

            {/* chapter list  */}
            <ul className="z-0 my-4 flex w-full flex-col  gap-2 overflow-x-hidden px-4 text-white md:grid md:grid-cols-4  lg:grid-cols-7">
                {chapterList &&
                    chapterList.map((chapter, idx) => {
                        return (
                            <li key={chapter.chapterId || idx}>
                                <Link href="">
                                    <a
                                        className={`${
                                            !mobileUI &&
                                            'bubble-top-left-to-bottom-right'
                                        }  flex h-[30px] items-center justify-between rounded-lg bg-deep-black  md:h-[100px] md:flex-col md:items-start md:justify-center md:space-y-4`}
                                    >
                                        <div className="flex w-[30%] min-w-max items-center md:w-full md:flex-row-reverse md:justify-between md:px-4">
                                            {mobileUI ? (
                                                <DocumentTextIcon className="mx-4 h-4 w-4" />
                                            ) : (
                                                <BookOpenIcon className="mx-4 md:h-10 md:w-10 lg:h-10 lg:w-14" />
                                            )}
                                            <span className="text-lg font-bold line-clamp-1 hover:text-white md:max-w-[100px] md:text-2xl">
                                                {chapter.chapterTitle}
                                            </span>
                                        </div>
                                        <div className="flex items-center px-4 md:w-full">
                                            <span className="text-lg font-extralight text-gray-300 md:text-2xl">
                                                {chapter.updatedAt}
                                            </span>
                                        </div>
                                    </a>
                                </Link>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}

export default memo(DetailsChapterList);
