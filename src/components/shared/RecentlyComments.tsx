import 'swiper/css';

import { memo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperButton from '~/components/buttons/SwiperButton';
import Image from 'next/image';
import useSWR from 'swr';
import { Comment } from '~/types';
import { axiosClientV2 } from '~/services/axiosClient';
import { calculateDiffDate } from '~/utils/dateHandler';
import Link from 'next/link';
import { MANGA_PATH_NAME } from '~/constants';

const swiperBreakPoints = {
    1: {
        slidesPerView: 2,
        spaceBetween: 10,
    },
    480: {
        slidesPerView: 3,
        spaceBetween: 10,
    },
    640: {
        slidesPerView: 4,
        spaceBetween: 20,
    },
    1300: {
        slidesPerView: 6,
        spaceBetween: 15,
    },
};

interface CommentSlideProps {
    comment: Comment;
}

function CommentSlide({ comment }: CommentSlideProps) {
    const [showSpoil, setShowSpoil] = useState(!Boolean(comment.isSpoil));

    return (
        <li className="full-size flex max-h-[150px] min-h-[150px] w-full cursor-grab flex-col justify-between rounded-2xl bg-deep-black px-4 py-3">
            {/* meta info  */}
            <div className="flex w-full space-x-4">
                <figure className="md:h-18 md:w-18 relative h-14 w-14 overflow-hidden rounded-full">
                    <Image
                        layout="fill"
                        className="absolute inset-0"
                        alt="user-avatar"
                        src={comment.owner.image}
                    />
                </figure>

                <div className="flex max-w-[70%] flex-col">
                    <h2 className="text-xl line-clamp-1 md:text-2xl">
                        {comment.owner.name}
                    </h2>

                    <h4 className="text-lg italic text-white/70 line-clamp-1">
                        {calculateDiffDate(comment.createdAt)}
                    </h4>
                </div>
            </div>
            {/* contents  */}
            <p
                onClick={() => setShowSpoil(true)}
                className={`${
                    showSpoil ? '' : 'blur'
                } my-3 text-xl line-clamp-4`}
            >
                {comment.contents}
            </p>
            {/* comic name  */}
            <Link
                href={`/${MANGA_PATH_NAME}/${comment.section}/${comment.comicSlug}?scrollTo=${comment._id}`}
            >
                <a>
                    <h2 className="font-secondary text-2xl font-semibold text-primary line-clamp-1">
                        {comment.comicName}
                    </h2>
                </a>
            </Link>
        </li>
    );
}

function RecentlyComments() {
    const { data: comments } = useSWR<Comment[]>(
        `/comments/recently`,
        async (slug) => {
            const { data } = await axiosClientV2.get(slug);

            return data?.comments;
        },
    );

    return (
        <ul className="text-white">
            <Swiper
                breakpoints={swiperBreakPoints}
                className="flex flex-col-reverse"
            >
                <div className="my-4 flex space-x-4">
                    <SwiperButton
                        type="prev"
                        styleButton="bg-highlight smooth-effect hover:bg-rose-500 text-white p-2 h-10 w-10 rounded-xl"
                    />
                    <SwiperButton
                        type="next"
                        styleButton="bg-highlight smooth-effect hover:bg-rose-500 text-white p-2 h-10 w-10 rounded-xl"
                    />
                </div>

                {Array.isArray(comments) && comments.length > 0
                    ? comments?.map((comment) => {
                          return (
                              <SwiperSlide key={comment._id}>
                                  <CommentSlide comment={comment} />
                              </SwiperSlide>
                          );
                      })
                    : Array.from(new Array(7).keys()).map((dumbElement) => {
                          return (
                              <SwiperSlide key={dumbElement}>
                                  <li className="full-size loading-pulse flex max-h-[150px] min-h-[150px] w-full cursor-grab flex-col justify-between rounded-2xl bg-white/10 px-4 py-3"></li>
                              </SwiperSlide>
                          );
                      })}
            </Swiper>
        </ul>
    );
}

export default memo(RecentlyComments);
