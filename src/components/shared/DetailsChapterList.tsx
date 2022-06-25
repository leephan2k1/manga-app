import 'tippy.js/dist/tippy.css';

import classNames from 'classnames';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ComponentType, memo, useEffect, useState } from 'react';
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';
import { animateFill, followCursor } from 'tippy.js';
import { MANGA_PATH_NAME, MANGA_PATH_READ_NAME } from '~/constants';
import { Chapter } from '~/types';

import styled from '@emotion/styled';
import { BookOpenIcon, DocumentTextIcon } from '@heroicons/react/solid';

import ChapterInput from './ChapterInput';
import LazyTippy from './LazyTippy';
import { MANGA_RESOURCE } from '~/constants';

const ListBox = dynamic(() => import('../buttons/ListBoxButton'));

interface DetailsChapterListProps {
    mobileUI?: boolean;
    chapterList: Chapter[];
    comicSlug: string;
    containerStyle: string;
    selectSource: boolean;
    mobileHeight: number;
    maxWTitleMobile: number;
}

const ListContainer = styled.div`
    display: grid;
    scroll-behavior: smooth;
    scroll-snap-type: y mandatory;
    height: fit;
    @media (min-width: 768px) {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    @media (min-width: 1024px) {
        grid-template-columns: repeat(7, minmax(0, 1fr));
    }
`;

const ItemContainer = styled.div`
    padding: 0.5rem;
    width: full;
    height: full;
`;

function DetailsChapterList({
    mobileUI,
    mobileHeight,
    maxWTitleMobile,
    comicSlug,
    selectSource,
    chapterList,
    containerStyle,
}: DetailsChapterListProps) {
    const [list, setList] = useState<Chapter[]>(chapterList);

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
        <div className={containerStyle}>
            {/* chapter controls  */}
            <div className="z-40 my-4 flex min-h-[40px] w-full items-center gap-4 text-white md:my-2">
                <ChapterInput
                    handleChangeNumber={filterChapterNumber}
                    style={`${
                        selectSource
                            ? 'mx-4 flex h-[32px] w-[50%] items-center justify-center rounded-xl bg-[#5f5f5f] px-2 hover:bg-white/25 md:w-[30%] lg:w-[20%]'
                            : 'flex w-full h-[32px] bg-[#5f5f5f] px-2 mx-4 rounded-xl'
                    }`}
                />
                {selectSource && (
                    <ListBox
                        title="Nguồn:"
                        listDropDown={MANGA_RESOURCE.map((item) => ({
                            title: item.sourceName,
                            id: item.sourceId,
                        }))}
                    />
                )}
            </div>

            {/* chapter list  */}
            {list && list.length > 0 && mobileUI ? (
                <Virtuoso
                    style={{ height: `${mobileHeight}px` }}
                    totalCount={list.length}
                    itemContent={(index) => (
                        <div className="animate__fadeIn animate__animated m-2 overflow-hidden text-white">
                            <button className="h-full w-full">
                                <Link
                                    href={`/${MANGA_PATH_NAME}/${MANGA_PATH_READ_NAME}/${comicSlug}/${list[index].chapterNumber}/${list[index].chapterId}`}
                                >
                                    <a
                                        className={`flex h-[30px] items-center justify-between rounded-lg bg-deep-black`}
                                    >
                                        <div className="flex w-[30%] min-w-max items-center">
                                            <DocumentTextIcon className="mx-4 h-4 w-4" />

                                            <span
                                                className={classNames(
                                                    `inline-block  overflow-hidden text-left text-lg font-bold line-clamp-1 hover:text-white`,
                                                    `max-w-[${maxWTitleMobile}px]`,
                                                )}
                                            >
                                                {list[index]?.chapterTitle}
                                            </span>
                                        </div>
                                        <div className="flex items-center px-4">
                                            <span className="whitespace-nowrap text-lg font-extralight text-gray-300">
                                                {list[index]?.updatedAt}
                                            </span>
                                        </div>
                                    </a>
                                </Link>
                            </button>
                        </div>
                    )}
                />
            ) : (
                <>
                    {list && list.length > 0 && (
                        <VirtuosoGrid
                            style={{ height: '750px' }}
                            totalCount={list.length}
                            components={{
                                List: ListContainer as ComponentType,
                                Item: ItemContainer,
                            }}
                            overscan={50}
                            itemContent={(index) => (
                                <div
                                    key={list[index].chapterId || index}
                                    className="h-ful  animate__fadeIn animate__animated w-full text-white"
                                >
                                    <LazyTippy
                                        content={list[index].chapterTitle}
                                        interactiveBorder={20}
                                        followCursor={true}
                                        animateFill={true}
                                        plugins={[followCursor, animateFill]}
                                    >
                                        <button className="h-full w-full">
                                            <Link
                                                href={`/${MANGA_PATH_NAME}/${MANGA_PATH_READ_NAME}/${comicSlug}/${list[index].chapterNumber}/${list[index].chapterId}`}
                                            >
                                                <a
                                                    className={`bubble-top-left-to-bottom-right
                                                           flex h-[30px] items-center justify-between rounded-lg bg-deep-black  md:h-[100px] md:flex-col md:items-start md:justify-center md:space-y-4`}
                                                >
                                                    <div className="flex w-[30%] min-w-max items-center   md:justify-between md:px-4">
                                                        <span className="max-w-[200px] text-left text-lg font-bold line-clamp-1 hover:text-white md:max-w-[140px] md:text-xl  lg:max-w-[160px] lg:text-2xl">
                                                            {
                                                                list[index]
                                                                    .chapterTitle
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center px-4 md:w-full md:justify-between">
                                                        <span className="text-lg font-extralight text-gray-300 md:text-2xl">
                                                            {
                                                                list[index]
                                                                    .updatedAt
                                                            }
                                                        </span>
                                                        <BookOpenIcon className="lg:min-w-14 md:h-10 md:w-10 lg:h-10 lg:w-14" />
                                                    </div>
                                                </a>
                                            </Link>
                                        </button>
                                    </LazyTippy>
                                </div>
                            )}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default memo(DetailsChapterList);
