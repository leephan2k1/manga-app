import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { ReactNode, useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import MainLayout from '~/components/layouts/MainLayout';
import DetailsBanner from '~/components/shared/DetailsBanner';
import DetailsChapterList from '~/components/shared/DetailsChapterList';
import DetailsDescription from '~/components/shared/DetailsDescription';
import DetailsInfo from '~/components/shared/DetailsInfo';
import Section from '~/components/shared/Section';
import { REVALIDATE_TIME } from '~/constants';
import RepositoryFactory from '~/services/repositoryFactory';
import { MangaDetails } from '~/types';

const NtApi = RepositoryFactory('nettruyen');

interface Params extends ParsedUrlQuery {
    slug: string;
}

interface DetailsPageProps {
    manga: MangaDetails;
}

const DetailsPage: NextPage<DetailsPageProps> = ({ manga }) => {
    const matchesMobile = useMediaQuery('(max-width: 768px)');
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const handleRouteChange = () => {
            setLoading(true);
        };

        const handleRouteComplete = () => {
            setLoading(false);
        };

        router.events.on('routeChangeStart', handleRouteChange);
        router.events.on('routeChangeComplete', handleRouteComplete);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
            router.events.off('routeChangeComplete', handleRouteComplete);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex h-fit min-h-screen flex-col">
            <DetailsBanner
                isLoading={isLoading}
                imgUrl={manga?.thumbnail || 'notFound'}
            />

            <div className="z-10 mx-auto min-h-screen w-[85%] pt-32">
                <Section style="h-fit w-full">
                    <DetailsInfo isLoading={isLoading} manga={manga} />
                </Section>

                <Section style="h-fit w-full">
                    <DetailsDescription
                        isLoading={isLoading}
                        mangaReview={manga?.review || ''}
                        mobileUI={matchesMobile}
                    />
                </Section>

                <Section title="Danh sách chương" style="h-fit w-full">
                    <DetailsChapterList
                        chapterList={manga?.chapterList || []}
                        mobileUI={matchesMobile}
                    />
                </Section>
            </div>
        </div>
    );
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export const getStaticProps: GetStaticProps<DetailsPageProps, Params> = async (
    ctx,
) => {
    try {
        const { slug } = ctx.params as Params;
        const res = await NtApi?.getManga(slug);

        if (res?.status === 200 && res?.data) {
            return {
                props: { manga: res.data?.data },
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
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const [
        topMonthList,
        newMangaUpdated,
        topAllManga,
        topMonthManga,
        topWeekManga,
        topDayManga,
        newManga,
    ] = await Promise.all([
        NtApi?.filter(1, 'manga-112', 'month').then((res) => {
            if (res.status === 200 && res.data) {
                return res.data.data;
            }
            return [];
        }),
        NtApi?.getNewMangaUpdated(1).then((res) => {
            if (res.status === 200 && res.data) {
                return res.data.data;
            }
            return [];
        }),
        NtApi?.getRankingmanga(undefined, 'all', 1).then((res) => {
            if (res.status === 200 && res.data) {
                return res.data.data;
            }
            return [];
        }),
        NtApi?.getRankingmanga(undefined, 'month', 1).then((res) => {
            if (res.status === 200 && res.data) {
                return res.data.data;
            }
            return [];
        }),
        NtApi?.getRankingmanga(undefined, 'week', 1).then((res) => {
            if (res.status === 200 && res.data) {
                return res.data.data;
            }
            return [];
        }),
        NtApi?.getRankingmanga(undefined, 'day', 1).then((res) => {
            if (res.status === 200 && res.data) {
                return res.data.data;
            }
            return [];
        }),
        NtApi?.getNewManga(1).then((res) => {
            if (res.status === 200 && res.data) {
                return res.data.data;
            }
            return [];
        }),
    ]);

    if (
        topMonthList &&
        newMangaUpdated &&
        topAllManga &&
        topMonthManga &&
        topWeekManga &&
        topDayManga &&
        newManga
    ) {
        const paths = [
            ...topMonthList,
            ...newMangaUpdated,
            ...topAllManga,
            ...topMonthManga,
            ...topWeekManga,
            ...topDayManga,
            ...newManga,
        ].map((manga) => ({
            params: {
                slug: manga.slug,
            },
        }));
        return { paths, fallback: true };
    }
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
DetailsPage.getLayout = (page: ReactNode) => {
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

export default DetailsPage;
