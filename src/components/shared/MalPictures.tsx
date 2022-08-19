import { memo } from 'react';
import { DescPicture } from '~/types';

import MalPictureCard from './MalPictureCard';

interface MalPicturesProps {
    pictures: DescPicture[];
}

function MalPictures({ pictures }: MalPicturesProps) {
    return (
        <div className="animate__fadeIn animate__animated h-fit w-full">
            <div className="absolute-center h-fit w-full flex-wrap gap-4 md:gap-6">
                {pictures &&
                    pictures.length &&
                    pictures.map((pic) => {
                        return (
                            <MalPictureCard
                                key={pic._id}
                                smallImg={pic.small}
                                largeImg={pic.large}
                            />
                        );
                    })}
            </div>
        </div>
    );
}

export default memo(MalPictures);
