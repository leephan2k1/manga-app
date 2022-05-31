import LogoSVG from '/public/images/torii-gate-japan.svg';
import { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { sidebarState } from '~/atoms/sidebarAtom';

import { Dialog } from '@headlessui/react';
import { ChevronLeftIcon } from '@heroicons/react/outline';

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
                className="fixed inset-0 bg-black/30"
                aria-hidden="true"
            />
            <aside
                ref={sidebarRef}
                className={`${
                    showSidebar && 'animate__fadeInLeft'
                } animate__animated animate__faster	 absolute-center fixed inset-0 z-[999] w-[65%] bg-secondary p-4 md:w-1/2`}
            >
                <div className="flex min-h-full w-full flex-col">
                    {/* control sidebar & logo */}
                    <div className="absolute-center mt-6 flex h-fit w-full items-center justify-between">
                        <button
                            className="absolute-center ml-4 rounded-full bg-hight-light p-4 text-white md:p-6"
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
                </div>
            </aside>
        </Dialog>
    );
}
