import { useRouter } from 'next/router';
import { memo, MouseEvent, useEffect, useRef } from 'react';
import { useElementSize, useMediaQuery, useWindowSize } from 'usehooks-ts';
import { SOURCE_COLLECTIONS } from '~/constants';
import useReading from '~/context/ReadingContext';
import useSettingsMode from '~/context/SettingsContext';
import { NavigateDirection, Page } from '~/types';

import {
    ArrowLeftIcon,
    ArrowRightIcon,
    DesktopComputerIcon,
    DeviceMobileIcon,
    DeviceTabletIcon,
} from '@heroicons/react/outline';

import HorizontalImages from '../shared/HorizontalImages';

interface HorizontalReadingProps {
    images: Page[];
    srcId: string;
    useProxy?: boolean;
    currentPage: number;
    handleSaveCurrentPage: (page: number) => void;
    handleConfig: (val: string) => void;
}

function HorizontalReading({
    images,
    useProxy,
    srcId,
    currentPage,
    handleSaveCurrentPage,
    handleConfig,
}: HorizontalReadingProps) {
    const url = SOURCE_COLLECTIONS[srcId];
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    const comicImgs = $$('.comic-img');

    const router = useRouter();
    const reader = useReading();
    const { width } = useWindowSize();
    const settings = useSettingsMode();
    const currentPageWhenNavigate = useRef(0);
    const [imgRef, imgSize] = useElementSize();

    const [readerRef, readerSize] = useElementSize();
    const matchesMobile = useMediaQuery('(max-width: 640px)');
    const matchesTouchScreen = useMediaQuery('(max-width: 1024px)');

    const handleNavigateHorizontalPage = (e: MouseEvent<HTMLDivElement>) => {
        const readerDom = $('#reader-page');

        switch (e.currentTarget.dataset.id) {
            case 'right':
                readerDom?.scrollBy(imgSize.width, 0);
                break;
            case 'left':
                readerDom?.scrollBy(-imgSize.width, 0);
                break;
        }
    };

    const handleStyleSnapScroll = () => {
        /*Currently, scrollIntoView() not working with css scroll snap
      https://discourse.webflow.com/t/scroll-into-view-not-working-with-css-scroll-snap/137594
      */
        const readerDom = $('#reader-page');
        if (readerDom) {
            readerDom.classList.add('snap-x', 'snap-mandatory');
        }

        const imgsWrapper = $$('.img-wrapper');

        if (imgsWrapper) {
            imgsWrapper.forEach((wrapper) => {
                wrapper.classList.add('snap-always', 'snap-center');
            });
        }
    };

    const handleNavigateChapter = (e: MouseEvent<HTMLButtonElement>) => {
        reader?.navigateChapter(
            e.currentTarget.dataset.id as NavigateDirection,
        );
    };

    //Auto navigate chapter
    useEffect(() => {
        if (currentPage === 0) currentPageWhenNavigate.current = 0;

        if (settings?.autoNext && images.length - 1 === currentPage) {
            if (currentPageWhenNavigate.current > 0) return;

            setTimeout(() => {
                reader?.navigateChapter('next');
            }, 1000);
            currentPageWhenNavigate.current++;
        }
    }, [currentPage]);

    useEffect(() => {
        const readerDom = $('#reader-page');

        const observerMiddleElem = () => {
            handleConfig('onReading');

            const elem = document.elementFromPoint(
                readerSize.width / 2,
                readerSize.height / 2,
            );

            if (comicImgs) {
                comicImgs.forEach((comicImg) => {
                    comicImg.classList.remove('md:opacity-100');
                    comicImg.classList.add('md:opacity-20');
                });
            }

            if (elem) {
                elem.classList.remove('md:opacity-20');
                elem.classList.add('md:opacity-100');

                const currentIdxElem = elem.getAttribute('data-id');

                //prevent conflicts double click on touchscreen
                if (!matchesTouchScreen) {
                    //navgigate by click on next/prev image
                    $(`#page-${Number(currentIdxElem) + 1}`)?.addEventListener(
                        'click',
                        () => {
                            if (settings?.readDirection === 'rtl') {
                                readerDom?.scrollBy(-imgSize.width, 0);
                            } else {
                                readerDom?.scrollBy(imgSize.width, 0);
                            }
                        },
                    );

                    $(`#page-${Number(currentIdxElem) - 1}`)?.addEventListener(
                        'click',
                        () => {
                            if (settings?.readDirection === 'rtl') {
                                readerDom?.scrollBy(imgSize.width, 0);
                            } else {
                                readerDom?.scrollBy(-imgSize.width, 0);
                            }
                        },
                    );
                }
            }
        };

        if (readerDom) readerDom.addEventListener('scroll', observerMiddleElem);

        return () => {
            if (readerDom)
                readerDom.removeEventListener('scroll', observerMiddleElem);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        settings?.readMode,
        readerSize.width,
        readerSize.height,
        settings?.readDirection,
    ]);

    //scroll to current page when change read direction
    useEffect(() => {
        const refCurrentpage = document.querySelector(
            `#page-${currentPage + 1}`,
        );

        if (refCurrentpage) {
            refCurrentpage.scrollIntoView();

            setTimeout(() => {
                handleStyleSnapScroll();
            }, 100);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settings?.readDirection]);

    //scroll to first page when navigate chapter
    useEffect(() => {
        const readerPage = $('#reader-page');

        if (readerPage) {
            readerPage.scrollTo(0, 0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.query]);

    return (
        <div
            id="reader-page"
            ref={readerRef}
            className={`flex h-fit w-screen ${
                settings?.readDirection === 'rtl' ? 'flex-row-reverse' : ''
            } overflow-x-auto scroll-smooth transition-all scrollbar-hide`}
        >
            <div
                data-id="left"
                onClick={handleNavigateHorizontalPage}
                className="absolute left-0 top-0 z-[700] h-screen w-[75px]"
            ></div>

            <div
                data-id="right"
                onClick={handleNavigateHorizontalPage}
                className="absolute right-0 top-0 z-[700] h-screen w-[75px]"
            ></div>

            <div
                style={{
                    minWidth: `${matchesMobile ? `${width}px` : ''}`,
                }}
                className={`img-wrapper absolute-center transition-al flex h-screen min-w-[535px]  max-w-[600px] touch-auto flex-col justify-center`}
            >
                <h1 className="py-4 text-center uppercase text-primary">
                    Mẹo đọc trên chế độ ngang
                </h1>
                <h2 className="my-4 text-center text-primary">
                    Đối với{' '}
                    <DeviceMobileIcon className="inline-block h-8 w-8" /> /{' '}
                    <DeviceTabletIcon className="inline-block h-8 w-8" />
                </h2>
                <ul className="mx-auto w-[80%] list-disc space-y-4 px-6">
                    <li>2 chạm để bật/tắt thanh điều khiển trên màn hình.</li>
                    <li>
                        Vuốt sang trái/phải hoặc 1 chạm vào (2) cạnh màn hình để
                        tiến/lùi trang trên màn hình.
                    </li>
                </ul>
                <h2 className="my-4 text-center text-primary">
                    Đối với{' '}
                    <DesktopComputerIcon className="inline-block h-8 w-8" />
                </h2>
                <ul className="mx-auto w-[80%] list-disc space-y-4 px-6">
                    <li>
                        Click sang trang kế bên hoặc dùng phím
                        <ArrowLeftIcon className="mx-2 inline-block h-8 w-8" />
                        <ArrowRightIcon className="mx-2 inline-block h-8 w-8" />{' '}
                        để tiến/lùi trang.
                    </li>
                </ul>

                <h2 className="my-4 text-center text-primary">
                    Đối với truyện thể loại không phải là Manga
                </h2>
                <ul className="mx-auto w-[80%] list-disc space-y-4 px-6">
                    <li>
                        Đối với thể loại truyện{' '}
                        <span className="text-primary">
                            không phải là manga
                        </span>{' '}
                        mọi người nên đọc chế độ{' '}
                        <span className="text-primary">dọc</span> để có trải
                        nghiệm tốt nhất.
                    </li>
                    <li>
                        Tại sao? Vì (Manhua, Manhwa/Webtoon) có lối vẽ trang rất
                        dài và trang này nối tiếp trang kia (Không có ngắt
                        trang) nên đọc ngang sẽ không thoải mái.
                    </li>
                    <li>Đây cũng là gợi ý, tuỳ sở thích mọi người. Hehe!</li>
                </ul>
            </div>

            <HorizontalImages
                images={images}
                handleSaveCurrentPage={handleSaveCurrentPage}
                url={url}
                width={width}
                matchesMobile={matchesMobile}
                ref={imgRef}
                useProxy={useProxy}
            />

            <div
                style={{
                    minWidth: `${matchesMobile ? `${width}px` : ''}`,
                }}
                className={`img-wrapper absolute-center h-screen min-w-[535px] max-w-[600px] touch-auto  transition-all`}
            >
                <div className="flex h-1/5 w-full flex-col items-center justify-center gap-4 px-4">
                    <button
                        onClick={handleNavigateChapter}
                        data-id="next"
                        className="absolute-center h-full w-full gap-2 border-2 border-dashed border-white/40 text-white/40 transition-all hover:border-white hover:text-white"
                    >
                        Chapter kế tiếp{' '}
                    </button>
                    <button
                        onClick={handleNavigateChapter}
                        data-id="prev"
                        className="absolute-center h-full w-fit  px-2 text-white/40 transition-all  hover:text-white md:gap-2"
                    >
                        {' '}
                        Chapter trước
                    </button>
                </div>
            </div>
        </div>
    );
}

export default memo(HorizontalReading);
