import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useEffectOnce, useLocalStorage, useMediaQuery } from 'usehooks-ts';
import Reader from '~/components/features/Reader';
import MainLayout from '~/components/layouts/MainLayout';
import ClientOnly from '~/components/shared/ClientOnly';
import Section from '~/components/shared/Section';
import Teleport from '~/components/shared/Teleport';
import { SettingsContextProvider } from '~/context/SettingsContext';
import { ReadModeSettings } from '~/types';

import { ChevronRightIcon } from '@heroicons/react/outline';

const SettingsModal = dynamic(
    () => import('~/components/features/SettingsModal'),
);
const SettingsSide = dynamic(
    () => import('~/components/features/VerticalSettings'),
);

const ReadPage: NextPage = () => {
    const [rmSettings] = useLocalStorage<ReadModeSettings | null>(
        'settings',
        null,
    );
    const matchesTouchScreen = useMediaQuery('(max-width: 1024px)');
    const [showSideSettings, setShowSideSettings] = useState(true);
    const router = useRouter();

    const handleCloseSideSettings = () => {
        const body = document.querySelector('body');
        if (body) {
            body.classList.remove('pl-[250px]');
        }
        setShowSideSettings(false);
    };

    const handleShowSideSettings = () => {
        if (matchesTouchScreen) return;

        const body = document.querySelector('body');
        if (body) {
            body.classList.add('pl-[250px]');
        }
        setShowSideSettings(true);
    };

    useEffectOnce(() => {
        if (!matchesTouchScreen && rmSettings !== null)
            handleShowSideSettings();
    });

    useEffect(() => {
        if (matchesTouchScreen) {
            handleCloseSideSettings();
        }
        return () => {
            handleCloseSideSettings();
        };
    }, [matchesTouchScreen]);

    if (!rmSettings) {
        return (
            <ClientOnly>
                <div className="flex h-fit min-h-screen flex-col bg-deep-black">
                    <SettingsModal
                        triggerShowSideSettings={handleShowSideSettings}
                    />
                </div>
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <div className="flex h-fit min-h-screen flex-col bg-black">
                <SettingsContextProvider>
                    <Section style="flex h-fit relative">
                        {!matchesTouchScreen && showSideSettings && (
                            <Teleport selector="body">
                                <div
                                    className={`fixed top-0 left-0 h-full w-fit bg-black ${
                                        showSideSettings
                                            ? 'slideLeftReturn magictime'
                                            : 'slideLeft magictime'
                                    } `}
                                >
                                    <SettingsSide
                                        comicSlug={
                                            (router.query.params &&
                                                router.query.params[0]) ||
                                            ''
                                        }
                                        handleClose={handleCloseSideSettings}
                                    />
                                </div>
                            </Teleport>
                        )}

                        <div className="relative flex h-fit flex-1 text-white">
                            {!matchesTouchScreen && !showSideSettings && (
                                <button
                                    onClick={handleShowSideSettings}
                                    className={`${'fixed top-4 left-4 z-50 rounded-full bg-highlight p-4 transition-all hover:bg-highlight/70'}`}
                                >
                                    <ChevronRightIcon className="h-8 w-8" />
                                </button>
                            )}
                            <Reader sideSettingState={showSideSettings} />
                        </div>
                    </Section>
                </SettingsContextProvider>
            </div>
        </ClientOnly>
    );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ReadPage.getLayout = (page: ReactNode) => {
    return <MainLayout>{page}</MainLayout>;
};

export default ReadPage;
