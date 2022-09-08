// https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_app.js

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
    });
};
