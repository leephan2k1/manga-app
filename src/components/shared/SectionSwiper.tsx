import 'swiper/css';
import 'swiper/css/pagination';

import Link from 'next/link';
import { memo } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'usehooks-ts';
import { MANGA_PATH_NAME } from '~/constants';
import { Manga } from '~/types';

import SectionSwiperCard from './SectionSwiperCard';

interface SectionSwiperProps {
    mangaList: Manga[];
}

function SectionSwiper({ mangaList }: SectionSwiperProps) {
    const matchesMobile = useMediaQuery('(max-width: 640px)');

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
        1600: {
            slidesPerView: 7,
        },
    };

    return (
        <div className="mt-4 lg:mt-6">
            <Swiper
                className="section-swiper"
                spaceBetween={8}
                pagination={{
                    clickable: true,
                }}
                breakpoints={swiperBreakPoints}
                modules={[Pagination]}
            >
                {mangaList &&
                    mangaList.length &&
                    mangaList.map((manga, idx) => {
                        if (matchesMobile && idx > 20) return;
                        return (
                            <SwiperSlide key={manga.slug}>
                                <Link
                                    href={`/${MANGA_PATH_NAME}/${encodeURIComponent(
                                        manga.slug,
                                    )}`}
                                >
                                    <a>
                                        <SectionSwiperCard manga={manga} />
                                        <h2 className="my-2 select-none text-xl text-white transition-all line-clamp-1 hover:text-primary  md:text-2xl">
                                            {manga.name}
                                        </h2>
                                    </a>
                                </Link>
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
        </div>
    );
}

export default memo(SectionSwiper);
