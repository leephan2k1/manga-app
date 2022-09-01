import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ComponentType, memo, useEffect, useRef, useState } from 'react';
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';
import { useRecoilValue } from 'recoil';
import { animateFill, followCursor } from 'tippy.js';
import { mangaSources } from '~/atoms/mangaSourcesAtom';
import { mangaSrc } from '~/atoms/mangaSrcAtom';
import { MANGA_PATH_NAME, MANGA_PATH_READ_NAME } from '~/constants';
import { Chapter, ChapterDetails } from '~/types';

import styled from '@emotion/styled';
import { BookOpenIcon, DocumentTextIcon } from '@heroicons/react/24/solid';

import ChapterButton from '../buttons/ChapterButton';
import ChapterInput from './ChapterInput';
import LazyTippy from './LazyTippy';

const ListBox = dynamic(() => import('../buttons/ListBoxButton'));

interface DetailsChapterListProps {
    mobileUI?: boolean;
    chapterList: Chapter[];
    chapterInfo?: ChapterDetails;
    containerStyle: string;
    selectSource: boolean;
    mobileHeight: number;
    maxWTitleMobile: number;
    highlightCurrentChapter?: boolean;
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
    //ui
    mobileUI,
    mobileHeight,
    maxWTitleMobile,
    selectSource,
    containerStyle,
    highlightCurrentChapter,
    //data
    chapterList,
    chapterInfo,
}: DetailsChapterListProps) {
    const router = useRouter();
    const virtuoso = useRef(null);
    const { params } = router.query;
    const src = useRecoilValue(mangaSrc);
    const availableSource = useRecoilValue(mangaSources);
    const [list, setList] = useState<Chapter[]>(chapterList);

    useEffect(() => {
        setList(chapterList);
    }, [chapterList]);

    useEffect(() => {
        if (highlightCurrentChapter) {
            const paramIndex = params && params[1];
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            virtuoso.current?.scrollToIndex({
                index: list.findIndex((e) => e.chapterNumber === paramIndex),
                align: 'center',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, chapterList, list]);

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
                        defaultSelected={(params?.length && params[0]) || 'NTC'}
                        listDropDown={availableSource.map((item) => ({
                            title: item.sourceName,
                            id: item.sourceId,
                        }))}
                    />
                )}
            </div>

            {/* chapter list  */}
            {
                list.length && chapterInfo && (
                    <>
                        {list && list.length > 0 && mobileUI ? (
                            <Virtuoso
                                ref={virtuoso}
                                style={{ height: `${mobileHeight}px` }}
                                totalCount={list.length}
                                itemContent={(index) => (
                                    <div className="animate__fadeIn animate__animated m-2 overflow-hidden text-white">
                                        <ChapterButton
                                            style="h-full w-full"
                                            path={`/${MANGA_PATH_NAME}/${MANGA_PATH_READ_NAME}/${src}/${list[index].chapterNumber}/${list[index].chapterSlug}`}
                                            payload={{
                                                chapterSlug: String(
                                                    list[index]?.chapterSlug,
                                                ),
                                                comicName:
                                                    chapterInfo.comicName,
                                                comicSlug:
                                                    chapterInfo.comicSlug,
                                                source: src,
                                            }}
                                        >
                                            <div
                                                className={`${
                                                    highlightCurrentChapter &&
                                                    params &&
                                                    params[1] ===
                                                        list[index]
                                                            .chapterNumber
                                                        ? 'bg-primary'
                                                        : 'bg-deep-black'
                                                } flex h-[30px] items-center justify-between rounded-lg`}
                                            >
                                                <div className="flex w-[30%] min-w-max items-center">
                                                    <DocumentTextIcon className="mx-4 h-4 w-4" />

                                                    <span
                                                        className={classNames(
                                                            `inline-block  overflow-hidden text-left text-lg font-bold line-clamp-1 hover:text-white`,
                                                            `max-w-[${maxWTitleMobile}px]`,
                                                        )}
                                                    >
                                                        {
                                                            list[index]
                                                                ?.chapterTitle
                                                        }
                                                    </span>
                                                </div>
                                                <div className="flex items-center px-4">
                                                    <span className="whitespace-nowrap text-lg font-extralight text-gray-300">
                                                        {list[index]?.updatedAt}
                                                    </span>
                                                </div>
                                            </div>
                                        </ChapterButton>
                                    </div>
                                )}
                            />
                        ) : (
                            <>
                                {list && list.length > 0 && (
                                    <VirtuosoGrid
                                        style={{
                                            height: `${
                                                chapterList.length > 50
                                                    ? '750px'
                                                    : '450px'
                                            }`,
                                        }}
                                        totalCount={list.length}
                                        components={{
                                            List: ListContainer as ComponentType,
                                            Item: ItemContainer,
                                        }}
                                        overscan={50}
                                        itemContent={(index) => (
                                            <div
                                                key={list[index]._id || index}
                                                className="h-ful  animate__fadeIn animate__animated w-full text-white"
                                            >
                                                <ChapterButton
                                                    style="h-full w-full"
                                                    path={`/${MANGA_PATH_NAME}/${MANGA_PATH_READ_NAME}/${src}/${list[index].chapterNumber}/${list[index].chapterSlug}`}
                                                    payload={{
                                                        chapterSlug: String(
                                                            list[index]
                                                                ?.chapterSlug,
                                                        ),
                                                        comicName:
                                                            chapterInfo.comicName,
                                                        comicSlug:
                                                            chapterInfo.comicSlug,
                                                        source: src,
                                                    }}
                                                >
                                                    <LazyTippy
                                                        content={
                                                            list[index]
                                                                .chapterTitle
                                                        }
                                                        animation={'scale'}
                                                        interactiveBorder={20}
                                                        followCursor={true}
                                                        animateFill={true}
                                                        plugins={[
                                                            followCursor,
                                                            animateFill,
                                                        ]}
                                                    >
                                                        <div
                                                            className={`bubble-top-left-to-bottom-right
                                                           flex h-[30px] items-center justify-between rounded-lg bg-deep-black  md:h-[100px] md:flex-col md:items-start md:justify-center md:space-y-4`}
                                                        >
                                                            <div className="flex w-[30%] min-w-max items-center   md:justify-between md:px-4">
                                                                <span className="max-w-[200px] text-left text-lg font-bold line-clamp-1 hover:text-white md:max-w-[140px] md:text-xl  lg:max-w-[160px] lg:text-2xl">
                                                                    {
                                                                        list[
                                                                            index
                                                                        ]
                                                                            .chapterTitle
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center px-4 md:w-full md:justify-between">
                                                                <span className="text-lg font-extralight text-gray-300 md:text-2xl">
                                                                    {
                                                                        list[
                                                                            index
                                                                        ]
                                                                            .updatedAt
                                                                    }
                                                                </span>
                                                                <BookOpenIcon className="lg:min-w-14 md:h-10 md:w-10 lg:h-10 lg:w-14" />
                                                            </div>
                                                        </div>
                                                    </LazyTippy>
                                                </ChapterButton>
                                            </div>
                                        )}
                                    />
                                )}
                            </>
                        )}
                    </>
                )

                // : (
                //     <div className="absolute-center w-full py-6">
                //         <div className="dot-pulse"></div>
                //     </div>
                // )
            }
        </div>
    );
}

export default memo(DetailsChapterList);
