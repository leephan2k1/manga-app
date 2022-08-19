import { memo } from 'react';
import dynamic from 'next/dynamic';
import Section from '~/components/shared/Section';
import { ViewSelection, Description } from '~/types';

const Characters = dynamic(
    () =>
        import('~/components/shared/Characters', {
            ssr: false,
        } as ImportCallOptions),
);

const MalPictures = dynamic(
    () =>
        import('~/components/shared/MalPictures', {
            ssr: false,
        } as ImportCallOptions),
);

const MalDetails = dynamic(
    () =>
        import('~/components/shared/MalDetails', {
            ssr: false,
        } as ImportCallOptions),
);

interface DetailedCategory {
    viewSelection: ViewSelection;
    description: Description;
}

function DetailedCategory({ viewSelection, description }: DetailedCategory) {
    console.log(viewSelection);
    return (
        <Section>
            {viewSelection === 'Characters' && (
                <Characters characters={description.characters} />
            )}
            {viewSelection === 'Details' && <MalDetails desc={description} />}
            {viewSelection === 'Pictures' && (
                <MalPictures pictures={description.pictures} />
            )}
        </Section>
    );
}

export default memo(DetailedCategory);
