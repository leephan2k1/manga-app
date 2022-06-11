import 'tippy.js/dist/tippy.css';

import Link from 'next/link';
import { memo, useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { animateFill, followCursor } from 'tippy.js';
import { ChapterList } from '~/types';

import { BookOpenIcon, DocumentTextIcon } from '@heroicons/react/solid';

import ChapterInput from './ChapterInput';
import { LazyTippy } from './LazyTippy';

interface DetailsChapterListProps {
    mobileUI?: boolean;
    chapterList: ChapterList[];
}

function DetailsChapterList({
    mobileUI,
    chapterList,
}: DetailsChapterListProps) {
    const [list, setList] = useState<ChapterList[]>(chapterList);

    useEffect(() => {
        setList(chapterList);
    }, [chapterList]);

    const filterChapterNumber = (chapterN: string) => {
        if (!chapterN) {
            setList(chapterList);
            return;
        }

        setList(() => {
            const arr = chapterList.filter((chapter) =>
                chapter.chapterTitle.includes(String(chapterN)),
            );
            return arr.reverse();
        });
    };

    return (
        <div className="my-6 flex h-fit w-full flex-col overflow-x-hidden rounded-xl bg-highlight">
            {/* chapter controls  */}
            <div className="z-40 my-4 flex min-h-[40px] w-full items-center gap-4 text-white md:my-2">
                <ChapterInput
                    handleChangeNumber={filterChapterNumber}
                    inputType="number"
                    style="mx-4 flex h-[32px] w-[50%] items-center justify-center rounded-xl bg-[#5f5f5f] px-2 hover:bg-white/25 md:w-[30%] lg:w-[20%]"
                />
                <ChapterInput inputType="select" />
            </div>

            {/* chapter list  */}
            <ul className="z-0 my-4 flex  h-[500px] w-full flex-col  gap-2  overflow-y-scroll px-4 text-white  md:grid md:h-fit md:grid-cols-4  md:overflow-y-hidden lg:grid-cols-7">
                {list &&
                    list.length &&
                    list.map((chapter, idx) => {
                        return (
                            <LazyLoad
                                key={chapter.chapterId || idx}
                                overflow={mobileUI}
                                once
                            >
                                <li className="animate__fadeIn animate__animated">
                                    <LazyTippy
                                        disabled={mobileUI}
                                        content={chapter.chapterTitle}
                                        interactiveBorder={20}
                                        followCursor={true}
                                        animateFill={true}
                                        plugins={[followCursor, animateFill]}
                                    >
                                        <button className="h-full w-full">
                                            <Link href="/">
                                                <a
                                                    className={`${
                                                        !mobileUI &&
                                                        'bubble-top-left-to-bottom-right'
                                                    }  flex h-[30px] items-center justify-between rounded-lg bg-deep-black  md:h-[100px] md:flex-col md:items-start md:justify-center md:space-y-4`}
                                                >
                                                    <div className="flex w-[30%] min-w-max items-center    md:justify-between md:px-4">
                                                        {mobileUI && (
                                                            <DocumentTextIcon className="mx-4 h-4 w-4" />
                                                        )}
                                                        <span className="max-w-[200px] text-lg font-bold line-clamp-1 hover:text-white md:max-w-[140px] md:text-xl  lg:max-w-[160px] lg:text-2xl">
                                                            {
                                                                chapter.chapterTitle
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center px-4 md:w-full md:justify-between">
                                                        <span className="text-lg font-extralight text-gray-300 md:text-2xl">
                                                            {chapter.updatedAt}
                                                        </span>
                                                        {!mobileUI && (
                                                            <BookOpenIcon className="lg:min-w-14 md:h-10 md:w-10 lg:h-10 lg:w-14" />
                                                        )}
                                                    </div>
                                                </a>
                                            </Link>
                                        </button>
                                    </LazyTippy>
                                </li>
                            </LazyLoad>
                        );
                    })}
            </ul>
        </div>
    );
}

export default memo(DetailsChapterList);
