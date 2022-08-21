import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { Toaster } from 'react-hot-toast';
import useSWR from 'swr';
import RandomComics from '~/components/features/RandomComics';
import MangaBanner from '~/components/shared/Banner';
import ClientOnly from '~/components/shared/ClientOnly';
import ColumnSection from '~/components/shared/ColumnSection';
import Head from '~/components/shared/Head';
import Section from '~/components/shared/Section';
import SectionSwiper from '~/components/shared/SectionSwiper';
import { MANGA_BROWSE_PAGE, REVALIDATE_TIME } from '~/constants';
import { connectToDatabase } from '~/serverless/utils/connectdbData';
import { axiosClientV2 } from '~/services/axiosClient';
import { Comic } from '~/types';
import shuffle from '~/utils/randomArray';

interface HomeProps {
    topAllManga: Comic[];
    topMonthManga: Comic[];
    topWeekManga: Comic[];
    topDayManga: Comic[];
}

const Home: NextPage<HomeProps> = ({
    topAllManga,
    topMonthManga,
    topWeekManga,
    topDayManga,
}) => {
    const { data: comicsNewUpdated } = useSWR<{
        comics: Comic[];
        totalPages: number;
    }>(
        `?top=0`,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        async (query) => {
            const res = await (
                await axiosClientV2.get(`/comics/filters${query}`)
            ).data;

            const { result } = res;

            if (result) {
                return {
                    comics: result.mangaData,
                    totalPages: result.totalPages,
                };
            }
        },
    );

    const { data: comicsNewRelease } = useSWR<{
        comics: Comic[];
        totalPages: number;
    }>(
        `?top=15`,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        async (query) => {
            const res = await (
                await axiosClientV2.get(`/comics/filters${query}`)
            ).data;

            const { result } = res;

            if (result) {
                return {
                    comics: result.mangaData,
                    totalPages: result.totalPages,
                };
            }
        },
    );

    return (
        <>
            <Head />

            <ClientOnly>
                <Toaster position="top-center" />

                <div className="flex h-fit min-h-screen flex-col">
                    <MangaBanner
                        mangaList={shuffle<Comic>(
                            [...topAllManga].slice(0, 15),
                        )}
                    />

                    <Section
                        link={`/${MANGA_BROWSE_PAGE}?view=newComic`}
                        title="Mới cập nhật"
                        style="w-[90%] mx-auto w-max-[1300px] mt-6 overflow-x-hidden"
                        linkHints={true}
                    >
                        <SectionSwiper mangaList={comicsNewUpdated?.comics} />
                    </Section>

                    <Section style="w-[90%] mx-auto w-max-[1300px] mt-6 overflow-x-hidden">
                        <RandomComics />
                    </Section>

                    <Section style="w-[90%] mx-auto min-w-[333px] w-max-[1300px] mt-6 overflow-x-hidden">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <ColumnSection
                                mangaList={[...topAllManga].slice(0, 5)}
                                title="Manga nổi bật nhất"
                                link={`/${MANGA_BROWSE_PAGE}?comics=manga-112&view=all`}
                            />
                            <ColumnSection
                                mangaList={[...topMonthManga].slice(0, 5)}
                                title="Manga nổi bật tháng"
                                link={`/${MANGA_BROWSE_PAGE}?comics=manga-112&view=month`}
                            />
                            <ColumnSection
                                mangaList={[...topWeekManga].slice(0, 5)}
                                title="Manga nổi bật tuần"
                                link={`/${MANGA_BROWSE_PAGE}?comics=manga-112&view=week`}
                            />
                            <ColumnSection
                                mangaList={[...topDayManga].slice(0, 5)}
                                title="Manga nổi bật ngày"
                                link={`/${MANGA_BROWSE_PAGE}?comics=manga-112&view=day`}
                            />
                        </div>
                    </Section>

                    <Section
                        link={`/${MANGA_BROWSE_PAGE}?view=new`}
                        title="Truyện mới"
                        style="w-[90%] mx-auto w-max-[1300px] mt-6  overflow-x-hidden"
                        linkHints={true}
                    >
                        <SectionSwiper mangaList={comicsNewRelease?.comics} />
                    </Section>
                </div>
            </ClientOnly>
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const { db } = await connectToDatabase();

    const [resultAll, resultMonth, resultWeek, resultDay] = await Promise.all([
        db.collection('real_time_comics').findOne({ type: 'all' }),
        db.collection('real_time_comics').findOne({ type: 'month' }),
        db.collection('real_time_comics').findOne({ type: 'week' }),
        db.collection('real_time_comics').findOne({ type: 'day' }),
    ]);

    const { comics: topAllManga } = resultAll;
    const { comics: topMonthManga } = resultMonth;
    const { comics: topWeekManga } = resultWeek;
    const { comics: topDayManga } = resultDay;

    return {
        props: {
            topAllManga: JSON.parse(JSON.stringify(topAllManga)),
            topMonthManga: JSON.parse(JSON.stringify(topMonthManga)),
            topWeekManga: JSON.parse(JSON.stringify(topWeekManga)),
            topDayManga: JSON.parse(JSON.stringify(topDayManga)),
        },
        revalidate: REVALIDATE_TIME,
    };
};

export default Home;
