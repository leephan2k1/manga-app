import axios from 'axios';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useRecoilState, useRecoilValue } from 'recoil';
import useSWR from 'swr';
import { useEffectOnce, useMediaQuery } from 'usehooks-ts';
import { chapterList } from '~/atoms/chapterListAtom';
import { followModal } from '~/atoms/followModaAtom';
import { mangaSources } from '~/atoms/mangaSourcesAtom';
import { mangaSrc } from '~/atoms/mangaSrcAtom';
import withDbScroll from '~/components/hoc/withDbScroll';
import MainLayout from '~/components/layouts/MainLayout';
import ClientOnly from '~/components/shared/ClientOnly';
import DetailsBanner from '~/components/shared/DetailsBanner';
import DetailsChapterList from '~/components/shared/DetailsChapterList';
import DetailsDescription from '~/components/shared/DetailsDescription';
import DetailsInfo from '~/components/shared/DetailsInfo';
import Head from '~/components/shared/Head';
import Section from '~/components/shared/Section';
import { MANGA_RESOURCE, REVALIDATE_TIME } from '~/constants';
import axiosClient from '~/services/axiosClient';
import { HeadlessManga, LHSearchRes, MangaDetails } from '~/types';
import webtoonChecker from '~/utils/webtoonChecker';

const FollowModal = dynamic(
    () =>
        import('~/components/features/FollowModal', {
            ssr: false,
        } as ImportCallOptions),
);

interface Params extends ParsedUrlQuery {
    slug: string;
}

interface DetailsPageProps {
    manga: MangaDetails;
}

const DetailsPage: NextPage<DetailsPageProps> = ({ manga }) => {
    const router = useRouter();
    const [src, setSrc] = useRecoilState(mangaSrc);
    const followModalState = useRecoilValue(followModal);
    const [_, setChapterList] = useRecoilState(chapterList);
    const matchesMobile = useMediaQuery('(max-width: 768px)');
    const [__, setAvailableSource] = useRecoilState(mangaSources);
    const [currentChapters, setCurrentChapters] = useState(manga?.chapterList);

    const { data: LHSearch } = useSWR<LHSearchRes>(
        `/api/search/lh?title=${manga?.title}`,
        async (slug) => {
            return await (
                await axios.get(slug)
            ).data;
        },
        {
            onErrorRetry: async (_, __, ___, revalidate, { retryCount }) => {
                // Only retry up to 2 times.
                if (retryCount >= 2) return;

                // Retry after 3.5 seconds.
                setTimeout(() => revalidate({ retryCount }), 3500);

                return await (
                    await axios.get(`/api/search/lh?title=${manga?.otherName}`)
                ).data;
            },
        },
    );

    const { data: LHManga } = useSWR<MangaDetails>(
        LHSearch
            ? `/lh/manga/${LHSearch?.data?.data[0].url?.slice(
                  LHSearch?.data?.data[0].url.lastIndexOf('/'),
              )}`
            : null,
        async (slug) => {
            const res = await (await axiosClient.get(slug)).data;

            return res.data;
        },
    );

    useEffect(() => {
        if (LHManga?.chapterList?.length) {
            setAvailableSource((prevState) => [
                ...prevState,
                {
                    sourceName: 'LHM',
                    sourceId: 'lh',
                },
            ]);
        }

        //clean up every manga
        return () => {
            setAvailableSource(MANGA_RESOURCE);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [LHManga]);

    useEffect(() => {
        switch (src) {
            case 'nt':
                if (manga) {
                    setCurrentChapters(manga?.chapterList);
                    setChapterList({
                        title: manga.title,
                        mangaSlug: comicSlug,
                        chapterList: manga.chapterList,
                        isWebtoon: webtoonChecker(manga),
                    } as HeadlessManga);
                }

                break;
            case 'lh':
                if (LHManga) {
                    setCurrentChapters(LHManga?.chapterList);
                    setChapterList({
                        title: LHManga.title,
                        mangaSlug: comicSlug,
                        chapterList: LHManga.chapterList,
                        isWebtoon: webtoonChecker(LHManga),
                    } as HeadlessManga);
                }

                break;
        }
    }, [src]);

    //cached for read page
    useEffectOnce(() => {
        if (manga) {
            setSrc('nt');
            setChapterList({
                title: manga.title,
                mangaSlug: comicSlug,
                chapterList: manga.chapterList,
                isWebtoon: webtoonChecker(manga),
            } as HeadlessManga);
        }
    });

    const comicSlug = useMemo(() => {
        if (src === 'lh' && LHSearch) {
            return LHSearch?.data?.data[0].url?.slice(
                LHSearch?.data?.data[0].url.lastIndexOf('/'),
            );
        }

        return router.asPath.slice(
            router.asPath.lastIndexOf('/') + 1,
            router.asPath.indexOf('?') > 0
                ? router.asPath.indexOf('?')
                : router.asPath.length,
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.asPath, src]);

    const notify = (message: string, status: string) => {
        if (status === 'success')
            toast.success(message, { duration: 3000, style: { zIndex: 899 } });
        else
            toast.error(message, {
                duration: 3000,
                style: { zIndex: 899 },
            });
    };

    return (
        <>
            <Head
                title={`${manga ? manga?.title + '-' : ''}  Kyoto Manga`}
                description={`${manga?.review}`}
                image={`${manga?.thumbnail}`}
            />
            <ClientOnly>
                <div className="flex h-fit min-h-screen flex-col">
                    <DetailsBanner
                        isLoading={router.isFallback}
                        imgUrl={manga?.thumbnail || 'notFound'}
                    />

                    <div className="z-10 mx-auto min-h-screen w-[85%] pt-32">
                        <Section style="h-fit w-full">
                            <DetailsInfo
                                isLoading={router.isFallback}
                                manga={manga}
                                comicSlug={comicSlug}
                            />
                        </Section>

                        <Section style="h-fit w-full">
                            <DetailsDescription
                                isLoading={router.isFallback}
                                mangaReview={manga?.review || ''}
                                mobileUI={matchesMobile}
                            />
                        </Section>

                        <Section title="Danh sách chương" style="h-fit w-full">
                            <DetailsChapterList
                                containerStyle="my-6 flex h-fit w-full flex-col overflow-x-hidden rounded-xl bg-highlight"
                                maxWTitleMobile={200}
                                selectSource
                                mobileHeight={600}
                                chapterList={
                                    currentChapters || manga?.chapterList || []
                                }
                                comicSlug={comicSlug}
                                mobileUI={matchesMobile}
                            />
                        </Section>

                        {followModalState && (
                            <FollowModal
                                callbackMessage={notify}
                                manga={manga}
                            />
                        )}

                        <Toaster position="bottom-center" />
                    </div>
                </div>
            </ClientOnly>
        </>
    );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export const getStaticProps: GetStaticProps<DetailsPageProps, Params> = async (
    ctx,
) => {
    try {
        const { slug } = ctx.params as Params;
        const host = process.env['HOST_NAME'];

        const res = await (await fetch(`${host}/api/comic/nt/${slug}`)).json();
        // const res = await NtApi?.getManga(slug);

        if (res.success) {
            return {
                props: { manga: res.data },
                revalidate: REVALIDATE_TIME,
            };
        } else {
            return { notFound: true };
        }
    } catch (err) {
        console.log(err);
        return { notFound: true };
    }
};

// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// //@ts-ignore
export const getStaticPaths: GetStaticPaths<Params> = async () => {
    return { paths: [], fallback: true };
};

const DetailsPageWidthDbScrollTT = withDbScroll<DetailsPageProps>(DetailsPage);

export default DetailsPageWidthDbScrollTT;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
DetailsPageWidthDbScrollTT.getLayout = (page: ReactNode) => {
    return (
        <MainLayout
            showHeader
            showFooter
            customStyleHeader={
                'w-full max-w-[1400px] h-40 absolute top-[-10px] z-50 left-1/2 -translate-x-1/2 bg-transparent'
            }
        >
            {page}
        </MainLayout>
    );
};
