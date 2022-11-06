import { searchModalState } from '~/atoms/searchModelAtom';
import Link from 'next/link';
import { MANGA_BROWSE_PAGE } from '~/constants';
import { useSetAtom } from 'jotai';
import {
    AdjustmentsVerticalIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';

interface HeaderSearchProps {
    styles?: string;
}

export default function HeaderSearch({ styles }: HeaderSearchProps) {
    const setShowModal = useSetAtom(searchModalState);

    return (
        <div
            className={`${styles} ml-16 flex h-[40%] w-fit items-center justify-between rounded-2xl  bg-highlight text-white lg:w-[68%]`}
        >
            {/* advanced search  */}
            <button className="mx-4 hidden rounded-xl bg-rose-300 px-2 py-1 text-rose-600 transition-all hover:bg-rose-500 hover:text-white/80 md:block">
                <Link href={`/${MANGA_BROWSE_PAGE}`}>
                    <a>
                        <AdjustmentsVerticalIcon className="h-8 w-8" />
                    </a>
                </Link>
            </button>

            {/* search input  */}
            <input
                readOnly
                className="hidden w-[80%] bg-transparent placeholder:text-white md:block"
                placeholder="Tìm truyện..."
                onClick={() => {
                    setShowModal(true);
                }}
            />

            {/* search button */}
            <button
                className="h-full w-fit rounded-2xl p-4 hover:cursor-pointer hover:opacity-60"
                onClick={() => {
                    setShowModal(true);
                }}
            >
                <MagnifyingGlassIcon className="h-8 w-8" />
            </button>
        </div>
    );
}
