import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { useOnClickOutside } from 'usehooks-ts';
import { MANGA_PATH_FOLLOW } from '~/constants';

import { BookmarkIcon, LogoutIcon } from '@heroicons/react/outline';

import Teleport from '../shared/Teleport';

export default function HeaderUser() {
    const router = useRouter();
    const { data: session, status } = useSession();

    const profilePanelRef = useRef<HTMLDivElement | null>(null);
    const [showProfilePanel, setShowProfilePanel] = useState(false);

    const handleClickUserBtn = () => {
        if (status === 'unauthenticated') {
            router.push('/login');
        } else {
            setShowProfilePanel(true);
        }
    };

    const handleClickOutside = () => {
        setShowProfilePanel(false);
    };

    useOnClickOutside(profilePanelRef, handleClickOutside);

    return (
        <div className="relative">
            <button
                style={{
                    backgroundImage: `url(${
                        session?.user?.image ? session?.user?.image : ''
                    })`,
                }}
                onClick={handleClickUserBtn}
                className="absolute-center  h-20 w-20 overflow-hidden rounded-full bg-secondary bg-cover bg-no-repeat text-white hover:bg-white/10"
            >
                {!session?.user?.image && <BiUser className="h-16 w-16" />}
            </button>

            {showProfilePanel && (
                <>
                    <Teleport selector="body">
                        <div className="fixed inset-0 z-[49]" />
                    </Teleport>

                    <div
                        ref={profilePanelRef}
                        className="zoom-animate absolute right-0  z-[500] flex min-h-[250px] w-[200px] flex-col rounded-2xl bg-black text-white shadow-lg md:w-[250px]"
                    >
                        {/* user avatar  */}
                        <div className="absolute-center my-4 h-32 w-full">
                            <figure
                                style={{
                                    backgroundImage: `url(${
                                        session?.user?.image
                                            ? session?.user?.image
                                            : ''
                                    })`,
                                }}
                                className="h-20 w-20 rounded-full bg-cover bg-no-repeat md:h-24 md:w-24"
                            ></figure>
                        </div>

                        {/* user name  */}
                        <h1 className="text-center line-clamp-1">
                            {session?.user?.name}
                        </h1>

                        <div className="absolute-center w-ful">
                            <Link href={`/${MANGA_PATH_FOLLOW}`}>
                                <a onClick={() => setShowProfilePanel(false)}>
                                    <button className="my-4 space-x-2 rounded-xl p-4 transition-all hover:bg-highlight">
                                        <BookmarkIcon className="inline-block h-8 w-8" />
                                        <span>Theo dõi</span>
                                    </button>
                                </a>
                            </Link>
                        </div>

                        <div className="absolute-center w-ful">
                            <button
                                onClick={() => {
                                    handleClickOutside();
                                    signOut({ redirect: false });
                                }}
                                className="space-x-2 rounded-xl p-4 transition-all hover:bg-highlight "
                            >
                                <LogoutIcon className="inline-block h-8 w-8" />
                                <span>Đăng xuất</span>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
