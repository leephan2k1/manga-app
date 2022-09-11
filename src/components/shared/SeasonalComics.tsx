// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import Image from 'next/image';
import { memo } from 'react';
import { FreeMode, Mousewheel, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Comic } from '~/types';
import Link from 'next/link';
import { MANGA_PATH_DETAILS_NAME, MANGA_PATH_NAME } from '~/constants';
import ClientOnly from '~/components/shared/ClientOnly';
import LazyLoad from 'react-lazy-load';

interface SeasonalComicsProps {
    comics: Comic[];
}

function SeasonalComics({ comics }: SeasonalComicsProps) {
    return (
        <div className="my-4 h-[250px] w-full bg-red-500/0 text-white md:h-[300px]">
            <ClientOnly>
                <Swiper
                    breakpoints={{
                        1: {
                            slidesPerView: 1,
                        },
                        480: {
                            slidesPerView: 2,
                        },
                        640: {
                            slidesPerView: 3,
                        },
                    }}
                    spaceBetween={30}
                    mousewheel
                    freeMode={true}
                    loop
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Mousewheel, Pagination, FreeMode]}
                    className="section-swiper full-size hover:cursor-grab"
                >
                    {comics && comics.length
                        ? comics.map((comic) => {
                              return (
                                  <LazyLoad key={comic._id}>
                                      <SwiperSlide className="absolute-center pb-4 md:pb-0">
                                          <Link
                                              href={`/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${encodeURIComponent(
                                                  comic?.slug,
                                              )}`}
                                          >
                                              <a className="full-size">
                                                  <div className="full-size grid grid-cols-5 overflow-hidden rounded-xl bg-deep-black">
                                                      <figure className="relative col-span-1 md:col-span-2 lg:col-span-1">
                                                          <Image
                                                              priority
                                                              layout="fill"
                                                              className="absolute inset-0 object-cover object-center"
                                                              src={
                                                                  comic?.thumbnail
                                                              }
                                                              alt="comic-img"
                                                          />
                                                      </figure>
                                                      <div className="col-span-4 flex flex-col px-6 py-2 md:col-span-3 md:space-y-4 lg:col-span-4">
                                                          <h1 className="font-secondary text-3xl transition-all duration-200 line-clamp-2 hover:text-primary lg:text-4xl">
                                                              {comic?.name}
                                                          </h1>

                                                          <p className="text-xl font-light line-clamp-6 md:text-2xl lg:line-clamp-[9]">
                                                              {comic?.review}
                                                          </p>
                                                      </div>
                                                  </div>
                                              </a>
                                          </Link>
                                      </SwiperSlide>
                                  </LazyLoad>
                              );
                          })
                        : Array.from(Array(4).keys()).map((e) => {
                              return (
                                  <SwiperSlide
                                      key={e}
                                      className="absolute-center"
                                  >
                                      <a className="full-size">
                                          <div className="full-size grid grid-cols-5 overflow-hidden rounded-xl bg-deep-black">
                                              <figure className="relative col-span-1">
                                                  <div className="loading-pulse full-size bg-white/20"></div>
                                              </figure>
                                              <div className="col-span-4 flex flex-col px-6 py-2 md:space-y-4">
                                                  <div className="loading-pulse min-h-[30px] w-full rounded-xl bg-white/20"></div>

                                                  <div className="loading-pulse my-4 min-h-[200px] w-full rounded-xl bg-white/20"></div>
                                              </div>
                                          </div>
                                      </a>
                                  </SwiperSlide>
                              );
                          })}
                </Swiper>
            </ClientOnly>
        </div>
    );
}

export default memo(SeasonalComics);
