import { forwardRef, memo } from 'react';
import Img from '~/components/shared/Img';
import { Page } from '~/types';

interface HorizontalImagesProps {
    images: Page[];
    matchesMobile?: boolean;
    width: number;
    handleSaveCurrentPage: (page: number) => void;
    useProxy?: boolean;
    url: string;
}

const HorizontalImages = forwardRef<HTMLDivElement, HorizontalImagesProps>(
    (
        { images, matchesMobile, width, useProxy, url, handleSaveCurrentPage },
        ref,
    ) => {
        return (
            <>
                {images?.length &&
                    images.map((img, index) => {
                        return (
                            <div
                                ref={ref}
                                id={`page-${index}`}
                                key={img.id}
                                style={{
                                    minWidth: `${
                                        matchesMobile ? `${width}px` : ''
                                    }`,
                                }}
                                className={`img-wrapper absolute-center h-screen min-w-[535px] max-w-[600px] touch-auto  transition-all`}
                            >
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
    },
);

HorizontalImages.displayName = 'HorizontalImages';

export default memo(HorizontalImages);
