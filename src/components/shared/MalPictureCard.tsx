import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import { memo, useState } from 'react';
import PictureModal from '~/components/shared/PictureModal';

interface MalPictureCardProps {
    smallImg: string;
    largeImg: string;
}

function MalPictureCard({ smallImg, largeImg }: MalPictureCardProps) {
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <figure
                onClick={() => setShowModal(true)}
                className="relative overflow-hidden rounded-lg hover:cursor-pointer"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    className="h-max w-auto rounded-lg transition-all duration-200 hover:scale-95 hover:cursor-pointer"
                    src={smallImg}
                    alt="comic-picture"
                />

                <div className="absolute-center absolute inset-0 h-full w-full bg-black text-white opacity-0 transition-all duration-300 hover:scale-125 hover:opacity-30">
                    <ArrowsPointingOutIcon className="h-16 w-16" />
                </div>
            </figure>

            <PictureModal
                modalState={showModal}
                handleCloseModal={handleCloseModal}
                imgSrc={largeImg}
            />
        </>
    );
}

export default memo(MalPictureCard);
