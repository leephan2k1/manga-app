import dynamic from 'next/dynamic';
import {
    memo,
    MouseEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useRecoilValue } from 'recoil';
import { useTransition } from 'transition-hook';
import { useElementSize, useEventListener, useMediaQuery } from 'usehooks-ts';
import { chapterModal } from '~/atoms/chapterModalAtom';
import { settingsModal } from '~/atoms/settingsModalAtom';
import ChapterModal from '~/components/features/ChapterModal';
import HorizontalSettings from '~/components/features/HorizontalPanel';
import SettingsModeModal from '~/components/features/SettingsModeModal';
import useReading from '~/context/ReadingContext';
import useSettingsMode from '~/context/SettingsContext';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline';

import { NavigateDirection } from '~/types';
import HorizontalReading from './HorizontalReading';
import VerticalReading from './VerticalReading';

const SettingsMode = dynamic(() => import('./SettingsMode'));

interface ReaderProps {
    sideSettingState: boolean;
    closeDesktopPanel: () => void;
}

function Reader({ sideSettingState, closeDesktopPanel }: ReaderProps) {
    const reader = useReading();
    const settings = useSettingsMode();
    const [showHorizontalSettings, setShowHorizontalSettings] = useState(false);
    const chapterModalState = useRecoilValue(chapterModal);
    const settingsModalState = useRecoilValue(settingsModal);
    const matchesTouchScreen = useMediaQuery('(max-width: 1024px)');
    const { shouldMount } = useTransition(Boolean(settings?.show), 150);
    const lastScrollTop = useRef(0);
    const [currentPage, setCurrentPage] = useState(0);

    const handleSaveCurrentPage = useCallback(
        (currPage: number) => {
            setCurrentPage(currPage);
        },
        [settings?.readMode],
    );

    const [readerPageRef, { width }] = useElementSize();

    const onScroll = () => {
        const st = window.pageYOffset;

        if (!matchesTouchScreen) return;

        if (st > lastScrollTop.current) {
            setShowHorizontalSettings(false);
        } else {
            setShowHorizontalSettings(true);
        }
        lastScrollTop.current = st;
    };

    const onDoubleClick = () => {
        setShowHorizontalSettings((prevState) => !prevState);
    };

    const handleConfig = (value: string) => {
        switch (value) {
            case 'full':
                settings?.setImageMode('full');
                break;
            case 'fit width':
                settings?.setImageMode('fitW');
                break;
            case 'fit height':
                settings?.setImageMode('fitH');
                break;
            case 'ngang':
                //close all settings ui
                closeDesktopPanel();
                setShowHorizontalSettings(false);
                settings?.setReadMode('horizontal');
                break;
            case 'dọc':
                //close all settings ui
                closeDesktopPanel();
                setShowHorizontalSettings(false);
                settings?.setReadMode('vertical');
                break;
            case 'phải sang trái':
                settings?.setReadDirection('rtl');
                break;
            case 'trái sang phải':
                settings?.setReadDirection('ltr');
                break;
            case 'cạnh phải':
                settings?.setNextDirection('right');
                break;
            case 'cạnh trái':
                settings?.setNextDirection('left');
                break;
            case 'onReading':
                closeDesktopPanel();
                setShowHorizontalSettings(false);
                break;
        }
    };

    const handleNavigateChapter = (e: MouseEvent<HTMLButtonElement>) => {
        // console.log(e.currentTarget.dataset.id);
        reader?.navigateChapter(
            e.currentTarget.dataset.id as NavigateDirection,
        );
    };

    useEffect(() => {
        if (!sideSettingState) {
            settings?.turnOffSettings();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sideSettingState]);

    useEventListener('scroll', onScroll);
    useEventListener('dblclick', onDoubleClick);

    return (
        <div ref={readerPageRef} className="h-fit min-h-screen w-full bg-black">
            <div
                style={{
                    width: `${width}px`,
                }}
                className={`fixed top-0 right-0 z-[888] min-h-[50px] px-24`}
            >
                <SettingsMode
                    handleConfig={handleConfig}
                    show={Boolean(settings?.show)}
                    styles={`${
                        shouldMount && settings?.show
                            ? 'slideUpReturn'
                            : 'slideUp'
                    } `}
                />
            </div>

            {showHorizontalSettings && matchesTouchScreen && (
                <HorizontalSettings />
            )}

            {matchesTouchScreen && chapterModalState && <ChapterModal />}

            {matchesTouchScreen && settingsModalState && (
                <SettingsModeModal handleConfig={handleConfig} />
            )}

            {settings?.readMode === 'horizontal' ? (
                <HorizontalReading
                    images={reader?.images || []}
                    srcId={reader?.sourceId || ''}
                    useProxy
                    currentPage={currentPage}
                    handleSaveCurrentPage={handleSaveCurrentPage}
                    handleConfig={handleConfig}
                />
            ) : (
                <VerticalReading
                    images={reader?.images || []}
                    srcId={reader?.sourceId || ''}
                    useProxy
                    matchesTouchScreen={matchesTouchScreen}
                    currentPage={currentPage}
                    handleSaveCurrentPage={handleSaveCurrentPage}
                />
            )}

            {settings?.readMode === 'vertical' && (
                <div className="h-[200px] w-full overflow-hidden py-4">
                    <div className="mx-auto flex h-full w-full flex-col space-y-4 md:w-1/2">
                        <div className="flex h-full w-full gap-4 ">
                            <button
                                onClick={handleNavigateChapter}
                                data-id="prev"
                                className="absolute-center h-full w-[20%] border-2 border-dashed border-white/40 px-2 text-white/40 transition-all hover:border-white hover:text-white md:gap-2"
                            >
                                {' '}
                                <ArrowLeftIcon className="inline h-8 w-8" />{' '}
                                Chapter trước
                            </button>
                            <button
                                onClick={handleNavigateChapter}
                                data-id="next"
                                className="absolute-center h-full w-[80%] gap-2 border-2 border-dashed border-white/40 text-white/40 transition-all hover:border-white hover:text-white"
                            >
                                Chapter kế tiếp{' '}
                                <ArrowRightIcon className="inline-block h-8 w-8" />
                            </button>
                        </div>
                        <h1 className="py-4 px-2 text-center text-white/75">
                            Mẹo: Bạn có thể double tap/click vào 2 cạnh của màn
                            hình để chuyển chap ở bất cứ vị trí nào ở chế độ
                            dọc!
                        </h1>
                    </div>
                </div>
            )}
        </div>
    );
}

export default memo(Reader);
