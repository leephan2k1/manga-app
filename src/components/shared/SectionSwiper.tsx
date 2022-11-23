import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

import Link from 'next/link';
import { memo } from 'react';
import { Pagination, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'usehooks-ts';
import { MANGA_PATH_DETAILS_NAME, MANGA_PATH_NAME } from '~/constants';
import { Comic } from '~/types';
import LazyLoad from 'react-lazy-load';

import SectionSwiperCard from './SectionSwiperCard';

interface SectionSwiperProps {
    mangaList?: Comic[];
}

const swiperBreakPoints = {
    1: {
        slidesPerView: 2,
        spaceBetween: 2,
    },
    320: {
        slidesPerView: 3,
    },
    480: {
        slidesPerView: 4,
    },
    640: {
        slidesPerView: 5,
        spaceBetween: 10,
    },
    1300: {
        slidesPerView: 7,
    },
};

function SectionSwiper({ mangaList }: SectionSwiperProps) {
    const matchesMobile = useMediaQuery('(max-width: 640px)');

    return (
        <div className="mt-4 hover:cursor-grab lg:mt-6">
            <Swiper
                className="section-swiper"
                spaceBetween={8}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                breakpoints={swiperBreakPoints}
                modules={[Pagination, FreeMode]}
            >
                {mangaList &&
                    mangaList.length > 0 &&
                    mangaList.map((manga, idx) => {
                        if (matchesMobile && idx > 20) return;
                        return (
                            <LazyLoad key={`${manga._id}`}>
                                <SwiperSlide>
                                    <SectionSwiperCard manga={manga} />
                                    <Link
                                        href={{
                                            pathname: `/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${encodeURIComponent(
                                                manga.slug,
                                            )}`,
                                        }}
                                    >
                                        <a>
                                            <h2 className="my-2 select-none text-xl text-white transition-all line-clamp-1 hover:text-primary  md:text-2xl">
                                                {manga.name}
                                            </h2>
                                        </a>
                                    </Link>
                                </SwiperSlide>
                            </LazyLoad>
                        );
                    })}

                {!mangaList &&
                    Array.from(Array(7).keys()).map(() => {
                        return (
                            <SwiperSlide key={String(Math.random())}>
                                <SectionSwiperCard />
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
        </div>
    );
}

export default memo(SectionSwiper);
