import NextHead from 'next/head';
import { WEBSITE_URL } from '~/constants';
import { useRouter } from 'next/router';

interface HeadProps {
    title?: string;
    description?: string;
    image?: string;
}

export default function Head({
    title = 'Kyoto Manga',
    description = 'Website đọc truyện tranh miễn phí!',
    image = 'https://res.cloudinary.com/lee1002/image/upload/v1656087170/personal/dqpi0v4gfsoj6kkwg7oc.png',
}: HeadProps) {
    const { asPath } = useRouter();

    return (
        <NextHead>
            <title>{title}</title>
            <link rel="manifest" href="/manifest.json" />

            <meta name="title" content={title} />
            <meta name="description" content={description} />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={WEBSITE_URL + asPath} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={WEBSITE_URL + asPath} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="application-name" content="Kyoto Manga" />
            <meta name="apple-mobile-web-app-title" content="Kyoto Manga" />
            <meta name="theme-color" content="#f43f5e" />
            <meta name="msapplication-navbutton-color" content="#f43f5e" />
            <meta
                name="apple-mobile-web-app-status-bar-style"
                content="black-translucent"
            />
            <meta name="msapplication-starturl" content="/" />
        </NextHead>
    );
}
