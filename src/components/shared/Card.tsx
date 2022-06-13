import classNames from 'classnames';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import { TailwindColors } from '~/constants';
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
                    <figure className="relative h-full w-[35%]">
                        {isLoading ? (
                            <Skeleton
                                className="h-full w-full"
                                baseColor="#202020"
                                highlightColor="#2d2d2d"
                                inline
                            />
                        ) : (
                            <Image
                                alt="manga-thumbnail"
                                layout="fill"
                                className="absolute inset-0 rounded-xl object-cover object-center"
                                src={comic?.thumbnail}
                            />
                        )}
                    </figure>
                    <div className="flex h-full flex-1 flex-col space-y-4  p-4 text-white md:space-y-2 xl:space-y-4">
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
                                <h1 className="fond-bold h-fit min-h-[20px] w-full font-bold line-clamp-2 ssm:text-3xl md:text-xl  lg:text-3xl">
                                    {comic?.name}
                                </h1>
                                <h2 className="h-fit w-full font-light line-clamp-3 ssm:text-xl md:text-sm md:line-clamp-2 lg:line-clamp-3 xl:text-xl">
                                    {comic?.review}
                                </h2>
                                <h3 className="text-xs text-gray-300 lg:text-lg">
                                    {comic?.status}
                                </h3>
                                <div className="h-fit w-full flex-1 md:max-h-[15px] lg:h-fit">
                                    <ul className="flex w-full flex-wrap items-center gap-2 overflow-hidden   text-lg md:text-sm xl:text-lg">
                                        {comic?.genres &&
                                            comic.genres.length &&
                                            comic.genres.map((genre, index) => {
                                                if (index > 3) return null;

                                                return (
                                                    <li
                                                        key={genre || index}
                                                        className="h-fit w-fit overflow-hidden whitespace-nowrap rounded-lg border-[1px] border-gray-400 px-2"
                                                        style={{
                                                            color: randomColors(
                                                                TailwindColors,
                                                                index,
                                                            ),
                                                        }}
                                                    >
                                                        {genre}
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
                    <figure className="relative h-full w-[10%] lg:w-[7%]">
                        {isLoading ? (
                            <Skeleton
                                className="h-full w-full flex-1"
                                baseColor="#202020"
                                highlightColor="#2d2d2d"
                            />
                        ) : (
                            <Image
                                alt="manga-thumbnail"
                                layout="fill"
                                className="absolute inset-0 rounded-xl object-cover object-center"
                                src={comic?.thumbnail}
                            />
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
                                <h1 className="font-secondary text-3xl line-clamp-1">
                                    {comic?.name}
                                </h1>
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
                                                        className="h-fit w-fit rounded-lg border-[1px] border-gray-500 px-2 py-1 text-xl"
                                                        style={{
                                                            color: randomColors(
                                                                TailwindColors,
                                                                index,
                                                            ),
                                                        }}
                                                    >
                                                        {genre}
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
                <figure className="relative h-[92%]">
                    {isLoading ? (
                        <Skeleton
                            className="h-full w-full"
                            baseColor="#202020"
                            highlightColor="#2d2d2d"
                        />
                    ) : (
                        <Image
                            alt="manga-thumbnail"
                            layout="fill"
                            className="absolute inset-0 rounded-xl object-cover object-center"
                            src={comic?.thumbnail}
                        />
                    )}
                </figure>

                {isLoading ? (
                    <Skeleton
                        className="mt-4 h-[75%] w-full rounded-2xl"
                        baseColor="#202020"
                        highlightColor="#2d2d2d"
                    />
                ) : (
                    <h1 className="my-2 flex items-center px-4 text-lg line-clamp-1 md:text-xl lg:text-2xl">
                        {comic?.name}
                    </h1>
                )}
            </div>
        </div>
    );
}
