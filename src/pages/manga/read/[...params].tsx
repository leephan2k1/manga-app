import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { useCallback, useEffect, useMemo, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useEffectOnce, useLocalStorage, useMediaQuery } from 'usehooks-ts';
import Reader from '~/components/features/Reader';
import MainLayout from '~/components/layouts/MainLayout';
import ClientOnly from '~/components/shared/ClientOnly';
import Head from '~/components/shared/Head';
import Section from '~/components/shared/Section';
import Teleport from '~/components/shared/Teleport';
import {
    MANGA_PATH_NAME,
    MANGA_PATH_READ_NAME,
    REVALIDATE_TIME,
} from '~/constants';
import { ReadingContextProvider } from '~/context/ReadingContext';
import { SettingsContextProvider } from '~/context/SettingsContext';
import { SourcesContextProvider } from '~/context/SourcesContext';
import Page from '~/serverless/models/Page.model';
import { axiosClientV2 } from '~/services/axiosClient';
import {
    ChapterDetails,
    NavigateDirection,
    PageInfo,
    ReadModeSettings,
} from '~/types';
import proxyObserver from '~/utils/proxyObserver';

import { ChevronRightIcon } from '@heroicons/react/24/outline';

const SettingsModal = dynamic(
    () =>
        import('~/components/features/SettingsModal', {
            ssr: false,
        } as ImportCallOptions),
);
const VerticalPanel = dynamic(
    () =>
        import('~/components/features/VerticalPanel', {
            ssr: false,
        } as ImportCallOptions),
);

interface ReadPageProps {
    pagesDetail: PageInfo;
    chaptersDetail: ChapterDetails;
}

const ReadPage: NextPage<ReadPageProps> = ({ pagesDetail, chaptersDetail }) => {
    const router = useRouter();
    const { params } = router.query;

    const [rmSettings] = useLocalStorage<ReadModeSettings | null>(
        'settings',
        null,
    );

    const [showSideSettings, setShowSideSettings] = useState(true);
    const matchesTouchScreen = useMediaQuery('(max-width: 1024px)');

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

    const handleChangeChapter = useCallback(
        async (type: NavigateDirection) => {
            if (!params?.length) return;

            let index = currentChapters?.chapters.findIndex(
                (e) => e.chapterNumber === currentChapter?.chapterNumber,
            );

            if (index === undefined) return;

            try {
                switch (type) {
                    case 'next':
                        if (!currentChapters?.chapters[--index]) {
                            toast(
                                'Chapter mới nhất rồi bạn ơi! Quay lại sau nhé!',
                                {
                                    icon: '😅',
                                    duration: 3000,
                                    style: { zIndex: 899 },
                                },
                            );

                            return;
                        }

                        NProgress.start();

                        await axiosClientV2.post('/chapters', {
                            chapterSlug:
                                currentChapters?.chapters[index].chapterSlug,
                            source: params[0],
                            comicName: chaptersDetail.comicName,
                            comicSlug: chaptersDetail.comicSlug,
                        });

                        router.replace(
                            `/${MANGA_PATH_NAME}/${MANGA_PATH_READ_NAME}/${params[0]}/${currentChapters?.chapters[index].chapterNumber}/${currentChapters?.chapters[index].chapterSlug}`,
                        );

                        break;

                    case 'prev':
                        if (!currentChapters?.chapters[++index]) {
                            toast(
                                'Chap đầu tiên rồi bạn ơi! Tiến tới để đọc thêm nhé!',
                                {
                                    icon: '😅',
                                    duration: 3000,
                                    style: { zIndex: 899 },
                                },
                            );
                            return;
                        }

                        NProgress.start();

                        await axiosClientV2.post('/chapters', {
                            chapterSlug:
                                currentChapters?.chapters[index].chapterSlug,
                            source: params[0],
                            comicName: chaptersDetail.comicName,
                            comicSlug: chaptersDetail.comicSlug,
                        });

                        router.replace(
                            `/${MANGA_PATH_NAME}/${MANGA_PATH_READ_NAME}/${params[0]}/${currentChapters?.chapters[index].chapterNumber}/${currentChapters?.chapters[index].chapterSlug}`,
                        );

                        break;
                }
            } catch (err) {
                toast.error('Lỗi rồi, Hãy chuyển nguồn khác nhé User-kun!', {
                    duration: 3000,
                    style: { zIndex: 899 },
                });
            }
        },
        [params, chaptersDetail, router],
    );

    const currentChapter = useMemo(() => {
        if (!params?.length || !chaptersDetail) return;

        const source = params[0];

        const chaptersBySource = chaptersDetail.chapters_list.find(
            (e) => e.sourceName === source,
        );

        if (chaptersBySource) {
            const chapNumberParam = params[1];

            return chaptersBySource.chapters.find(
                (e) => e.chapterNumber === chapNumberParam,
            );
        }
    }, [params, router]);

    const currentChapters = useMemo(() => {
        if (!params?.length || !chaptersDetail) return;

        const source = params[0];

        if (source) {
            return chaptersDetail.chapters_list.find(
                (e) => e.sourceName === source,
            );
        }
    }, [params]);

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
                <SettingsContextProvider>
                    <div className="flex h-fit min-h-screen flex-col bg-deep-black">
                        <SettingsModal
                            triggerShowSideSettings={handleShowSideSettings}
                        />
                    </div>
                </SettingsContextProvider>
            </ClientOnly>
        );
    }

    return (
        <>
            <Head
                title={`${currentChapter?.chapterTitle} - ${pagesDetail.comicName} | Kyoto Manga`}
                image={
                    pagesDetail.pages[0].src || pagesDetail.pages[0].fallbackSrc
                }
            />

            <SourcesContextProvider value={{ chaptersDetail, currentChapters }}>
                <ClientOnly>
                    <Toaster position="bottom-center" />

                    <div className="flex h-fit min-h-screen flex-col bg-black">
                        <ReadingContextProvider
                            value={{
                                images: pagesDetail.pages,
                                useProxy: proxyObserver(params && params[0]),
                                sourceId: (params && params[0]) || 'NTC',
                                navigateChapter: handleChangeChapter,
                                currentChapter: currentChapter,
                            }}
                        >
                            <SettingsContextProvider>
                                <Section style="flex h-fit relative">
                                    {!matchesTouchScreen && showSideSettings && (
                                        <Teleport selector="body">
                                            <div
                                                className={`fixed top-0 left-0 z-[999] h-full w-fit bg-black ${
                                                    showSideSettings
                                                        ? 'slideLeftReturn magictime'
                                                        : 'slideLeft magictime'
                                                } `}
                                            >
                                                <VerticalPanel
                                                    handleClose={
                                                        handleCloseSideSettings
                                                    }
                                                />
                                            </div>
                                        </Teleport>
                                    )}

                                    <div className="relative flex h-fit flex-1 text-white">
                                        {!matchesTouchScreen &&
                                            !showSideSettings && (
                                                <button
                                                    onClick={
                                                        handleShowSideSettings
                                                    }
                                                    className={`${'fixed top-4 left-4 z-[889] rounded-full bg-highlight p-4 transition-all hover:bg-highlight/70'}`}
                                                >
                                                    <ChevronRightIcon className="h-8 w-8" />
                                                </button>
                                            )}

                                        <div
                                            onDoubleClick={() =>
                                                handleChangeChapter(
                                                    rmSettings?.nextDirection ===
                                                        'left'
                                                        ? 'next'
                                                        : 'prev',
                                                )
                                            }
                                            className="absolute top-0 left-0 z-[699] h-full w-[75px]"
                                        ></div>

                                        <div
                                            onDoubleClick={() =>
                                                handleChangeChapter(
                                                    rmSettings?.nextDirection ===
                                                        'right'
                                                        ? 'next'
                                                        : 'prev',
                                                )
                                            }
                                            className="absolute top-0 right-0 z-[699] h-full w-[75px]"
                                        ></div>

                                        <Reader
                                            sideSettingState={showSideSettings}
                                            closeDesktopPanel={
                                                handleCloseSideSettings
                                            }
                                        />
                                    </div>
                                </Section>
                            </SettingsContextProvider>
                        </ReadingContextProvider>
                    </div>
                </ClientOnly>
            </SourcesContextProvider>
        </>
    );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getServerSideProps: GetServerSideProps = async ({
    query,
    res,
}) => {
    res.setHeader(
        'Cache-Control',
        `public, s-maxage=${REVALIDATE_TIME}, stale-while-revalidate=${
            REVALIDATE_TIME * 100
        }`,
    );

    const { params } = query;

    if (Array.isArray(params)) {
        const chapterSlug = `/${params.slice(2).join('/')}`;
        const pages = await Page.findOne({ chapterSlug }).populate('chapter');

        if (!pages || !pages?.chapter) {
            return { notFound: true };
        }

        return {
            props: {
                pagesDetail: JSON.parse(JSON.stringify(pages)),
                chaptersDetail: JSON.parse(JSON.stringify(pages?.chapter)),
            },
        };
    }
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ReadPage.getLayout = (page: ReactNode) => {
    return <MainLayout>{page}</MainLayout>;
};

export default ReadPage;
