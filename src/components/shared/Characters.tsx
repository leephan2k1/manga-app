import CharacterCard from '~/components/shared/CharacterCard';
import { Character } from '~/types';
import { EmojiSadIcon } from '@heroicons/react/outline';

interface CharactersProps {
    characters: Character[];
}

export default function Characters({ characters }: CharactersProps) {
    return (
        <div className="animate__fadeIn animate__animated grid h-fit w-full grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:gap-6 lg:py-6">
            {characters && characters.length ? (
                characters.map((character) => {
                    return (
                        <CharacterCard
                            key={character._id}
                            characterCover={character.cover}
                            characterName={character.name}
                            characterRole={character.role}
                        />
                    );
                })
            ) : (
                <h1 className="flex text-white ">
                    Hiện tại chưa có thông tin về nhân vật{' '}
                    <EmojiSadIcon className="mx-2 h-8 w-8" />
                </h1>
            )}
        </div>
    );
}
