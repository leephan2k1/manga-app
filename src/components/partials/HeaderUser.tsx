import { BiUser } from 'react-icons/bi';

export default function HeaderUser() {
    return (
        <button className="absolute-center h-20 w-20 overflow-hidden rounded-full bg-secondary text-white hover:bg-white/10">
            <BiUser className="h-16 w-16" />
        </button>
    );
}
