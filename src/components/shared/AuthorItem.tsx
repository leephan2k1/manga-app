import { memo } from 'react';
// import Image from 'next/image';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { MANGA_AUTHOR_PATH } from '~/constants';

function AuthorItem() {
    return (
        <Link href={`/${MANGA_AUTHOR_PATH}`}>
            <a className="flex flex-col items-center space-y-6">
                <figure className="relative h-[10rem] w-[10rem] overflow-hidden rounded-full px-2 md:h-[15rem] md:w-[15rem]">
                    <UserCircleIcon className="full-size" />
                    {/* <Image
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    alt="author-avatar"
                    layout="fill"
                    priority
                    src={'https://i.ibb.co/1qQJr6S/blank-user.png'}
                /> */}
                </figure>

                <h1 className="font-secondary text-2xl line-clamp-1 md:text-3xl">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Magni, facere. Praesentium sapiente iure dolor aperiam.
                    Modi, explicabo voluptas temporibus optio neque pariatur
                    totam enim veniam quidem? Neque autem provident reiciendis?
                </h1>
            </a>
        </Link>
    );
}

export default memo(AuthorItem);
