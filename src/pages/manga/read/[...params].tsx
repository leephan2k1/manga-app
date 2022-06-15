import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useTransition } from 'transition-hook';
import { useLocalStorage, useMediaQuery } from 'usehooks-ts';
import { chapterList } from '~/atoms/chapterListAtom';
import MainLayout from '~/components/layouts/MainLayout';
import ClientOnly from '~/components/shared/ClientOnly';
import Section from '~/components/shared/Section';
import { ReadModeSettings } from '~/types';

import { ChevronRightIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';

const SettingsModal = dynamic(
    () => import('~/components/features/SettingsModal'),
);
const SettingsSide = dynamic(
    () => import('~/components/features/SettingsSide'),
);

const ReadPage: NextPage = () => {
    const [rmSettings] = useLocalStorage<ReadModeSettings | null>(
        'settings',
        null,
    );
    const matchesTouchScreen = useMediaQuery('(max-width: 1024px)');
    const [showSideSettings, setShowSideSettings] = useState(true);
    const { stage, shouldMount } = useTransition(showSideSettings, 500);
    const chapters = useRecoilValue(chapterList);
    const router = useRouter();

    const handleCloseSideSettings = () => {
        setShowSideSettings(false);
    };

    if (!rmSettings) {
        return (
            <ClientOnly>
                <div className="flex h-fit min-h-screen flex-col bg-deep-black">
                    <SettingsModal />
                </div>
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <div className="relative flex h-fit min-h-screen flex-col bg-black">
                <Section style="flex">
                    {!matchesTouchScreen && shouldMount && (
                        <div
                            className={`${
                                stage === 'leave' &&
                                'animate__slideOutLeft animate__animated animate__faster'
                            } ${
                                stage === 'enter' &&
                                'animate__slideInLeft animate__animated animate__faster'
                            }`}
                        >
                            <SettingsSide
                                comicSlug={router.asPath.slice(
                                    router.asPath.lastIndexOf('/') + 1,
                                    router.asPath.indexOf('?'),
                                )}
                                chapterList={chapters}
                                handleClose={handleCloseSideSettings}
                            />
                        </div>
                    )}
                    <div className="relative flex max-h-screen flex-1 overflow-y-scroll text-white">
                        {!shouldMount && (
                            <button
                                onClick={() => setShowSideSettings(true)}
                                className={`${
                                    stage === 'leave' &&
                                    'absolute top-4 left-4 rounded-full bg-highlight p-4 transition-all hover:bg-highlight/70'
                                }`}
                            >
                                <ChevronRightIcon className="h-8 w-8" />
                            </button>
                        )}
                        <div className="min-h-[2500px] w-full bg-black">
                            <div className="mx-auto h-[350px] w-[60%] bg-red-500"></div>
                        </div>
                    </div>
                </Section>
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
