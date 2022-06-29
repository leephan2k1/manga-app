import { GetServerSideProps, NextPage } from 'next';
import useSWR from 'swr';
import Filters from '~/components/features/Filters';
import Pagination from '~/components/features/Pagination';
import withDbScroll from '~/components/hoc/withDbScroll';
import Head from '~/components/shared/Head';
import ListView from '~/components/shared/ListView';
import Section from '~/components/shared/Section';
import { COMIC_GENRES, GENRES_NT, REVALIDATE_TIME } from '~/constants';
import axiosClient from '~/services/axiosClient';
import { QueryObject } from '~/services/nettruyenRepository';
import { Manga } from '~/types';

import { EmojiSadIcon } from '@heroicons/react/outline';

interface BrowsePageProps {
    queryObj: QueryObject;
}

interface Comic {
    comicList: Manga[];
    totalPages: number;
}

const BrowsePage: NextPage<BrowsePageProps> = ({ queryObj }) => {
    const resouce = 'nt';

    const { data, error } = useSWR<Comic>(
        `${Object.values(queryObj).map((i) => i)}`,
        async () => {
            const res = await (
                await axiosClient.get(`${resouce}/advanced-search`, {
                    params: queryObj,
                })
            ).data;

            return {
                comicList: res.data,
                totalPages: res.totalPages,
            };
        },
    );

    return (
        <div className="flex min-h-screen flex-col">
            <Head title="Danh sách truyện - Kyoto Manga" />

            <Section style="z-10 mx-auto min-h-fit w-[98%] md:w-[90%]">
                <Filters />
            </Section>

            {error ? (
                <Section style="my-14 z-0 mx-auto min-h-[900px] w-[98%]   md:w-[90%]">
                    <div className="absolute-center w-full gap-4 text-white">
                        <h1>Dữ liệu bạn cần chưa có!</h1>
                        <EmojiSadIcon className="h-12 w-12" />
                    </div>
                </Section>
            ) : (
                <>
                    <Section style="my-4 z-0 mx-auto min-h-[900px] w-[98%]   md:w-[90%]">
                        <ListView
                            isLoading={!data ? true : false}
                            comicList={data?.comicList as Manga[]}
                        />
                    </Section>

                    <Section style="my-4 z-0 h-fit w-full">
                        {data && data?.totalPages > 1 && (
                            <Pagination
                                totalPages={data?.totalPages as number}
                            />
                        )}
                    </Section>
                </>
            )}
        </div>
    );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getServerSideProps: GetServerSideProps = async ({
    query,
    res,
}) => {
    //caching
    res.setHeader(
        'Cache-Control',
        `public, s-maxage=${REVALIDATE_TIME}, stale-while-revalidate=${
            REVALIDATE_TIME * 6
        }`,
    );

    const { genres, comics, page, view, status, chapter, gender } = query;

    const realGenres = String(genres)
        .split(',')
        .map((genre) => {
            return GENRES_NT.find((item) => item.value === genre)?.id;
        })
        .join(',');
    const realComics = String(comics)
        .split(',')
        .map((comic) => {
            return COMIC_GENRES.find((item) => item.value === comic)?.id;
        })
        .join(',');

    let queryGenres = '';
    if (realGenres) queryGenres += `${realGenres},`;
    if (realComics) queryGenres += realComics;

    const queryObj: QueryObject = {};

    if (queryGenres) queryObj['genres'] = queryGenres;
    if (page) queryObj['page'] = Number(page);
    if (view) queryObj['top'] = String(view);
    if (status) queryObj['status'] = String(status);
    if (chapter) queryObj['minchapter'] = Number(chapter);
    if (gender) queryObj['gender'] = Number(gender);

    return {
        props: {
            queryObj,
        },
    };
};

export default withDbScroll<BrowsePageProps>(BrowsePage);
