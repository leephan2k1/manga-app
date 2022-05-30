import { SearchIcon } from '@heroicons/react/solid';

interface HeaderSearchProps {
    styles?: string;
}

export default function HeaderSearch({ styles }: HeaderSearchProps) {
    return (
        <div
            className={`${styles} ml-16 flex h-[40%] w-fit items-center justify-end rounded-2xl  bg-white shadow-2xl  lg:w-[68%]`}
        >
            <button className="h-full w-fit rounded-2xl p-4">
                <SearchIcon className="h-8 w-8   lg:text-background" />
            </button>
        </div>
    );
}
