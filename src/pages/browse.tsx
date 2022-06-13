import { GetServerSideProps, NextPage } from 'next';
import Filters from '~/components/features/Filters';
import Pagination from '~/components/features/Pagination';
import ListView from '~/components/shared/ListView';
import Section from '~/components/shared/Section';
import { COMIC_GENRES, GENRES_NT, REVALIDATE_TIME } from '~/constants';
import { QueryObject } from '~/services/nettruyenRepository';
import RepositoryFactory from '~/services/repositoryFactory';
import { Manga } from '~/types';

const NtApi = RepositoryFactory('nettruyen');

interface BrowsePageProps {
    comicList: Manga[];
    totalPages: number;
}

const BrowsePage: NextPage<BrowsePageProps> = ({ comicList, totalPages }) => {
    console.log('>> ', comicList);

    return (
        <div className="flex min-h-screen flex-col">
            <Section style="z-10 mx-auto min-h-fit w-[98%] md:w-[90%]">
                <Filters />
            </Section>

            <Section style="my-4 z-0 mx-auto min-h-[900px] w-[98%]   md:w-[90%]">
                <ListView comicList={comicList} />
            </Section>

            <Section style="my-4 z-0 h-fit w-full">
                {totalPages > 1 && <Pagination totalPages={totalPages} />}
            </Section>
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
    if (realGenres) queryGenres += realGenres;
    if (realComics) queryGenres += `,${realComics}`;

    const queryObj: QueryObject = {};

    if (queryGenres) queryObj['genres'] = queryGenres;
    if (page) queryObj['page'] = Number(page);
    if (view) queryObj['top'] = String(view);
    if (status) queryObj['status'] = String(status);
    if (chapter) queryObj['minchapter'] = Number(chapter);
    if (gender) queryObj['gender'] = Number(gender);

    const result = await NtApi?.advancedSearch(queryObj);

    if (!result?.data.data) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            comicList: result?.data.data,
            totalPages: result?.data.totalPages,
        },
    };
};

export default BrowsePage;
