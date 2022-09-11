import 'animate.css';
import 'react-loading-skeleton/dist/skeleton.css';
import '~/styles/globals.scss';
import '~/styles/magic.min.css';
import 'nprogress/nprogress.css';

import { SessionProvider } from 'next-auth/react';
import Router, { useRouter } from 'next/router';
import { pageview, GA_TRACKING_ID } from '~/utils/gtag';
import Script from 'next/script';
import NProgress from 'nprogress';
import { ReactElement, ReactNode, useState, useEffect } from 'react';
import { useEffectOnce, useLocalStorage } from 'usehooks-ts';
import MainLayout from '~/components/layouts/MainLayout';
import NotificationObserver from '~/components/shared/NotificationObserver';
import { SubscriptionContextProvider } from '~/context/SubscriptionContext';
import { register } from '~/services/registerServiceWorkers';
import { Subscription } from '~/types';
import { Provider as JotaiProvider } from 'jotai';
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
    const router = useRouter();
    const [_, setIsSupportedSW] = useLocalStorage('supportSW', false);
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            pageview(url);
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        router.events.on('hashChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
            router.events.off('hashChangeComplete', handleRouteChange);
        };
    }, [router.events]);

    //load service workers script:
    useEffectOnce(() => {
        if (!('serviceWorker' in navigator)) {
            console.error('No Service Worker support!');
            return;
        }

        if (!('PushManager' in window)) {
            console.error('No Push API Support!');
            return;
        }

        setIsSupportedSW(true);

        (async function () {
            const subscription = await register();
            if (!subscription) return;

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
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />

            <Script id="google-analytics" strategy="afterInteractive">
                {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
        `}
            </Script>

            <SessionProvider session={session} refetchInterval={5 * 60}>
                <JotaiProvider>
                    <SubscriptionContextProvider value={subscription}>
                        <NotificationObserver>
                            {getLayout(<Component {...pageProps} />)}
                        </NotificationObserver>
                    </SubscriptionContextProvider>
                </JotaiProvider>
            </SessionProvider>
        </>
    );
}

export default MyApp;
