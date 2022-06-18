import { memo } from 'react';
import { SOURCE_COLLECTIONS } from '~/constants';
import { ImagesChapter } from '~/types';

interface ChapterImagesProps {
    images: ImagesChapter[];
    srcId: string;
    useProxy?: boolean;
    matchesTouchScreen: boolean;
}
function ChapterImages({
    images,
    useProxy,
    srcId,
    matchesTouchScreen,
}: ChapterImagesProps) {
    const url = SOURCE_COLLECTIONS[srcId];
    return (
        <div
            className={`${
                matchesTouchScreen && 'pt-24'
            } mx-auto w-full lg:w-[60%]`}
        >
            {images?.length &&
                images.map((img) => {
                    return (
                        <div
                            key={img.id}
                            className="relative my-4 h-fit w-full"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                alt="chapter-img"
                                className="h-full w-full"
                                src={
                                    useProxy
                                        ? `/api/proxy?url=${url}&src=${img.imgSrc}`
                                        : img.imgSrc
                                }
                            />
                        </div>
                    );
                })}
        </div>
    );
}

export default memo(ChapterImages);
