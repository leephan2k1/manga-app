import torriGate from '/public/images/torri-gate.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useRecoilState } from 'recoil';
import { followModal } from '~/atoms/followModaAtom';
import {
    MANGA_BROWSE_PAGE,
    MANGA_PATH_NAME,
    MANGA_PATH_READ_NAME,
} from '~/constants';
import { MangaDetails } from '~/types';

import { BookmarkIcon, BookOpenIcon } from '@heroicons/react/outline';
import { LightningBoltIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

interface DetailsInfoProps {
    manga: MangaDetails;
    isLoading: boolean;
    comicSlug: string;
}

function DetailsInfo({ manga, isLoading, comicSlug }: DetailsInfoProps) {
    const [_, setShowModal] = useRecoilState(followModal);
    const router = useRouter();
    const { status } = useSession();

    const handleShowFollowModal = () => {
        if (status === 'unauthenticated') {
            router.push('/login');
            return;
        }

        setShowModal(true);
    };

    return (
        <div className="flex h-full w-full flex-col items-center overflow-x-hidden md:flex-row md:items-start">
            {/* manga thumbnail  */}
            <div className="mt-4 w-[50%] md:w-[250px] md:min-w-[250px]">
                {isLoading ? (
                    <Skeleton
                        inline={true}
                        baseColor="#202020"
                        highlightColor="#444"
                        className="aspect-w-3 aspect-h-5 relative"
                        style={{
                            borderRadius: '2%',
                        }}
                    />
                ) : (
                    <figure className="aspect-w-3 aspect-h-5 relative rounded-2xl">
                        <Image
                            className="absolute inset-0 rounded-2xl object-cover object-center"
                            layout="fill"
                            alt="manga-thumbnail"
                            src={manga?.thumbnail || torriGate}
                        />
                    </figure>
                )}
            </div>
            {/* manga desc*/}
            <div className="flex h-full w-full flex-col justify-center p-4  text-white md:min-h-[430px] lg:ml-4">
                <div className="w-full space-y-4 text-center md:ml-2 md:text-left lg:w-[80%]">
                    {isLoading ? (
                        <>
                            <Skeleton
                                inline={true}
                                baseColor="#202020"
                                highlightColor="#444"
                                className="my-2 h-[35px] overflow-hidden"
                            />
                            <Skeleton
                                inline={true}
                                baseColor="#202020"
                                highlightColor="#444"
                                className="my-2 max-w-[50%] md:min-h-[28px]"
                            />
                            <Skeleton
                                inline={true}
                                baseColor="#202020"
                                highlightColor="#444"
                                className="my-2 max-w-[30%] md:min-h-[28px]"
                            />

                            <Skeleton
                                inline={true}
                                baseColor="#202020"
                                highlightColor="#444"
                                className="my-2 max-w-[25%] md:min-h-[28px]"
                            />
                        </>
                    ) : (
                        <>
                            <h1
                                className={`font-secondary  font-bold leading-none ${
                                    manga?.title.length < 40
                                        ? 'text-[6.5vw] md:text-[5.5vw] lg:text-[3.5vw]'
                                        : 'text-[5.5vw] md:text-[3.5vw] lg:text-[2.5vw]'
                                }`}
                            >
                                {manga?.title}
                            </h1>
                            <h2 className="text-[3vw] md:min-h-[28px] md:text-[2vw] lg:text-[1.2vw]">
                                {manga?.otherName !== 'undefined'
                                    ? manga?.otherName
                                    : ''}
                            </h2>
                            <h3 className="text-center text-[3vw] md:text-left md:text-[2vw] lg:text-[1.1vw]">
                                {manga?.author !== 'undefined'
                                    ? manga?.author
                                    : ''}
                            </h3>
                            <h4 className="flex items-center justify-center gap-4 md:justify-start">
                                <span
                                    className={`block h-3 w-3 rounded-full ${
                                        manga?.status === 'Đang tiến hành'
                                            ? 'bg-green-500'
                                            : 'bg-cyan-500'
                                    } `}
                                ></span>
                                {manga?.status}
                            </h4>
                        </>
                    )}
                </div>
                <div className="mt-4 flex flex-col-reverse gap-2 md:flex-col">
                    {isLoading ? (
                        <Skeleton
                            inline={true}
                            baseColor="#202020"
                            highlightColor="#444"
                            className="my-4 max-w-[80%] md:min-h-[50px]"
                        />
                    ) : (
                        <ul className="my-4 flex flex-wrap items-center gap-4">
                            <h3 className="px-2 py-2">Thể loại:</h3>
                            {manga?.genres.length &&
                                manga?.genres.map((genre, idx) => {
                                    return (
                                        <li
                                            key={genre.slug || idx}
                                            className="rounded-xl bg-highlight px-4 py-2"
                                        >
                                            <Link
                                                href={{
                                                    pathname: `/${MANGA_BROWSE_PAGE}`,
                                                    query: {
                                                        genres: genre?.slug,
                                                    },
                                                }}
                                            >
                                                <a>{genre?.genreTitle}</a>
                                            </Link>
                                        </li>
                                    );
                                })}
                        </ul>
                    )}

                    {/* manga interrace  */}
                    <div className="flex h-[150px] w-full flex-col items-center gap-6   md:flex-row md:items-start">
                        <Link
                            href={`/${MANGA_PATH_NAME}/${MANGA_PATH_READ_NAME}/${comicSlug}/${
                                manga?.chapterList.length &&
                                manga?.chapterList[
                                    manga?.chapterList.length - 1
                                ].chapterNumber
                            }/${
                                manga?.chapterList.length &&
                                manga?.chapterList[
                                    manga?.chapterList.length - 1
                                ].chapterId
                            }`}
                        >
                            <a>
                                <button className="pulse-effect-primary absolute-center h-[50px] w-[150px] gap-3 rounded-2xl bg-primary transition-all hover:scale-[110%]">
                                    <BookOpenIcon className="h-8 w-8" /> Đọc
                                    ngay
                                </button>
                            </a>
                        </Link>

                        <Link
                            href={`/${MANGA_PATH_NAME}/${MANGA_PATH_READ_NAME}/${comicSlug}/${
                                manga?.chapterList.length &&
                                manga?.chapterList[0].chapterNumber
                            }/${
                                manga?.chapterList.length &&
                                manga?.chapterList[0].chapterId
                            }`}
                        >
                            <a>
                                <button className="pulse-effect-secondary absolute-center h-[50px] w-[150px] gap-3 rounded-2xl bg-white text-gray-800 transition-all hover:scale-[110%]">
                                    <LightningBoltIcon className="h-8 w-8 text-primary" />{' '}
                                    Chap mới nhất
                                </button>
                            </a>
                        </Link>

                        <button
                            onClick={handleShowFollowModal}
                            className="shine-effect absolute-center bg-hight-light h-[50px] w-[50px] rounded-xl transition-all hover:text-primary"
                        >
                            <BookmarkIcon className=" h-8 w-8" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(DetailsInfo);
