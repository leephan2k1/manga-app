import { memo } from 'react';
import Image from 'next/image';
import { Author } from '~/types';

interface AuthorQuickInfoProps {
    author: Author;
}

function AuthorQuickInfo({ author }: AuthorQuickInfoProps) {
    return (
        <div className="flex flex-col items-center justify-center space-y-6">
            <figure className="relative h-[10rem] w-[10rem] overflow-hidden rounded-full md:h-[15rem] md:w-[15rem]">
                <Image
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    alt="author-avatar"
                    layout="fill"
                    priority
                    src={
                        author?.avatar
                            ? author.avatar
                            : 'https://i.ibb.co/1qQJr6S/blank-user.png'
                    }
                />
            </figure>
            <h1 className="text-center font-secondary text-4xl font-bold md:text-5xl">
                {author?.name}
            </h1>

            <button
                disabled
                className="smooth-effect w-[20rem] rounded-xl bg-primary py-4 hover:bg-primary/70"
            >
                Theo dõi
            </button>
        </div>
    );
}

export default memo(AuthorQuickInfo);
