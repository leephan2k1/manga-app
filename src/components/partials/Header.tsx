import LogoSVG from '/public/images/torii-gate-japan.svg';
import classNames from 'classnames';
import { useSetAtom } from 'jotai';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { HiMenuAlt2 } from 'react-icons/hi';
import { sidebarState } from '~/atoms/sidebarAtom';
import {
    MANGA_BROWSE_PAGE,
    MangaGenresPreview,
    MangaTypesPreview,
} from '~/constants';

import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { BellIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
import TextLogo from '../icons/TextLogo';
import DropDown from '../shared/DropDown';
import HeaderNotifications from './HeaderNotifications';
import HeaderSearch from './HeaderSearch';
import HeaderUser from './HeaderUser';
import useSocket from '~/context/SocketContext';

interface HeaderProps {
    style?: string;
}

export default function Header({ style }: HeaderProps) {
    const socketCtx = useSocket();
    const setSidebarState = useSetAtom(sidebarState);
    const [isOpenMangaTypes, setIsOpenMangaTypes] = useState(false);
    const [isOpenMangaGenres, setIsOpenMangaGenres] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const { status } = useSession();

    const handleOpenSidebar = () => {
        setSidebarState(true);
    };

    return (
        <header className={classNames(style)}>
            <div className="mx-auto flex h-full w-full items-center md:max-w-[644px] lg:max-w-[1200px]">
                {/* menu button mobile */}
                <button
                    className="button mx-6 rounded-full p-4 md:m-0 lg:hidden"
                    onClick={handleOpenSidebar}
                >
                    <HiMenuAlt2 className=" text-4xl text-white" />
                </button>

                {/* logo */}
                <div className="relative flex h-full w-56 items-center md:w-80 md:px-6 lg:px-0 lg:pl-6">
                    <figure className="absolute z-10 text-4xl font-semibold text-white md:text-5xl">
                        <Link href="/">
                            <a>
                                <TextLogo className="h-[40px] w-[130px] fill-white md:h-[50px] md:w-[200px]" />
                            </a>
                        </Link>
                    </figure>
                    <div className="absolute left-10 top-auto z-0">
                        <LogoSVG width={50} height={50} />
                    </div>
                </div>

                {/* navigation */}
                <nav>
                    <ul className="ml-32 hidden h-full w-fit items-center space-x-10 font-secondary text-3xl text-white lg:flex">
                        <li className="relative transition-all">
                            <button
                                onMouseEnter={() => {
                                    setIsOpenMangaGenres(true);
                                }}
                                onMouseLeave={() => {
                                    setIsOpenMangaGenres(false);
                                }}
                                className={`flex items-center ${
                                    isOpenMangaGenres && 'text-primary'
                                }`}
                            >
                                Thể loại <ChevronDownIcon className="h-8 w-8" />
                            </button>
                            {/* manga genres drop down  */}
                            <div
                                onMouseEnter={() => {
                                    setIsOpenMangaGenres(true);
                                }}
                                onMouseLeave={() => {
                                    setIsOpenMangaGenres(false);
                                }}
                            >
                                <DropDown
                                    listDropDown={MangaGenresPreview}
                                    show={isOpenMangaGenres}
                                    isMore={true}
                                />
                            </div>
                        </li>
                        <li className="relative transition-all">
                            <button
                                onMouseEnter={() => {
                                    setIsOpenMangaTypes(true);
                                }}
                                onMouseLeave={() => {
                                    setIsOpenMangaTypes(false);
                                }}
                                className={`flex items-center ${
                                    isOpenMangaTypes && 'text-primary'
                                }`}
                            >
                                Truyện tranh{' '}
                                <ChevronDownIcon className="h-8 w-8" />
                            </button>
                            {/* manga type drop down  */}
                            <div
                                onMouseEnter={() => {
                                    setIsOpenMangaTypes(true);
                                }}
                                onMouseLeave={() => {
                                    setIsOpenMangaTypes(false);
                                }}
                            >
                                <DropDown
                                    listDropDown={MangaTypesPreview}
                                    show={isOpenMangaTypes}
                                />
                            </div>
                        </li>
                        <li className="transition-all hover:text-primary  ">
                            <Link href={`/${MANGA_BROWSE_PAGE}?view=newComic`}>
                                <a>Mới cập nhật</a>
                            </Link>
                        </li>
                        <li className="transition-all hover:text-primary  ">
                            <Link href={`/${MANGA_BROWSE_PAGE}?view=all`}>
                                <a>Bảng xếp hạng</a>
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* search & notifications & user */}
                <div className="relative ml-10 flex h-full flex-1 items-center justify-end md:justify-between lg:ml-0">
                    {/* search  */}
                    <HeaderSearch />

                    <button
                        onClick={() => {
                            if (status !== 'authenticated') {
                                toast.error('Đăng nhập để thao tác bạn nhé!');
                                return;
                            }

                            if (socketCtx?.signal) {
                                socketCtx.setSignal(false);
                            }

                            setShowNotifications(true);
                        }}
                        className="relative ml-4 rounded-2xl bg-highlight p-4"
                    >
                        <BellIcon className="h-8 w-8 text-white" />

                        {socketCtx?.signal && (
                            <span className="absolute top-0 right-0 flex h-4 w-4">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                                <span className="relative inline-flex h-4 w-4 rounded-full bg-sky-500"></span>
                            </span>
                        )}
                    </button>

                    <HeaderNotifications
                        shouldShow={showNotifications}
                        setShow={(state: boolean) => {
                            setShowNotifications(state);
                        }}
                    />

                    {/* user  */}
                    <div className="absolute-center mx-4 h-full w-24">
                        <HeaderUser />
                    </div>
                </div>
            </div>
        </header>
    );
}
