import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import MangaBanner from '~/components/shared/Banner';
import Section from '~/components/shared/Section';
import SectionSwiper from '~/components/shared/SectionSwiper';
import RepositoryFactory from '~/services/repositoryFactory';
import { Manga } from '~/types';

const NtApi = RepositoryFactory('nettruyen');

interface HomeProps {
    topMonthList: Manga[];
}

const Home: NextPage<HomeProps> = ({ topMonthList }) => {
    return (
        <div className="flex h-fit min-h-screen flex-col">
            <Head>
                <title>Kyoto Manga</title>
            </Head>

            <MangaBanner mangaList={topMonthList.slice(0, 10)} />

            <Section
                title="Mới cập nhật"
                style="h-[500px] w-[90%] mx-auto w-max-[1300px] mt-6  overflow-x-hidden"
                linkHints={true}
            >
                <SectionSwiper />
            </Section>

            {/* <div className="flex h-[500px] w-full flex-col bg-blue-500 px-20"></div> */}
        </div>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const [topMonthList] = await Promise.all([
        NtApi?.filter(1, 'manga-112', 'month').then((res) => res.data.data),
    ]);

    return {
        props: { topMonthList }, // will be passed to the page component as props
    };
};

export default Home;
