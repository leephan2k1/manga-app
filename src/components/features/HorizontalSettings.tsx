import { useRouter } from 'next/router';
import { MouseEvent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { chapterList } from '~/atoms/chapterListAtom';
import { chapterModal } from '~/atoms/chapterModalAtom';
import { settingsModal } from '~/atoms/settingsModalAtom';
import { MANGA_PATH_DETAILS_NAME, MANGA_PATH_NAME } from '~/constants';
import useReading from '~/context/ReadingContext';
import { NavigateDirection } from '~/types';

import {
    ArrowLeftIcon,
    ArrowNarrowLeftIcon,
    ArrowRightIcon,
    CogIcon,
} from '@heroicons/react/outline';

import ListBox from '../shared/ListBox';

export default function HorizontalSettings() {
    const [_, setShowModal] = useRecoilState(chapterModal);
    const [__, setSettingsModal] = useRecoilState(settingsModal);
    const manga = useRecoilValue(chapterList);
    const read = useReading();

    const router = useRouter();

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleOpenSettingsModal = () => {
        setSettingsModal(true);
    };

    const handleNavigateChapter = (e: MouseEvent<HTMLButtonElement>) => {
        read?.navigateChapter(e.currentTarget.dataset.id as NavigateDirection);
    };

    return (
        <div className="slideUpReturn magictime fixed top-0 left-0 z-[999] h-[60px] w-full bg-[#141313]">
            <div className="flex h-full w-full items-center justify-between text-lg md:text-2xl">
                <div className="flex h-full w-fit items-center gap-4 px-4 md:space-x-4">
                    <button
                        onClick={() =>
                            router.push(
                                `/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${
                                    (router.query.params &&
                                        router.query.params[0]) ||
                                    ''
                                }`,
                            )
                        }
                    >
                        <ArrowNarrowLeftIcon className="h-8 w-8" />
                    </button>

                    <h1 className="fond-bold h-fit w-[20%]  capitalize line-clamp-1 md:w-[25%] ">
                        {manga.title}
                    </h1>

                    <button
                        onClick={handleOpenModal}
                        className="h-[60%] w-fit max-w-[80px] whitespace-nowrap rounded-xl bg-highlight p-2 text-base line-clamp-1 md:text-lg"
                    >
                        {`Chapter: ${
                            read?.currentChapter?.chapterNumber || ''
                        }`}
                    </button>

                    <div className="absolute-center h-full w-fit gap-4 md:mx-6">
                        <button
                            onClick={handleNavigateChapter}
                            data-id="prev"
                            className="rounded-lg bg-highlight p-2 md:p-4"
                        >
                            <ArrowLeftIcon className="h-6 w-6" />
                        </button>

                        <button
                            onClick={handleNavigateChapter}
                            data-id="next"
                            className="rounded-lg bg-highlight p-2 md:p-4"
                        >
                            <ArrowRightIcon className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                <div className="flex h-full w-fit items-center pr-2 md:gap-10 md:px-4">
                    <button className="hidden items-center justify-center md:flex">
                        <ListBox
                            style="rounded-xl p-4 gap-2 transition-all"
                            title="Nguồn: "
                            options={['NT']}
                            backgroundColor="bg-highlight"
                            activeBackgroundColor="bg-primary"
                        />
                    </button>

                    <button
                        onClick={handleOpenSettingsModal}
                        className="rounded-lg bg-highlight p-2"
                    >
                        <CogIcon className="h-8 w-8" />
                    </button>
                </div>
            </div>
        </div>
    );
}
