import LogoSVG from '/public/images/torii-gate-japan.svg';
import Link from 'next/link';
import { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { sidebarState } from '~/atoms/sidebarAtom';
import { MangaGenresPreview, MangaTypesPreview } from '~/constants';

import { Dialog } from '@headlessui/react';
// eslint-disable-next-line prettier/prettier
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@heroicons/react/outline';

import TextLogo from '../icons/TextLogo';

export default function Sidebar() {
    const [showSidebar, setShowSidebar] = useRecoilState(sidebarState);

    //prevent sidebar close before adding effects
    const sidebarRef = useRef<HTMLDivElement>(null);
    const handleSidebarClose = () => {
        sidebarRef.current?.classList.remove('animate__fadeInLeft');
        sidebarRef.current?.classList.add('animate__fadeOutLeft');
        setTimeout(() => {
            setShowSidebar(false);
        }, 500);
    };

    return (
        <Dialog
            className="lg:hidden"
            open={showSidebar}
            onClose={handleSidebarClose}
        >
            {/* backdrop */}
            <Dialog.Overlay
                className="fixed inset-0 z-[100] bg-black/30"
                aria-hidden="true"
            />
            <aside
                ref={sidebarRef}
                className={`${
                    showSidebar && 'animate__fadeInLeft'
                } animate__animated animate__faster absolute-center	 fixed inset-0 z-[999] w-[65%] min-w-[230px] bg-secondary p-4 md:w-[40%]`}
            >
                <div className="flex h-full w-full flex-col">
                    {/* control sidebar & logo */}
                    <div className="absolute-center mt-6 flex h-fit w-full items-center justify-between">
                        <button
                            className="absolute-center ml-4 rounded-full bg-hight-light p-4 text-white md:p-5"
                            onClick={handleSidebarClose}
                        >
                            <ChevronLeftIcon className="h-8 w-8 md:h-10 md:w-10" />
                        </button>

                        <div className="absolute-center relative flex-1">
                            <LogoSVG
                                className="md:width-[100px] absolute"
                                width={50}
                                height={50}
                            />
                            <figure className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <TextLogo className="left-1/2 h-[40px] w-[130px] md:h-[50px] md:w-[200px]" />
                            </figure>
                        </div>
                    </div>
                    {/* sidebar list  */}
                    <ul className="mt-4 h-full w-full text-white">
                        {/* list title  */}
                        <li className="mx-4 mt-4 md:mt-8">
                            <h3 className="font-secondary text-3xl md:text-5xl">
                                Truyện tranh
                            </h3>
                        </li>

                        <li className="flex flex-wrap">
                            {MangaTypesPreview.map((item) => (
                                <button
                                    key={item.title}
                                    className="absolute-center ml-4 mt-4 w-fit rounded-xl bg-hight-light py-2 px-4 md:mt-6"
                                >
                                    <Link href={item.href}>
                                        <a className="text-xl md:text-3xl">
                                            {item.title}
                                        </a>
                                    </Link>
                                </button>
                            ))}
                        </li>
                        {/* list title  */}
                        <li className="mx-4 mt-4 border-t-[2px] border-hight-light pt-4 md:mt-8">
                            <h3 className="font-secondary text-3xl md:text-5xl">
                                Thể loại
                            </h3>
                        </li>
                        <li className="grid grid-cols-2">
                            {MangaGenresPreview.map((manga) => {
                                if (manga.title === 'Xem thêm') return null;
                                return (
                                    <button
                                        key={manga.title}
                                        className="ml-4 mt-4 flex w-full items-center rounded-xl py-2 px-4 hover:bg-hight-light md:mt-6"
                                    >
                                        <Link href={'/test'}>
                                            <a className="text-xl md:text-3xl">
                                                {manga.title}
                                            </a>
                                        </Link>
                                    </button>
                                );
                            })}
                            <button className="ml-4 mt-4 flex w-full items-center rounded-xl py-2 px-4 hover:bg-hight-light md:mt-6">
                                <Link href={'/test'}>
                                    <a className="flex items-center text-xl md:text-3xl">
                                        <PlusIcon className="mr-2 h-6 w-6" />{' '}
                                        Xem thêm
                                    </a>
                                </Link>
                            </button>
                        </li>
                        {/* title  */}
                        <li className="mx-4 mt-4 border-t-[2px] border-hight-light pt-4 md:mt-8">
                            <h3 className="font-secondary text-3xl md:text-5xl">
                                <Link href="/justTest">
                                    <a className="flex items-center">
                                        Mới cập nhật
                                        <button className="absolute-center h-full">
                                            <ChevronRightIcon className="ml-2 h-6 w-6" />
                                        </button>
                                    </a>
                                </Link>
                            </h3>
                        </li>
                        {/* title  */}
                        <li className="mx-4 mt-4 border-t-[2px] border-hight-light pt-4 md:mt-8">
                            <h3 className="font-secondary text-3xl md:text-5xl">
                                <Link href="/justTest">
                                    <a className="flex items-center">
                                        Bảng xếp hạng
                                        <button className="absolute-center h-full">
                                            <ChevronRightIcon className="ml-2 h-6 w-6" />
                                        </button>
                                    </a>
                                </Link>
                            </h3>
                        </li>
                    </ul>
                </div>
            </aside>
        </Dialog>
    );
}
