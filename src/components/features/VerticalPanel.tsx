import LogoSVG from '/public/images/torii-gate-japan.svg';
import { useRouter } from 'next/router';
import { memo, MouseEvent, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { chapterList } from '~/atoms/chapterListAtom';
import { mangaSources } from '~/atoms/mangaSourcesAtom';
import { mangaSrc } from '~/atoms/mangaSrcAtom';
import { MANGA_PATH_DETAILS_NAME, MANGA_PATH_NAME } from '~/constants';
import useReading from '~/context/ReadingContext';
import useSettingsMode from '~/context/SettingsContext';
import useMultipleSources from '~/context/SourcesContext';
import { Chapter, NavigateDirection } from '~/types';

import {
    ArrowLeftIcon,
    ArrowNarrowLeftIcon,
    ArrowRightIcon,
    ChevronLeftIcon,
    CogIcon,
} from '@heroicons/react/outline';

import TextLogo from '../icons/TextLogo';
import DetailsChapterList from '../shared/DetailsChapterList';
import ListBox from '../shared/ListBox';

interface SettingsSideProps {
    handleClose: () => void;
    comicSlug: string;
}

function SettingsSide({ handleClose, comicSlug }: SettingsSideProps) {
    const read = useReading();
    const router = useRouter();
    const { params } = router.query;
    const settings = useSettingsMode();
    const manga = useRecoilValue(chapterList);
    const [_, setSrc] = useRecoilState(mangaSrc);
    const multipleSources = useMultipleSources();
    const [isHovering, setIsHovering] = useState(false);
    const [sourceSlug, setSourceSlug] = useState(comicSlug);
    const availableSource = useRecoilValue(mangaSources);
    const sideSettingsRef = useRef<HTMLDivElement>(null);
    const [currentChapters, setCurrentChapters] = useState(manga?.chapterList);

    const handleCloseSideSettings = () => {
        handleClose();
    };

    const handleSourceSettings = (value: string) => {
        if (multipleSources)
            switch (value) {
                case 'LHM':
                    setSrc('lh');
                    const LH_Instance = multipleSources.sources.find(
                        (src) => src.srcId === 'lh',
                    );

                    setCurrentChapters(
                        LH_Instance?.details?.chapterList as Chapter[],
                    );

                    setSourceSlug(LH_Instance?.slug as string);
                    break;
                case 'NTC':
                    setSrc('nt');
                    const NT_Instance = multipleSources.sources.find(
                        (src) => src.srcId === 'nt',
                    );

                    setCurrentChapters(
                        NT_Instance?.details?.chapterList as Chapter[],
                    );

                    setSourceSlug(NT_Instance?.slug as string);
                    break;
            }
    };

    const handleBackToDetails = () => {
        if (multipleSources) {
            const NT_Instance = multipleSources.sources.find(
                (src) => src.srcId === 'nt',
            );
            if (NT_Instance && NT_Instance?.slug) {
                router.push(
                    `/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${NT_Instance?.slug}`,
                );
            }
        }
    };

    const handleShowSettingsMode = () => {
        settings?.toggleSettings();
    };

    const handleNavigateChapter = (e: MouseEvent<HTMLButtonElement>) => {
        // console.log(e.currentTarget.dataset.id);
        read?.navigateChapter(e.currentTarget.dataset.id as NavigateDirection);
    };

    return (
        <aside
            ref={sideSettingsRef}
            className="flex min-h-screen min-w-[250px] max-w-[250px] flex-col gap-8 overflow-hidden bg-highlight/60 px-4 text-white transition-all"
        >
            {/* logo & control */}
            <div className="absolute-center my-2 h-[70px] w-full border-b-2 border-white/5">
                <button
                    onClick={handleBackToDetails}
                    className="rounded-full p-4 transition-all hover:bg-white/25"
                >
                    <ArrowNarrowLeftIcon className="h-8 w-8" />
                </button>
                <div className="absolute-center relative flex-1">
                    <LogoSVG
                        className="md:width-[100px] absolute"
                        width={50}
                        height={50}
                    />
                    <figure className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <TextLogo className="left-1/2 h-[40px] w-[130px]" />
                    </figure>
                </div>
                <button
                    onClick={handleCloseSideSettings}
                    className="rounded-full p-4 transition-all hover:bg-white/25"
                >
                    <ChevronLeftIcon className="h-8 w-8" />
                </button>
            </div>
            {/* manga title  */}
            <h1 className="w-ful font-secondary font-bold capitalize line-clamp-2">
                {manga?.title || ''}
            </h1>

            <h2>{`Chapter: ${read?.currentChapter?.chapterNumber || ''}`}</h2>

            <ListBox
                handleSelect={handleSourceSettings}
                style="rounded-xl p-4 gap-2 transition-all"
                title="Nguồn: "
                defaultOption={
                    params &&
                    availableSource.find((src) => src.sourceId === params[3])
                        ?.sourceName
                }
                options={availableSource.map((src) => src.sourceName)}
                backgroundColor="bg-highlight"
                activeBackgroundColor="bg-primary"
            />

            <div className="flex justify-center gap-2">
                <button
                    onClick={handleNavigateChapter}
                    data-id="prev"
                    className="absolute-center w-[40%] rounded-lg bg-highlight py-4 px-8 transition-all hover:bg-highlight/40"
                >
                    <ArrowLeftIcon className="h-8 w-8" />
                </button>
                <button
                    onClick={handleNavigateChapter}
                    data-id="next"
                    className="absolute-center w-[40%] rounded-lg bg-highlight py-4 px-8 transition-all hover:bg-highlight/40"
                >
                    <ArrowRightIcon className="h-8 w-8" />
                </button>
            </div>

            <div className="flex h-fit w-full flex-col overflow-x-hidden rounded-xl bg-highlight">
                <DetailsChapterList
                    highlightCurrentChapter
                    maxWTitleMobile={90}
                    containerStyle="flex h-fit w-full flex-col overflow-x-hidden rounded-xl bg-highlight"
                    mobileHeight={300}
                    selectSource={false}
                    comicSlug={sourceSlug}
                    mobileUI={true}
                    chapterList={
                        currentChapters?.length > 0
                            ? currentChapters
                            : manga?.chapterList
                    }
                />
            </div>

            <button
                onClick={handleShowSettingsMode}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className={`absolute-center gap-4 transition-all hover:text-primary`}
            >
                <CogIcon
                    className={`${
                        isHovering && 'animate__rotateIn'
                    } animate__animated animate__faster h-8 w-8 transition-all`}
                />
                Cài đặt
            </button>
        </aside>
    );
}

export default memo(SettingsSide);
