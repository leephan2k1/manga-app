import '~/styles/globals.scss';
import 'animate.css';
import type { AppProps } from 'next/app';
import MainLayout from '~/components/layouts/MainLayout';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <RecoilRoot>
            <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
        </RecoilRoot>
    );
}

export default MyApp;
