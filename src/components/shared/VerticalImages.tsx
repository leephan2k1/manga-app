import { memo } from 'react';
import { Page } from '~/types';
import Img from '../shared/Img';

interface VerticalImagesProps {
    images: Page[];
    isWebtoon?: boolean;
    useProxy?: boolean;
    url: string;
    handleSaveCurrentPage: (page: number) => void;
}

function VerticalImages({
    images,
    useProxy,
    url,
    handleSaveCurrentPage,
}: VerticalImagesProps) {
    return (
        <>
            {images?.length &&
                images.map((img, index) => {
                    return (
                        <div
                            id={`page-${index}`}
                            key={img.id}
                            className={`relative h-fit w-full`}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <Img
                                saveCurrentPage={handleSaveCurrentPage}
                                useProxy={useProxy}
                                index={index}
                                url={url}
                                src={img.src}
                                fallbackSrc={img?.fallbackSrc}
                            />
                        </div>
                    );
                })}
        </>
    );
}
export default memo(VerticalImages);
