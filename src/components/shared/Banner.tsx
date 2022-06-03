import 'swiper/css';
import 'swiper/css/effect-fade';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import SwiperCore, { Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'usehooks-ts';
import { Manga } from '~/types';

import SwiperCard from './SwiperCard';

const SwiperButton = dynamic(() => import('../buttons/SwiperButton'));

interface MangaBannerProps {
    mangaList: Manga[];
}

export default function MangaBanner({ mangaList }: MangaBannerProps) {
    const [swiper, setSwiper] = useState<SwiperCore | null>(null);
    const [currentActiveSlide, setCurrentActiveSlide] = useState(1);
    const matchesTablet = useMediaQuery('(min-width: 768px)');

    useEffect(() => {
        if (swiper) {
            swiper.on('slideChange', () => {
                setCurrentActiveSlide(swiper.realIndex);
            });
        }
    }, [swiper]);

    return (
        <div className="relative h-fit w-full overflow-hidden">
            <Swiper
                autoHeight={true}
                effect={'fade'}
                loop={true}
                modules={[EffectFade, Autoplay]}
                onSwiper={setSwiper}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
            >
                <div className="absolute-center absolute bottom-1 right-10 z-50 flex h-fit w-fit flex-col space-y-4 lg:bottom-10">
                    {matchesTablet && (
                        <>
                            <SwiperButton
                                type="prev"
                                styleButton="transition-all absolute-center z-[300] md:h-16 md:w-16 w-14 h-14 rounded-2xl text-white bg-hight-light hover:bg-primary"
                                styleIcon="h-10 w-10"
                            />
                            <SwiperButton
                                type="next"
                                styleButton="transition-all absolute-center z-[300] md:h-16 md:w-16 w-14 h-14 rounded-2xl text-white bg-hight-light hover:bg-primary"
                                styleIcon="h-10 w-10"
                            />
                        </>
                    )}
                </div>

                {/* list render  */}
                {mangaList.map((manga) => {
                    return (
                        <SwiperSlide key={manga.slug}>
                            <Link href={`manga/${manga.slug}`}>
                                <a>
                                    <figure
                                        style={{
                                            backgroundImage: `url(${manga.thumbnail})`,
                                        }}
                                        className={`deslide-cover h-[250px] w-full bg-cover bg-center bg-no-repeat blur md:h-[350px] lg:h-[450px]`}
                                    ></figure>
                                    <SwiperCard
                                        key={currentActiveSlide}
                                        imgSrc={manga.thumbnail}
                                        style="aspect-[3/4] 0 absolute-center absolute top-1/2 right-[5%] md:right-[10%] z-10 flex h-[80%] w-[150px]  -translate-y-1/2 items-center md:w-[200px] lg:w-[250px]"
                                        childStyle="relative magictime vanishIn h-full w-[90%] overflow-hidden rounded-2xl"
                                    />
                                    <div className="absolute top-12 left-5 z-40 flex h-[70%] w-[50%] flex-col space-x-4 space-y-4 font-secondary text-white  md:left-[5%] md:w-[55%]  md:py-4 lg:space-y-6">
                                        <h3 className="mx-4 mt-6 text-xl md:text-4xl">
                                            {manga.newChapter}
                                        </h3>
                                        <h1 className="text-3xl transition-all line-clamp-1 hover:text-primary md:min-h-[30px] md:text-6xl">
                                            {manga.name}
                                        </h1>
                                        <h5 className="text-sm line-clamp-3 md:min-h-[60px] md:text-2xl">
                                            {manga.review}
                                        </h5>
                                        <ul className="hidden space-x-4 text-lg md:flex">
                                            {manga.genres.map((genre) => {
                                                return (
                                                    <li
                                                        key={genre}
                                                        className="flex w-fit max-w-[100px] items-center whitespace-nowrap rounded-xl border-[1px] border-white py-2 px-4 line-clamp-1"
                                                    >
                                                        {genre}
                                                    </li>
                                                );
                                            })}
                                        </ul>

                                        <div className="flex space-x-6 text-xl md:text-2xl lg:pt-6">
                                            <button className="absolute-center rounded-xl bg-primary py-3 px-5 transition-all   hover:scale-110 md:w-[100px]">
                                                Đọc ngay
                                            </button>
                                            <button className="absolute-center rounded-xl bg-white py-3 px-5 text-gray-800 transition-all  hover:scale-110 md:w-[100px]">
                                                Chi tiết
                                            </button>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}
