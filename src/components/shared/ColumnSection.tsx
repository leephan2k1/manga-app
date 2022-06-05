import Image from 'next/image';
import { memo } from 'react';
import { BsDot } from 'react-icons/bs';
import { Manga } from '~/types';

import { ChevronRightIcon } from '@heroicons/react/outline';

interface ColumnSectionProps {
    title?: string;
    mangaList: Manga[];
}

function ColumnSection({ title, mangaList }: ColumnSectionProps) {
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
                                key={manga.slug}
                                className="flex w-full px-4 py-2 odd:bg-hight-light/40"
                            >
                                <figure className="relative h-[80px] min-h-[80px] w-[60px] min-w-[60px] overflow-hidden rounded-xl">
                                    <Image
                                        className="aspect-w-3 aspect-h-4 absolute object-cover object-center"
                                        layout="fill"
                                        alt="img-preview"
                                        src={manga.thumbnail}
                                    />
                                </figure>
                                <div className="flex w-full flex-col justify-center space-y-2 pl-4 ">
                                    <h3 className="font-secondary text-2xl font-semibold transition-all line-clamp-1 hover:cursor-pointer hover:text-primary md:text-3xl">
                                        {manga.name}
                                    </h3>
                                    <h4 className="text-lg">Chapter 255</h4>
                                    <ul className="flex items-center text-base line-clamp-1 lg:text-xl">
                                        {manga.genres.map((genre, idx) => {
                                            return (
                                                <li
                                                    className="inline-block"
                                                    key={idx}
                                                >
                                                    <span>{genre}</span>
                                                    {genre[idx + 1] ? (
                                                        <span>
                                                            <BsDot className="inline-block" />
                                                        </span>
                                                    ) : null}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </li>
                        );
                    })}

                <li className="flex w-full items-center justify-center rounded-xl py-4 px-4 transition-all hover:cursor-pointer hover:bg-hight-light">
                    <button className="lg:text-3xl">Xem thêm</button>
                    <ChevronRightIcon className="h-8 w-8" />
                </li>
            </ul>
        </div>
    );
}

export default memo(ColumnSection);
