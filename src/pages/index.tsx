import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <Head>
                <title>Kyoto Manga</title>
            </Head>

            <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
                <h1 className="font-secondary text-9xl">Còn trống rỗng</h1>
                <p>Hello NextJS</p>
            </main>
        </div>
    );
};

export default Home;
