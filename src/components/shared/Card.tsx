import classNames from 'classnames';
import { motion, useAnimationControls } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import NProgress from 'nprogress';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import {
    COMIC_GENRES,
    GENRES_NT,
    MANGA_BROWSE_PAGE,
    MANGA_PATH_DETAILS_NAME,
    MANGA_PATH_NAME,
    PROXY_SERVER,
    SOURCE_COLLECTIONS,
    TailwindColors,
} from '~/constants';
// import { baseURL } from '~/services/axiosClient';
import { Manga } from '~/types';
import { randomColors } from '~/utils/randomColors';

import { BookOpenIcon } from '@heroicons/react/24/outline';

import { LayoutDetails } from './ListView';

interface CardProps {
    details: LayoutDetails;
    comic: Manga;
    isLoading: boolean;
}

const animationVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};

const url = SOURCE_COLLECTIONS['nt'];

export default function Card({ details, comic, isLoading }: CardProps) {
    const [loaded, setLoaded] = useState(false);
    const controls = useAnimationControls();

    const commonStyles = `animate__faster animate__animated animate__zoomIn  rounded-2xl  overflow-hidden`;

    useEffect(() => {
        if (loaded) {
            controls.start('visible');
        }
    }, [loaded]);

    if (details === 'details') {
        return (
            <div
                className={classNames(
                    commonStyles,
                    'aspect-w-2 aspect-h-1 bg-deep-black',
                )}
            >
                <div className="flex h-full w-full  ">
                    <figure className="relative h-full w-[35%] hover:cursor-pointer">
                        {isLoading ? (
                            <div className="loading-pulse h-full w-full rounded-xl bg-white/20"></div>
                        ) : (
                            <motion.div
                                className="relative h-full w-full"
                                initial={'hidden'}
                                animate={controls}
                                variants={animationVariants}
                                transition={{ ease: 'easeOut', duration: 1 }}
                                onClick={() => {
                                    NProgress.start();
                                }}
                            >
                                <Link
                                    href={`/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${comic?.slug}`}
                                >
                                    <Image
                                        priority
                                        alt="manga-thumbnail"
                                        layout="fill"
                                        className="absolute inset-0 rounded-xl object-cover object-center"
                                        src={`${PROXY_SERVER}/proxy?url=${url}&src=${comic?.thumbnail}`}
                                        onLoad={() => setLoaded(true)}
                                    />
                                </Link>
                            </motion.div>
                        )}
                    </figure>
                    <div className="flex h-full flex-1 flex-col space-y-4  p-4 text-white">
                        {isLoading ? (
                            <div className="loading-pulse h-full space-y-4">
                                <div className="min-h-[12%] w-full rounded-md bg-white/20"></div>
                                <div className="min-h-[12%] w-full rounded-md bg-white/20"></div>
                                <div className="min-h-[12%] w-full rounded-md bg-white/20"></div>
                                <div className="min-h-[12%] w-full rounded-md bg-white/20"></div>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href={`/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${comic?.slug}`}
                                >
                                    <a
                                        onClick={() => {
                                            NProgress.start();
                                        }}
                                        className="md:space-y-2 xl:space-y-4"
                                    >
                                        <h1 className="fond-bold h-fit min-h-[20px] w-full font-bold transition-all line-clamp-2 hover:text-primary ssm:text-3xl md:text-xl lg:text-3xl">
                                            {comic?.name}
                                        </h1>
                                        <h2 className="h-fit w-full font-light line-clamp-3 ssm:text-xl md:text-sm md:line-clamp-2 lg:line-clamp-3 xl:text-xl">
                                            {comic?.review}
                                        </h2>
                                        <h3 className="text-xs text-gray-300 lg:text-lg">
                                            {comic?.status}
                                        </h3>
                                    </a>
                                </Link>

                                <div className="h-fit w-full flex-1 md:max-h-[15px] lg:h-fit">
                                    <ul className="flex w-full flex-wrap items-center gap-2 overflow-hidden   text-lg md:text-sm xl:text-lg">
                                        {comic?.genres &&
                                            comic.genres.length &&
                                            comic.genres.map((genre, index) => {
                                                if (index > 3 || !genre)
                                                    return null;

                                                return (
                                                    <li
                                                        key={genre || index}
                                                        className="h-fit w-fit overflow-hidden whitespace-nowrap rounded-lg border-[1px] border-gray-400 px-2 transition-all hover:scale-90 hover:cursor-pointer"
                                                        style={{
                                                            color: randomColors(
                                                                TailwindColors,
                                                                index,
                                                            ),
                                                        }}
                                                        onClick={() => {
                                                            NProgress.start();
                                                        }}
                                                    >
                                                        <Link
                                                            href={`/${MANGA_BROWSE_PAGE}?genres=${
                                                                GENRES_NT.find(
                                                                    (item) =>
                                                                        item.label
                                                                            .toLowerCase()
                                                                            .trim() ===
                                                                        genre
                                                                            .toLowerCase()
                                                                            .trim(),
                                                                )?.value ||
                                                                COMIC_GENRES.find(
                                                                    (item) =>
                                                                        item.label
                                                                            .toLowerCase()
                                                                            .trim() ===
                                                                        genre
                                                                            .toLowerCase()
                                                                            .trim(),
                                                                )?.value ||
                                                                ''
                                                            }`}
                                                        >
                                                            <a>{genre}</a>
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (details === 'column') {
        return (
            <div
                className={classNames(
                    commonStyles,
                    'mx-auto h-[100px] w-[95%] bg-deep-black',
                )}
            >
                <div className="flex h-full w-full">
                    <figure className="relative h-full w-[10%] hover:cursor-pointer lg:w-[7%]">
                        {isLoading ? (
                            <Skeleton
                                className="h-full w-full"
                                baseColor="#202020"
                                highlightColor="#2d2d2d"
                            />
                        ) : (
                            <motion.div
                                className="relative h-full w-full"
                                initial={'hidden'}
                                animate={controls}
                                variants={animationVariants}
                                transition={{ ease: 'easeOut', duration: 1 }}
                                onClick={() => {
                                    NProgress.start();
                                }}
                            >
                                <Link
                                    href={`/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${comic?.slug}`}
                                >
                                    <Image
                                        priority
                                        alt="manga-thumbnail"
                                        layout="fill"
                                        className="absolute inset-0 rounded-xl object-cover object-center"
                                        src={`${PROXY_SERVER}/proxy?url=${url}&src=${comic?.thumbnail}`}
                                        onLoad={() => setLoaded(true)}
                                    />
                                </Link>
                            </motion.div>
                        )}
                    </figure>
                    <div className="flex flex-1 p-4 text-white">
                        <div className="h-full w-[75%]">
                            {isLoading ? (
                                <Skeleton
                                    className="rounded-xl font-secondary text-3xl line-clamp-1"
                                    baseColor="#202020"
                                    highlightColor="#2d2d2d"
                                />
                            ) : (
                                <Link
                                    href={`/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${comic?.slug}`}
                                >
                                    <h1
                                        onClick={() => {
                                            NProgress.start();
                                        }}
                                        className="font-secondary text-3xl transition-all line-clamp-1 hover:cursor-pointer hover:text-primary"
                                    >
                                        {comic?.name}
                                    </h1>
                                </Link>
                            )}

                            <div className="h-full flex-1">
                                {isLoading ? (
                                    <Skeleton
                                        className="my-4 flex flex-wrap gap-4 py-4"
                                        baseColor="#202020"
                                        highlightColor="#2d2d2d"
                                    />
                                ) : (
                                    <ul className="flex flex-wrap gap-4 py-4">
                                        {comic?.genres &&
                                            comic.genres.length &&
                                            comic.genres.map((genre, index) => {
                                                if (!genre) return;

                                                return (
                                                    <li
                                                        key={genre || index}
                                                        className="h-fit w-fit rounded-lg border-[1px] border-gray-500 px-2 py-1 text-xl transition-all hover:scale-95"
                                                        style={{
                                                            color: randomColors(
                                                                TailwindColors,
                                                                index,
                                                            ),
                                                        }}
                                                        onClick={() => {
                                                            NProgress.start();
                                                        }}
                                                    >
                                                        <Link
                                                            href={`/${MANGA_BROWSE_PAGE}?genres=${
                                                                GENRES_NT.find(
                                                                    (item) =>
                                                                        item.label
                                                                            .toLowerCase()
                                                                            .trim() ===
                                                                        genre
                                                                            .toLowerCase()
                                                                            .trim(),
                                                                )?.value ||
                                                                COMIC_GENRES.find(
                                                                    (item) =>
                                                                        item.label
                                                                            .toLowerCase()
                                                                            .trim() ===
                                                                        genre
                                                                            .toLowerCase()
                                                                            .trim(),
                                                                )?.value ||
                                                                ''
                                                            }`}
                                                        >
                                                            <a>{genre}</a>
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className="flex h-full w-[25%] items-center">
                            {isLoading ? (
                                <></>
                            ) : (
                                <p className="flex space-x-4">
                                    <BookOpenIcon className="h-8 w-8" />
                                    <span>{comic?.newChapter}</span>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={classNames(commonStyles, 'aspect-w-3 aspect-h-5')}>
            <div className="flex h-full w-full flex-col p-2 text-white lg:p-4">
                <figure className="h-[92%] transition-all hover:scale-90 hover:cursor-pointer">
                    {isLoading ? (
                        <div className="loading-pulse h-full w-full rounded-xl bg-white/20"></div>
                    ) : (
                        <motion.div
                            className="relative h-full w-full"
                            initial={'hidden'}
                            animate={controls}
                            variants={animationVariants}
                            transition={{ ease: 'easeOut', duration: 1 }}
                            onClick={() => {
                                NProgress.start();
                            }}
                        >
                            <Link
                                href={`/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${comic?.slug}`}
                            >
                                <Image
                                    priority
                                    alt="manga-thumbnail"
                                    layout="fill"
                                    className="absolute inset-0 rounded-xl object-cover object-center"
                                    src={`${PROXY_SERVER}/proxy?url=${url}&src=${comic?.thumbnail}`}
                                    onLoad={() => setLoaded(true)}
                                />
                            </Link>
                        </motion.div>
                    )}
                </figure>

                {isLoading ? (
                    <div className="loading-pulse mt-4 h-[10%] w-full rounded-lg bg-white/20"></div>
                ) : (
                    <h1 className="my-2 flex items-center px-4 text-lg transition-all line-clamp-1 hover:text-primary md:text-xl lg:text-2xl">
                        <Link
                            href={`/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${comic?.slug}`}
                        >
                            <a>{comic?.name}</a>
                        </Link>
                    </h1>
                )}
            </div>
        </div>
    );
}
