import { SearchIcon, AdjustmentsIcon } from '@heroicons/react/solid';

interface HeaderSearchProps {
    styles?: string;
}

export default function HeaderSearch({ styles }: HeaderSearchProps) {
    return (
        <form
            className={`${styles} ml-16 flex h-[40%] w-fit items-center justify-between rounded-2xl  bg-white shadow-xl shadow-white/20 hover:shadow-cyan-500/30 lg:w-[68%]`}
        >
            {/* advanced search  */}
            <button className="mx-4 hidden rounded-xl bg-rose-300 px-2 py-1 text-rose-600 transition-all hover:bg-rose-500 hover:text-white/80 md:block">
                <AdjustmentsIcon className="h-8 w-8" />
            </button>

            {/* search input  */}
            <input
                type="text"
                className="hidden w-[80%] md:block"
                placeholder="Tìm manga..."
            />

            {/* search button  */}
            <button className="h-full w-fit rounded-2xl p-4 hover:opacity-60 lg:text-background">
                <SearchIcon className="h-8 w-8" />
            </button>
        </form>
    );
}
