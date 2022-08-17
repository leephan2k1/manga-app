import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import { BsDot } from 'react-icons/bs';
import {
    MANGA_PATH_DETAILS_NAME,
    MANGA_PATH_NAME,
    SOURCE_COLLECTIONS,
} from '~/constants';
import { baseURL } from '~/services/axiosClient';
import { Comic } from '~/types';
import { isExactMatch } from '~/utils/stringHandler';

import { ChevronRightIcon } from '@heroicons/react/outline';

interface ColumnSectionProps {
    title?: string;
    link: string;
    mangaList: Comic[];
}

const url = SOURCE_COLLECTIONS['nt'];

function ColumnSection({ title, mangaList, link }: ColumnSectionProps) {
    return (
        <div className="w-full rounded-xl bg-deep-black pb-4 lg:my-4">
            {title && (
                <h2 className="my-6 whitespace-nowrap text-center font-secondary text-3xl text-white lg:text-[160%]">
                    {title}
                </h2>
            )}
            <ul className="w-full space-y-4 overflow-hidden text-white">
                {mangaList &&
                    mangaList.length &&
                    mangaList.map((manga) => {
                        return (
                            <li
                                key={manga._id}
                                className="flex w-full px-4 py-2 odd:bg-highlight/40"
                            >
                                <Link
                                    href={{
                                        pathname: `/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${encodeURIComponent(
                                            manga.slug,
                                        )}`,
                                    }}
                                >
                                    <a>
                                        <figure className="relative h-[80px] min-h-[80px] w-[60px] min-w-[60px] overflow-hidden rounded-xl">
                                            <Image
                                                priority
                                                className="aspect-w-3 aspect-h-4 absolute object-cover object-center"
                                                layout="fill"
                                                alt="img-preview"
                                                src={
                                                    isExactMatch(
                                                        manga?.thumbnail,
                                                        'res.cloudinary.com',
                                                    )
                                                        ? manga?.thumbnail
                                                        : `${baseURL}/proxy?url=${url}&src=${manga.thumbnail}`
                                                }
                                            />
                                        </figure>
                                    </a>
                                </Link>

                                <div className="flex w-full flex-col justify-center space-y-2 pl-4 ">
                                    <Link
                                        href={{
                                            pathname: `/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${encodeURIComponent(
                                                manga.slug,
                                            )}`,
                                        }}
                                    >
                                        <a>
                                            <h3 className="font-secondary text-2xl font-semibold transition-all line-clamp-1 hover:cursor-pointer hover:text-primary md:text-3xl">
                                                {manga.name}
                                            </h3>
                                        </a>
                                    </Link>

                                    <h4 className="text-lg">
                                        {manga.newChapter}
                                    </h4>
                                    <ul className="flex items-center text-base line-clamp-1 lg:text-xl">
                                        {manga.genres.map((genre, idx) => {
                                            if (!genre) return;

                                            return (
                                                <li
                                                    className="inline-block"
                                                    key={genre._id}
                                                >
                                                    <span>{genre.label}</span>
                                                    {idx !==
                                                        manga.genres.length -
                                                            1 && (
                                                        <span>
                                                            <BsDot className="inline-block" />
                                                        </span>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </li>
                        );
                    })}

                <li className="flex w-full items-center justify-center rounded-xl py-4 px-4 transition-all hover:cursor-pointer hover:bg-highlight">
                    <button className="lg:text-3xl">
                        <Link href={link}>
                            <a>Xem thêm</a>
                        </Link>
                    </button>
                    <ChevronRightIcon className="h-8 w-8" />
                </li>
            </ul>
        </div>
    );
}

export default memo(ColumnSection);
