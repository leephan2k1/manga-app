import 'animate.css';
import 'react-loading-skeleton/dist/skeleton.css';
import '~/styles/globals.scss';
import '~/styles/magic.min.css';

import { SessionProvider } from 'next-auth/react';
import { ReactElement, ReactNode, useState } from 'react';
import { RecoilRoot } from 'recoil';
import { useEffectOnce, useLocalStorage } from 'usehooks-ts';
import MainLayout from '~/components/layouts/MainLayout';
import NotificationObserver from '~/components/shared/NotificationObserver';
import { SubscriptionContextProvider } from '~/context/SubscriptionContext';
import { register } from '~/services/registerServiceWorkers';
import { Subscription } from '~/types';

import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
    const [_, setIsSupportedSW] = useLocalStorage('supportSW', false);
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    //load service workers script:
    useEffectOnce(() => {
        if (!('serviceWorker' in navigator)) {
            console.log('No Service Worker support!');
            return;
        }

        if (!('PushManager' in window)) {
            console.log('No Push API Support!');
            return;
        }

        setIsSupportedSW(true);

        (async function () {
            const subscription = await register();
            const parsed = JSON.parse(JSON.stringify(subscription));

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { expirationTime, ...rest } = parsed;

            setSubscription(rest);
        })();
    });

    const getLayout =
        Component.getLayout ??
        ((page) => (
            <MainLayout showHeader showFooter>
                {page}
            </MainLayout>
        ));

    return (
        <SessionProvider session={session} refetchInterval={5 * 60}>
            <RecoilRoot>
                <SubscriptionContextProvider value={subscription}>
                    <NotificationObserver>
                        {getLayout(<Component {...pageProps} />)}
                    </NotificationObserver>
                </SubscriptionContextProvider>
            </RecoilRoot>
        </SessionProvider>
    );
}

export default MyApp;
