import LogoSVG from '/public/images/torii-gate-japan.svg';
import { useRouter } from 'next/router';
import { MouseEvent, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { chapterList } from '~/atoms/chapterListAtom';
import { MANGA_PATH_DETAILS_NAME, MANGA_PATH_NAME } from '~/constants';
import useReading from '~/context/ReadingContext';
import useSettingsMode from '~/context/SettingsContext';
import { NavigateDirection } from '~/types';
import { memo } from 'react';

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
    const router = useRouter();
    const settings = useSettingsMode();
    const sideSettingsRef = useRef<HTMLDivElement>(null);
    const manga = useRecoilValue(chapterList);
    const read = useReading();
    const [isHovering, setIsHovering] = useState(false);

    const handleCloseSideSettings = () => {
        handleClose();
    };

    const handleSourceSettings = () => {
        console.log();
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
                    onClick={() =>
                        router.push(
                            `/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${comicSlug}`,
                        )
                    }
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
                options={['NT']}
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
                    maxWTitleMobile={90}
                    containerStyle="flex h-fit w-full flex-col overflow-x-hidden rounded-xl bg-highlight"
                    mobileHeight={300}
                    selectSource={false}
                    comicSlug={comicSlug}
                    mobileUI={true}
                    chapterList={manga.chapterList}
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
