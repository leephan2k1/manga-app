import { GetServerSideProps, NextPage } from 'next';
import Filters from '~/components/features/Filters';
import { REVALIDATE_TIME } from '~/constants';
import Section from '~/components/shared/Section';
import ListView from '~/components/shared/ListView';

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
        <div className="flex min-h-screen flex-col">
            <Section style="z-10 mx-auto min-h-fit w-[98%] md:w-[90%]">
                <Filters />
            </Section>

            <Section style="my-4 z-0 mx-auto min-h-[900px] w-[98%] bg-red-400/0 md:w-[90%]">
                <ListView />
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
