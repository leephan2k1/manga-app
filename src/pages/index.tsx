import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import MangaBanner from '~/components/shared/Banner';
import ColumnSection from '~/components/shared/ColumnSection';
import Section from '~/components/shared/Section';
import SectionSwiper from '~/components/shared/SectionSwiper';
import { REVALIDATE_TIME } from '~/constants';
import RepositoryFactory from '~/services/repositoryFactory';
import { Manga } from '~/types';

const NtApi = RepositoryFactory('nettruyen');

interface HomeProps {
    topMonthList: Manga[];
    newMangaUpdated: Manga[];
}

const Home: NextPage<HomeProps> = ({ topMonthList, newMangaUpdated }) => {
    // console.log(newMangaUpdated);
    return (
        <div className="flex h-fit min-h-screen flex-col">
            <Head>
                <title>Kyoto Manga</title>
            </Head>

            <MangaBanner mangaList={topMonthList.slice(0, 10)} />

            <Section
                title="Mới cập nhật"
                style="w-[90%] mx-auto w-max-[1300px] mt-6  overflow-x-hidden"
                linkHints={true}
            >
                <SectionSwiper mangaList={newMangaUpdated} />
            </Section>

            <Section
                // className=""
                style="w-[90%] mx-auto w-max-[1300px] mt-6 overflow-x-hidden"
            >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <ColumnSection title="Manga nổi bật nhất" />
                    <ColumnSection title="Manga nổi bật tháng" />
                    <ColumnSection title="Manga nổi bật tuần" />
                    <ColumnSection title="Manga nổi bật ngày" />
                </div>
            </Section>

            {/* <div className="flex h-[500px] w-full flex-col bg-blue-500 px-20"></div> */}
        </div>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const [topMonthList, newMangaUpdated] = await Promise.all([
        NtApi?.filter(1, 'manga-112', 'month').then((res) => res.data.data),
        NtApi?.getNewMangaUpdated(1).then((res) => res.data.data),
    ]);

    return {
        props: { topMonthList, newMangaUpdated },
        revalidate: REVALIDATE_TIME,
    };
};

export default Home;
