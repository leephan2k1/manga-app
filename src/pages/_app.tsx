import '~/styles/globals.scss';
import 'animate.css';
import '~/styles/magic.min.css';
import 'react-loading-skeleton/dist/skeleton.css';

import router from 'next/router';
import NProgress from 'nprogress';
import { ReactElement, ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import MainLayout from '~/components/layouts/MainLayout';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

router.events.on('routeChangeStart', NProgress.start);
router.events.on('routeChangeComplete', NProgress.done);
router.events.on('routeChangeError', NProgress.done);

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const getLayout =
        Component.getLayout ??
        ((page) => (
            <MainLayout showHeader showFooter>
                {page}
            </MainLayout>
        ));

    return <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>;
}

export default MyApp;
