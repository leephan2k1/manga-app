import Image from 'next/image';
import Link from 'next/link';
import NProgress from 'nprogress';
import { memo, MouseEvent, useState } from 'react';
import { BiGlasses } from 'react-icons/bi';
import { useMediaQuery } from 'usehooks-ts';
import ImageWraper from '~/components/shared/ImageWrapper';
import {
    MANGA_PATH_DETAILS_NAME,
    MANGA_PATH_NAME,
    PROXY_SERVER,
    SOURCE_COLLECTIONS,
} from '~/constants';
import useChapters from '~/hooks/useChapters';
// import { baseURL } from '~/services/axiosClient';
import { Comic } from '~/types';

import {
    ClipboardIcon,
    ClockIcon,
    InformationCircleIcon,
    SignalIcon,
} from '@heroicons/react/24/outline';

interface SectionSwiperCardProps {
    manga?: Comic;
}

const url = SOURCE_COLLECTIONS['nt'];

function SectionSwiperCard({ manga }: SectionSwiperCardProps) {
    const chapters = useChapters();
    const matches = useMediaQuery('(min-width: 1259px)');
    const [showPreview, setShowPreview] = useState(false);

    const handleGoToFirstChapter = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const mangaSlug = e.currentTarget.dataset.id;

        if (mangaSlug) chapters.goToFirstChapter(mangaSlug);
    };

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
            {manga ? (
                <>
                    <Link
                        href={{
                            pathname: `/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${encodeURIComponent(
                                manga.slug,
                            )}`,
                        }}
                    >
                        <a
                            onClick={() => {
                                NProgress.start();
                            }}
                        >
                            <ImageWraper>
                                <Image
                                    priority
                                    className="fancy-fade-in absolute inset-0 rounded-xl object-cover object-center"
                                    alt="manga-thumbnail"
                                    src={`${PROXY_SERVER}/proxy?url=${url}&src=${manga.thumbnail}`}
                                    layout="fill"
                                />
                            </ImageWraper>
                        </a>
                    </Link>

                    <span className="absolute top-2 left-2 h-fit w-fit rounded-xl bg-white bg-opacity-40 px-4 py-2 text-base backdrop-blur-md md:text-xl lg:text-3xl">
                        {manga.newChapter}
                    </span>
                    {matches && showPreview && (
                        <div className="animate__faster animate__animated animate__fadeIn flex h-full w-full flex-col space-y-2 overflow-hidden rounded-xl bg-highlight text-white">
                            <Link
                                href={{
                                    pathname: `/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${encodeURIComponent(
                                        manga.slug,
                                    )}`,
                                }}
                            >
                                <a
                                    onClick={() => {
                                        NProgress.start();
                                    }}
                                >
                                    <h3 className="ml-4 mt-4 min-h-[40px] text-[100%] font-semibold line-clamp-2 hover:text-primary">
                                        {manga.name}
                                    </h3>
                                </a>
                            </Link>
                            <p className="ml-4 flex flex-nowrap items-center">
                                <ClipboardIcon className="h-6 w-6" />
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
                                <SignalIcon className="h-6 w-6" />{' '}
                                <span className="ml-2 text-[90%]">
                                    {manga.status}
                                </span>
                            </p>

                            <div className="flex h-fit w-full flex-col items-center space-y-4 py-6">
                                <button
                                    data-id={manga.slug}
                                    onClick={handleGoToFirstChapter}
                                    className="flex w-fit items-center justify-center space-x-4 rounded-xl bg-primary py-2 px-4 transition-all hover:scale-[110%]"
                                >
                                    <BiGlasses /> <span>Đọc ngay</span>
                                </button>
                                <button className="flex w-fit items-center justify-center space-x-4 rounded-xl bg-white py-2 px-4 text-gray-700 transition-all hover:scale-[110%]">
                                    <InformationCircleIcon className="h-6 w-6" />{' '}
                                    <Link
                                        href={{
                                            pathname: `/${MANGA_PATH_NAME}/${MANGA_PATH_DETAILS_NAME}/${encodeURIComponent(
                                                manga.slug,
                                            )}`,
                                        }}
                                    >
                                        <a
                                            onClick={() => {
                                                NProgress.start();
                                            }}
                                        >
                                            Thông tin
                                        </a>
                                    </Link>
                                </button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="loading-pulse h-full w-full rounded-xl bg-white/20"></div>
            )}
        </div>
    );
}

export default memo(SectionSwiperCard);
