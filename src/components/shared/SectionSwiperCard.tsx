import Image from 'next/image';
import Link from 'next/link';
import { memo, useState } from 'react';
import { BiGlasses } from 'react-icons/bi';
import { useMediaQuery } from 'usehooks-ts';
import {
    MANGA_PATH_NAME,
    MANGA_PATH_DETAILS_NAME,
    MANGA_PATH_READ_NAME,
} from '~/constants';
import { Manga } from '~/types';

import {
    ClipboardListIcon,
    ClockIcon,
    InformationCircleIcon,
    StatusOnlineIcon,
} from '@heroicons/react/outline';

interface SectionSwiperCardProps {
    manga: Manga;
}

function SectionSwiperCard({ manga }: SectionSwiperCardProps) {
    const matches = useMediaQuery('(min-width: 1259px)');
    const [showPreview, setShowPreview] = useState(false);

    return (
        <div
            className="aspect-h-4 aspect-w-3 rounded-xl"
            onMouseEnter={() => {
                setShowPreview(true);
            }}
            onMouseLeave={() => {
                setShowPreview(false);
            }}
        >
            <Image
                className="absolute inset-0 rounded-xl object-cover object-center"
                alt="manga-thumbnail z-50"
                src={manga.thumbnail}
                layout="fill"
            />
            <span className="absolute top-2 left-2 h-fit w-fit rounded-xl bg-white bg-opacity-40 px-4 py-2 text-base backdrop-blur-md md:text-xl lg:text-3xl">
                {manga.newChapter}
            </span>
            {matches && showPreview && (
                <div className="animate__faster animate__animated animate__fadeIn flex h-full w-full flex-col space-y-2 overflow-hidden rounded-xl bg-hight-light text-white">
                    <h3 className="ml-4 mt-4 min-h-[40px] text-[100%] font-semibold line-clamp-2">
                        {manga.name}
                    </h3>
                    <p className="ml-4 flex flex-nowrap items-center">
                        <ClipboardListIcon className="h-6 w-6" />
                        <span className="ml-2 text-[90%] line-clamp-1">
                            {manga.newChapter}
                        </span>
                    </p>
                    <p className="ml-4 flex items-center">
                        <ClockIcon className="h-6 w-6" />{' '}
                        <span className="ml-2 text-[90%]">
                            {manga.updatedAt}
                        </span>
                    </p>
                    <p className="ml-4 flex items-center">
                        <StatusOnlineIcon className="h-6 w-6" />{' '}
                        <span className="ml-2 text-[90%]">{manga.status}</span>
                    </p>

                    <div className="flex h-fit w-full flex-col items-center space-y-4 py-6">
                        <button className="flex w-fit items-center justify-center space-x-4 rounded-xl bg-primary py-2 px-4 transition-all hover:scale-[110%]">
                            <BiGlasses />{' '}
                            <Link
                                href={`/${MANGA_PATH_NAME}/${MANGA_PATH_READ_NAME}/${encodeURIComponent(
                                    manga.slug,
                                )}`}
                            >
                                <a>Đọc ngay</a>
                            </Link>
                        </button>
                        <button className="flex w-fit items-center justify-center space-x-4 rounded-xl bg-white py-2 px-4 text-gray-700 transition-all hover:scale-[110%]">
                            <InformationCircleIcon className="h-6 w-6" />{' '}
                            <Link
                                href={`/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${encodeURIComponent(
                                    manga.slug,
                                )}`}
                            >
                                <a>Thông tin</a>
                            </Link>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default memo(SectionSwiperCard);
