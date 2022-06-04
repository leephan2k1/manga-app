import 'swiper/css';
import 'swiper/css/pagination';

import Link from 'next/link';
import { memo } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import SectionSwiperCard from './SectionSwiperCard';

function SectionSwiper() {
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
                <SwiperSlide>
                    <Link href="/justTest">
                        <a>
                            <SectionSwiperCard />
                            <h2 className="my-2 select-none text-xl text-white transition-all line-clamp-1 hover:text-primary  md:text-2xl">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Nisi optio repudiandae
                                corporis deleniti vero rerum, ut laboriosam
                                earum alias quaerat facilis sequi, officia
                                architecto itaque modi laborum! Facilis, error
                                magni.
                            </h2>
                        </a>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href="/justTest">
                        <a>
                            <SectionSwiperCard />
                            <h2 className="my-2 select-none text-xl text-white transition-all line-clamp-1 hover:text-primary md:text-2xl  lg:line-clamp-2">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Nisi optio repudiandae
                                corporis deleniti vero rerum, ut laboriosam
                                earum alias quaerat facilis sequi, officia
                                architecto itaque modi laborum! Facilis, error
                                magni.
                            </h2>
                        </a>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href="/justTest">
                        <a>
                            <SectionSwiperCard />
                            <h2 className="my-2 select-none text-xl text-white transition-all line-clamp-1 hover:text-primary  md:text-2xl">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Nisi optio repudiandae
                                corporis deleniti vero rerum, ut laboriosam
                                earum alias quaerat facilis sequi, officia
                                architecto itaque modi laborum! Facilis, error
                                magni.
                            </h2>
                        </a>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href="/justTest">
                        <a>
                            <SectionSwiperCard />
                            <h2 className="my-2 select-none text-xl text-white transition-all line-clamp-1 hover:text-primary  md:text-2xl">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Nisi optio repudiandae
                                corporis deleniti vero rerum, ut laboriosam
                                earum alias quaerat facilis sequi, officia
                                architecto itaque modi laborum! Facilis, error
                                magni.
                            </h2>
                        </a>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href="/justTest">
                        <a>
                            <SectionSwiperCard />
                            <h2 className="my-2 select-none text-xl text-white transition-all line-clamp-1 hover:text-primary  md:text-2xl">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Nisi optio repudiandae
                                corporis deleniti vero rerum, ut laboriosam
                                earum alias quaerat facilis sequi, officia
                                architecto itaque modi laborum! Facilis, error
                                magni.
                            </h2>
                        </a>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href="/justTest">
                        <a>
                            <SectionSwiperCard />
                            <h2 className="my-2 select-none text-xl text-white transition-all line-clamp-1 hover:text-primary  md:text-2xl">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Nisi optio repudiandae
                                corporis deleniti vero rerum, ut laboriosam
                                earum alias quaerat facilis sequi, officia
                                architecto itaque modi laborum! Facilis, error
                                magni.
                            </h2>
                        </a>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href="/justTest">
                        <a>
                            <SectionSwiperCard />
                            <h2 className="my-2 select-none text-xl text-white transition-all line-clamp-1 hover:text-primary  md:text-2xl">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Nisi optio repudiandae
                                corporis deleniti vero rerum, ut laboriosam
                                earum alias quaerat facilis sequi, officia
                                architecto itaque modi laborum! Facilis, error
                                magni.
                            </h2>
                        </a>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href="/justTest">
                        <a>
                            <SectionSwiperCard />
                            <h2 className="my-2 select-none text-xl text-white transition-all line-clamp-1 hover:text-primary  md:text-2xl">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Nisi optio repudiandae
                                corporis deleniti vero rerum, ut laboriosam
                                earum alias quaerat facilis sequi, officia
                                architecto itaque modi laborum! Facilis, error
                                magni.
                            </h2>
                        </a>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href="/justTest">
                        <a>
                            <SectionSwiperCard />
                            <h2 className="my-2 select-none text-xl text-white transition-all line-clamp-1 hover:text-primary  md:text-2xl">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Nisi optio repudiandae
                                corporis deleniti vero rerum, ut laboriosam
                                earum alias quaerat facilis sequi, officia
                                architecto itaque modi laborum! Facilis, error
                                magni.
                            </h2>
                        </a>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href="/justTest">
                        <a>
                            <SectionSwiperCard />
                            <h2 className="my-2 select-none text-xl text-white transition-all line-clamp-1 hover:text-primary  md:text-2xl">
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Nisi optio repudiandae
                                corporis deleniti vero rerum, ut laboriosam
                                earum alias quaerat facilis sequi, officia
                                architecto itaque modi laborum! Facilis, error
                                magni.
                            </h2>
                        </a>
                    </Link>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default memo(SectionSwiper);
