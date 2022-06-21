import dynamic from 'next/dynamic';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useTransition } from 'transition-hook';
import { useElementSize, useEventListener, useMediaQuery } from 'usehooks-ts';
import { chapterModal } from '~/atoms/chapterModalAtom';
import { settingsModal } from '~/atoms/settingsModalAtom';
import ChapterModal from '~/components/features/ChapterModal';
import HorizontalSettings from '~/components/features/HorizontalSettings';
import SettingsModeModal from '~/components/features/SettingsModeModal';
import useReading from '~/context/ReadingContext';
import useSettingsMode from '~/context/SettingsContext';

import HorizontalReading from './HorizontalReading';
import VerticalReading from './VerticalReading';

const SettingsMode = dynamic(() => import('./SettingsMode'));

interface ReaderProps {
    sideSettingState: boolean;
    handleCloseSideSettings: () => void;
}

function Reader({ sideSettingState, handleCloseSideSettings }: ReaderProps) {
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
                handleCloseSideSettings();
                setShowHorizontalSettings(false);
                settings?.setReadMode('horizontal');
                break;
            case 'dọc':
                //close all settings ui
                handleCloseSideSettings();
                setShowHorizontalSettings(false);
                settings?.setReadMode('vertical');
                break;
            case 'phải sang trái':
                settings?.setReadDirection('rtl');
                break;
            case 'trái sang phải':
                settings?.setReadDirection('ltr');
                break;
        }
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
        </div>
    );
}

export default memo(Reader);
