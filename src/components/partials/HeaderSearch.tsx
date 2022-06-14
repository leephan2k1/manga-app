import { useRecoilState } from 'recoil';
import { searchModalState } from '~/atoms/searchModelAtom';
import Link from 'next/link';
import { MANGA_BROWSE_PAGE } from '~/constants';

import { AdjustmentsIcon, SearchIcon } from '@heroicons/react/solid';

interface HeaderSearchProps {
    styles?: string;
}

export default function HeaderSearch({ styles }: HeaderSearchProps) {
    const [_, setShowModal] = useRecoilState(searchModalState);

    return (
        <form
            className={`${styles} ml-16 flex h-[40%] w-fit items-center justify-between rounded-2xl  bg-white shadow-xl shadow-white/20 lg:w-[68%]`}
        >
            {/* advanced search  */}
            <button className="mx-4 hidden rounded-xl bg-rose-300 px-2 py-1 text-rose-600 transition-all hover:bg-rose-500 hover:text-white/80 md:block">
                <Link href={`/${MANGA_BROWSE_PAGE}`}>
                    <a>
                        <AdjustmentsIcon className="h-8 w-8" />
                    </a>
                </Link>
            </button>

            {/* search input  */}
            <input
                readOnly
                className="hidden w-[80%] bg-transparent md:block"
                placeholder="Tìm manga..."
                onClick={() => {
                    setShowModal(true);
                }}
            />

            {/* search button */}
            <div
                className="h-full w-fit rounded-2xl p-4 hover:cursor-pointer hover:opacity-60 lg:text-background"
                onClick={() => {
                    setShowModal(true);
                }}
            >
                <SearchIcon className="h-8 w-8" />
            </div>
        </form>
    );
}
