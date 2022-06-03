import '~/styles/globals.scss';
import 'animate.css';
import '~/styles/magic.min.css';

import { RecoilRoot } from 'recoil';
import MainLayout from '~/components/layouts/MainLayout';

import type { AppProps } from 'next/app';
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
