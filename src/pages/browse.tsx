import { GetServerSideProps, NextPage } from 'next';
import Filters from '~/components/features/Filters';
import { REVALIDATE_TIME } from '~/constants';

// import RepositoryFactory from '~/services/repositoryFactory';

// const NtApi = RepositoryFactory('nettruyen');

// interface QueryParams {
//     genres: string;
//     sort: 'all' | 'month' | 'week' | 'day';
//     comic: 'manga' | 'manhua' | 'manhwa' | 'doujinshi';
//     status: 'ongoing' | 'completed';
// }

const BrowsePage: NextPage = () => {
    return (
        <div className="flex min-h-screen flex-col  ">
            <div className="z-10 mx-auto min-h-screen w-[98%] md:w-[90%]">
                <Filters />
            </div>
        </div>
    );
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getServerSideProps: GetServerSideProps = async ({
    query,
    res,
}) => {
    console.log('>>>', query);
    //caching
    res.setHeader(
        'Cache-Control',
        `public, s-maxage=${REVALIDATE_TIME}, stale-while-revalidate=${
            REVALIDATE_TIME * 6
        }`,
    );

    // const { genres, sort, comic, page } = query;

    // const data = await NtApi?.filter();

    return {
        props: { comicList: `Next.js is awesome` },
    };
};

export default BrowsePage;
