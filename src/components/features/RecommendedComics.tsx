import 'swiper/css';
import 'swiper/css/pagination';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperButton from '~/components/buttons/SwiperButton';
import ToggleButton from '~/components/buttons/ToggleButton';
import { MANGA_PATH_DETAILS_NAME, MANGA_PATH_NAME } from '~/constants';
import { Comic } from '~/types';

import { ArrowUpRightIcon } from '@heroicons/react/24/outline';

interface RecommendedComicsProps {
    handleShowSection: (state: boolean) => void;
    comics?: { _id: Comic; votes: string[]; size: number }[];
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

function RecommendedComics({
    handleShowSection,
    comics,
}: RecommendedComicsProps) {
    const removeSection = (state: boolean) => {
        handleShowSection(state);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=" w-full py-4 transition-all duration-200"
        >
            <Swiper
                className="full-size section-swiper flex flex-col-reverse"
                spaceBetween={8}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                breakpoints={swiperBreakPoints}
                modules={[Pagination]}
            >
                {/* controls  */}
                <div className="flex h-24 w-full items-center justify-between">
                    {/* navigate  */}
                    <div className="flex h-full w-40 items-center space-x-4 px-4 md:w-52 lg:w-64">
                        <SwiperButton
                            type="prev"
                            styleButton="transition-all absolute-center z-[300] md:h-16 md:w-16 w-14 h-14 rounded-2xl text-white bg-highlight hover:bg-primary"
                            styleIcon="h-10 w-10"
                        />
                        <SwiperButton
                            type="next"
                            styleButton="transition-all absolute-center z-[300] md:h-16 md:w-16 w-14 h-14 rounded-2xl text-white bg-highlight hover:bg-primary"
                            styleIcon="h-10 w-10"
                        />
                    </div>

                    {/* toggle  */}
                    <div className="absolute-center h-full w-72 md:w-80">
                        <h4 className="whitespace-nowrap text-xl md:text-2xl">
                            Hiển thị bình chọn
                        </h4>
                        <ToggleButton
                            defaultState
                            handleToggle={removeSection}
                        />
                    </div>
                </div>
                {/* slides  */}

                {comics?.length === 0 && (
                    <p className="text-center font-secondary text-2xl md:text-3xl">
                        Chưa có comic nào được bình chọn
                    </p>
                )}

                {comics && comics?.length
                    ? comics.map((e, index) => {
                          const comic = e._id;

                          return (
                              <SwiperSlide key={comic._id}>
                                  <Link
                                      href={`/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${encodeURIComponent(
                                          comic?.slug,
                                      )}`}
                                  >
                                      <a className="full-size">
                                          <div className="aspect-w-5 aspect-h-7 flex items-center overflow-hidden rounded-lg">
                                              <div className="w-full overflow-hidden">
                                                  <div className="full-size relative">
                                                      <div className="absolute-center absolute right-2 top-2 z-50 space-x-2 rounded-md bg-white/30 px-4 font-secondary text-xl text-gray-800 backdrop-blur-xl lg:text-2xl">
                                                          <span>{e.size}</span>
                                                          <ArrowUpRightIcon className="h-4 w-4 md:h-6 md:w-6" />
                                                      </div>
                                                      <Image
                                                          src={comic?.thumbnail}
                                                          layout="fill"
                                                          className="absolute top-0 left-0"
                                                          alt="comic-image"
                                                          priority
                                                      />
                                                  </div>
                                              </div>
                                              <div
                                                  className={`flex h-full w-[30%] items-end justify-center bg-gradient-to-t ${
                                                      index === 0 &&
                                                      'from-yellow-500 to-orange-300/70'
                                                  } ${
                                                      index === 1 &&
                                                      'from-gray-700 to-white/30'
                                                  }  ${
                                                      index === 2 &&
                                                      'from-orange-800 to-amber-100/50'
                                                  } ${
                                                      index > 2 &&
                                                      'from-deep-black to-background/50 '
                                                  } pb-24 md:pb-32 lg:pb-44`}
                                              >
                                                  <h1 className="min-w-[130px] -rotate-90 whitespace-nowrap text-xl line-clamp-1 md:min-w-[160px] md:text-2xl lg:min-w-[230px]">
                                                      #{++index} {comic?.name}
                                                  </h1>
                                              </div>
                                          </div>
                                      </a>
                                  </Link>
                              </SwiperSlide>
                          );
                      })
                    : comics === undefined
                    ? Array.from(new Array(8).keys()).map((e) => {
                          return (
                              <SwiperSlide key={e}>
                                  <div className="loading-pulse aspect-w-5 aspect-h-7 flex items-center overflow-hidden rounded-lg bg-white/20"></div>
                              </SwiperSlide>
                          );
                      })
                    : null}
            </Swiper>
        </motion.div>
    );
}

export default memo(RecommendedComics);
