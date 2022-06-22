import { memo, useRef } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import useSettingsMode from '~/context/SettingsContext';

interface ImgProps {
    useProxy?: boolean;
    index: number;
    url: string;
    src: string;
    saveCurrentPage: (currPage: number) => void;
}

function Img({ useProxy, url, src, index, saveCurrentPage }: ImgProps) {
    const ref = useRef<HTMLImageElement | null>(null);
    const entry = useIntersectionObserver(ref, {});
    const settings = useSettingsMode();
    const isVisible = !!entry?.isIntersecting;

    if (isVisible) {
        saveCurrentPage(index);
    }

    if (settings?.readMode === 'horizontal') {
        return (
            <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    data-id={index}
                    ref={ref}
                    alt="chapter-img"
                    className={`comic-img mx-auto h-screen w-auto
                         md:opacity-20
                    `}
                    src={useProxy ? `/api/proxy?url=${url}&src=${src}` : src}
                />
            </>
        );
    }

    return (
        <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                ref={ref}
                alt="chapter-img"
                className={`${
                    settings?.imageMode === 'fitH' ? 'h-screen' : 'h-auto'
                } comic-img mx-auto ${
                    settings?.imageMode === 'fitW' ? 'w-full' : 'w-auto'
                }`}
                src={useProxy ? `/api/proxy?url=${url}&src=${src}` : src}
            />
        </>
    );
}

export default memo(Img);
