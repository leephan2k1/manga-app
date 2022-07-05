import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useEffectOnce, useLocalStorage, useMediaQuery } from 'usehooks-ts';
import { chapterList } from '~/atoms/chapterListAtom';
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
import axiosClient from '~/services/axiosClient';
import { ImagesChapter, NavigateDirection, ReadModeSettings } from '~/types';
import proxyObserver from '~/utils/proxyObserver';
import webtoonChecker from '~/utils/webtoonChecker';

import { ChevronRightIcon } from '@heroicons/react/outline';

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
    imagesChapter: ImagesChapter[];
}

const ReadPage: NextPage<ReadPageProps> = ({ imagesChapter }) => {
    const router = useRouter();
    const { params } = router.query;

    const [rmSettings] = useLocalStorage<ReadModeSettings | null>(
        'settings',
        null,
    );

    const [manga, setManga] = useRecoilState(chapterList);
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
        (type: NavigateDirection) => {
            if (!params?.length) return;

            let index = manga.chapterList.findIndex(
                (chapter) => chapter.chapterNumber === params[1],
            );

            switch (type) {
                case 'next':
                    if (!manga.chapterList[--index]) return;

                    const nextChapNumber =
                        manga.chapterList[index].chapterNumber;
                    const nextChapId = manga.chapterList[index].chapterId;

                    router.replace(
                        `/${MANGA_PATH_NAME}/${MANGA_PATH_READ_NAME}/${params[0]}/${nextChapNumber}/${nextChapId}/${params[3]}`,
                    );

                    break;
                case 'prev':
                    if (!manga.chapterList[++index]) return;

                    const prevChapNumber =
                        manga.chapterList[index].chapterNumber;
                    const prevChapId = manga.chapterList[index].chapterId;

                    router.replace(
                        `/${MANGA_PATH_NAME}/${MANGA_PATH_READ_NAME}/${params[0]}/${prevChapNumber}/${prevChapId}/${params[3]}`,
                    );

                    break;
            }
        },
        [params, manga.chapterList, router],
    );

    const currentChapter = useMemo(() => {
        if (!params?.length) return;

        if (manga.chapterList.length) {
            return manga.chapterList.find(
                (chapter) => chapter.chapterNumber === params[1],
            );
        }
    }, [params, manga.chapterList]);

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

    useEffect(() => {
        const mangaSlugParams = params && params[0];

        if (manga.mangaSlug !== mangaSlugParams) {
            (async function () {
                try {
                    if (!params?.length) return;

                    const source = params[3];
                    const slug = params[0];

                    const res = (
                        await axiosClient.get(`${source}/manga/${slug}`)
                    )?.data;

                    if (res?.success) {
                        setManga({
                            mangaSlug: params[0],
                            title: res.data.title,
                            chapterList: res.data.chapterList,
                            isWebtoon: webtoonChecker(res.data),
                        });
                    }
                } catch (err) {
                    console.log(err);
                }
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.query?.params]);

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
                title={`${currentChapter?.chapterTitle} - ${manga?.title} | Kyoto Manga`}
                image={imagesChapter[0]?.imgSrc}
            />

            <SourcesContextProvider comicTitle={manga.title}>
                <ClientOnly>
                    <div className="flex h-fit min-h-screen flex-col bg-black">
                        <ReadingContextProvider
                            value={{
                                images: imagesChapter,
                                useProxy: proxyObserver(params && params[3]),
                                sourceId: 'nt',
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
                                                    comicSlug={
                                                        (router.query.params &&
                                                            router.query
                                                                .params[0]) ||
                                                        ''
                                                    }
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
            REVALIDATE_TIME * 6
        }`,
    );

    const { params } = query;
    const mangaSlug = params && params[0];
    const mangaChapter = params && params[1];
    const mangaChapterId = params && params[2];
    const mangaSource = params && params[3];

    if (!params?.length) return { notFound: true };

    //because nt source slug embed with id
    //need to separate id from slug to fetch images chapter
    const realSlug =
        mangaSource === 'nt' && !isNaN(+String(mangaSlug?.slice(-1)))
            ? mangaSlug?.slice(0, mangaSlug?.lastIndexOf('-'))
            : mangaSlug;

    try {
        // const imgsRes = await NtApi?.getChapters(realSlug, params[1], params[2]);

        const imgsRes = await axiosClient.get(
            `${mangaSource}/chapter/${realSlug}/${mangaChapter}/${mangaChapterId}`,
        );

        if (imgsRes?.status !== 200) return { notFound: true };

        return {
            props: {
                imagesChapter: imgsRes.data.data,
            },
        };
    } catch (err) {
        console.log('err slug');
        return { notFound: true };
    }
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ReadPage.getLayout = (page: ReactNode) => {
    return <MainLayout>{page}</MainLayout>;
};

export default ReadPage;
