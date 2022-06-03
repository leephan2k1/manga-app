import type { NextPage } from 'next';
import Head from 'next/head';
import MangaBanner from '~/components/shared/MangaBanner';

const Home: NextPage = () => {
    return (
        <div className="flex h-fit min-h-screen flex-col">
            <Head>
                <title>Kyoto Manga</title>
            </Head>

            <MangaBanner />
            {/* <div className="flex h-[500px] w-full flex-col bg-blue-500 px-20"></div> */}
        </div>
    );
};

export default Home;
