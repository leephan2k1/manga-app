import { memo } from 'react';
import Image from 'next/image';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { MANGA_AUTHOR_PATH } from '~/constants';
import { Author } from '~/types';

interface AuthorItemProps {
    author: Author;
}

function AuthorItem({ author }: AuthorItemProps) {
    return (
        <Link
            href={`/${MANGA_AUTHOR_PATH}/${encodeURIComponent(author?.name)}`}
        >
            <a className="smooth-effect flex flex-col items-center space-y-6 rounded-2xl bg-highlight p-4 hover:scale-95">
                <div className="absolute-center h-[15rem]">
                    <figure className="relative h-[10rem] w-[10rem] overflow-hidden rounded-full px-2">
                        {author?.avatar === '' ? (
                            <UserCircleIcon className="full-size" />
                        ) : (
                            <Image
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                alt="author-avatar"
                                layout="fill"
                                priority
                                src={author?.avatar}
                            />
                        )}
                    </figure>
                </div>

                <h1 className="font-secondary text-2xl line-clamp-1 md:text-3xl">
                    {author?.name}
                </h1>
            </a>
        </Link>
    );
}

export default memo(AuthorItem);
