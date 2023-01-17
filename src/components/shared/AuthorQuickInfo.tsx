import { memo } from 'react';
import Image from 'next/image';

function AuthorQuickInfo() {
    return (
        <div className="flex flex-col items-center justify-center space-y-6">
            <figure className="relative h-[10rem] w-[10rem] overflow-hidden rounded-full md:h-[15rem] md:w-[15rem]">
                <Image
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    alt="author-avatar"
                    layout="fill"
                    priority
                    src={
                        'https://cdn.myanimelist.net/images/voiceactors/2/62934.jpg'
                    }
                />
            </figure>
            <h1 className="font-secondary text-4xl font-bold md:text-5xl">
                Himura Kiseki
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
