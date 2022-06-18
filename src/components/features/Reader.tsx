import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useTransition } from 'transition-hook';
import { useElementSize, useEventListener, useMediaQuery } from 'usehooks-ts';
import { chapterModal } from '~/atoms/chapterModalAtom';
import { settingsModal } from '~/atoms/settingsModalAtom';
import ChapterModal from '~/components/features/ChapterModal';
import SettingsModeModal from '~/components/features/SettingsModeModal';
import HorizontalSettings from '~/components/features/HorizontalSettings';
import useSettingsMode from '~/context/SettingsContext';
import ChapterImages from '../shared/ChapterImages';
import useReading from '~/context/ReadingContext';

const SettingsMode = dynamic(() => import('./SettingsMode'));

interface ReaderProps {
    sideSettingState: boolean;
}

export default function Reader({ sideSettingState }: ReaderProps) {
    const reader = useReading();
    const settings = useSettingsMode();
    const [showHorizontalSettings, setShowHorizontalSettings] = useState(true);
    const chapterModalState = useRecoilValue(chapterModal);
    const settingsModalState = useRecoilValue(settingsModal);
    const matchesTouchScreen = useMediaQuery('(max-width: 1024px)');
    const { shouldMount } = useTransition(Boolean(settings?.show), 150);
    const lastScrollTop = useRef(0);

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

    useEffect(() => {
        if (!sideSettingState) {
            settings?.turnOffSettings();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sideSettingState]);

    useEventListener('scroll', onScroll);

    return (
        <div ref={readerPageRef} className="h-fit min-h-screen w-full bg-black">
            <div
                style={{
                    width: `${width}px`,
                }}
                className={`fixed top-0 right-0 z-[888] min-h-[50px] px-24`}
            >
                <SettingsMode
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

            {matchesTouchScreen && settingsModalState && <SettingsModeModal />}

            <ChapterImages
                matchesTouchScreen={matchesTouchScreen}
                srcId={reader?.sourceId || ''}
                images={reader?.images || []}
                useProxy={true}
            />
        </div>
    );
}
