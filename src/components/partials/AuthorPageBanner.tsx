import Image from 'next/image';

export default function AuthorPageBanner() {
    return (
        <div className="deslide-cover absolute top-0 -z-10 h-[25rem] min-h-[25rem] w-full md:h-[30rem] md:min-h-[30rem] lg:h-[35rem]">
            <figure className="full-size relative">
                <Image
                    layout="fill"
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    priority
                    src="/images/your-name.gif"
                    alt="author-gif"
                />
            </figure>
        </div>
    );
}
