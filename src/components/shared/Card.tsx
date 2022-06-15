import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import {
    MANGA_PATH_DETAILS_NAME,
    MANGA_PATH_NAME,
    MANGA_BROWSE_PAGE,
    GENRES_NT,
    COMIC_GENRES,
    TailwindColors,
} from '~/constants';
import { Manga } from '~/types';
import { randomColors } from '~/utils/randomColors';

import { BookOpenIcon } from '@heroicons/react/outline';

import { LayoutDetails } from './ListView';

interface CardProps {
    details: LayoutDetails;
    comic: Manga;
    isLoading: boolean;
}

export default function Card({ details, comic, isLoading }: CardProps) {
    const commonStyles = `animate__faster animate__animated animate__zoomIn  rounded-2xl  overflow-hidden`;

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
                            <Skeleton
                                className="h-full w-full"
                                baseColor="#202020"
                                highlightColor="#2d2d2d"
                                inline
                            />
                        ) : (
                            <Link
                                prefetch={false}
                                href={`/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${comic?.slug}`}
                            >
                                <Image
                                    alt="manga-thumbnail"
                                    layout="fill"
                                    className="absolute inset-0 rounded-xl object-cover object-center"
                                    src={comic?.thumbnail}
                                />
                            </Link>
                        )}
                    </figure>
                    <div className="flex h-full flex-1 flex-col space-y-4  p-4 text-white">
                        {isLoading ? (
                            <>
                                <Skeleton
                                    className="fond-bold h-fit min-h-[20px] w-full font-bold line-clamp-2 ssm:text-3xl md:text-xl  lg:text-3xl"
                                    baseColor="#202020"
                                    highlightColor="#2d2d2d"
                                />
                                <Skeleton
                                    className="h-fit w-full font-light line-clamp-3 ssm:text-xl md:text-sm md:line-clamp-2 lg:line-clamp-3 xl:text-xl"
                                    baseColor="#202020"
                                    highlightColor="#2d2d2d"
                                />
                                <Skeleton
                                    className="text-xs text-gray-300 lg:text-lg"
                                    baseColor="#202020"
                                    highlightColor="#2d2d2d"
                                />
                                <Skeleton
                                    className="h-full w-full flex-1  "
                                    baseColor="#202020"
                                    highlightColor="#2d2d2d"
                                />
                            </>
                        ) : (
                            <>
                                <Link
                                    prefetch={false}
                                    href={`/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${comic?.slug}`}
                                >
                                    <a className="md:space-y-2 xl:space-y-4">
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
                                                if (index > 3) return null;

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
                                                    >
                                                        <Link
                                                            prefetch={false}
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
                <div className="flex h-full w-full  ">
                    <figure className="relative h-full w-[10%] hover:cursor-pointer lg:w-[7%]">
                        {isLoading ? (
                            <Skeleton
                                className="h-full w-full flex-1"
                                baseColor="#202020"
                                highlightColor="#2d2d2d"
                            />
                        ) : (
                            <Link
                                prefetch={false}
                                href={`/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${comic?.slug}`}
                            >
                                <Image
                                    alt="manga-thumbnail"
                                    layout="fill"
                                    className="absolute inset-0 rounded-xl object-cover object-center"
                                    src={comic?.thumbnail}
                                />
                            </Link>
                        )}
                    </figure>
                    <div className="flex flex-1   p-4 text-white">
                        <div className="h-full w-[75%]">
                            {isLoading ? (
                                <Skeleton
                                    className="rounded-xl font-secondary text-3xl line-clamp-1"
                                    baseColor="#202020"
                                    highlightColor="#2d2d2d"
                                />
                            ) : (
                                <Link
                                    prefetch={false}
                                    href={`/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${comic?.slug}`}
                                >
                                    <h1 className="font-secondary text-3xl transition-all line-clamp-1 hover:cursor-pointer hover:text-primary">
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
                                                    >
                                                        <Link
                                                            prefetch={false}
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
                <figure className="relative h-[92%] transition-all hover:scale-90 hover:cursor-pointer">
                    {isLoading ? (
                        <Skeleton
                            className="h-full w-full"
                            baseColor="#202020"
                            highlightColor="#2d2d2d"
                        />
                    ) : (
                        <Link
                            prefetch={false}
                            href={`/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${comic?.slug}`}
                        >
                            <Image
                                alt="manga-thumbnail"
                                layout="fill"
                                className="absolute inset-0 rounded-xl object-cover object-center"
                                src={comic?.thumbnail}
                            />
                        </Link>
                    )}
                </figure>

                {isLoading ? (
                    <Skeleton
                        className="mt-4 h-[75%] w-full rounded-2xl"
                        baseColor="#202020"
                        highlightColor="#2d2d2d"
                    />
                ) : (
                    <h1 className="my-2 flex items-center px-4 text-lg transition-all line-clamp-1 hover:text-primary md:text-xl lg:text-2xl">
                        <Link
                            prefetch={false}
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
