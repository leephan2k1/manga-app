import Image from 'next/image';

interface CharacterCardProps {
    characterCover: string;
    characterName: string;
    characterRole: string;
}

export default function CharacterCard({
    characterCover,
    characterName,
    characterRole,
}: CharacterCardProps) {
    return (
        <figure className="flex h-40 w-full overflow-hidden rounded-lg bg-black/30 text-white transition-all duration-300 hover:cursor-pointer hover:bg-highlight">
            <div className="relative h-full w-[25%] md:w-[20%] lg:w-[15%]">
                <Image
                    className="absolute inset-0 rounded-xl object-cover object-center"
                    priority
                    src={characterCover}
                    alt="character"
                    layout="fill"
                />
            </div>

            <div className="flex flex-1 flex-col">
                <h1 className="mx-4 my-2 line-clamp-1">{characterName}</h1>
                <h1 className="mx-4 my-2 text-white/50">{characterRole}</h1>
            </div>
        </figure>
    );
}
