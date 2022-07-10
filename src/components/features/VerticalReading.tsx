import { memo, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { chapterList } from '~/atoms/chapterListAtom';
import { SOURCE_COLLECTIONS } from '~/constants';
import useSettingsMode from '~/context/SettingsContext';
import { ImagesChapter } from '~/types';

import Img from '../shared/Img';

interface VerticalReadingProps {
    images: ImagesChapter[];
    srcId: string;
    useProxy?: boolean;
    matchesTouchScreen: boolean;
    currentPage: number;
    handleSaveCurrentPage: (page: number) => void;
}

function VerticalReading({
    images,
    useProxy,
    srcId,
    matchesTouchScreen,
    currentPage,
    handleSaveCurrentPage,
}: VerticalReadingProps) {
    const url = SOURCE_COLLECTIONS[srcId];
    const chapterState = useRecoilValue(chapterList);

    const settings = useSettingsMode();

    useEffect(() => {
        const refCurrentpage = document.querySelector(`#page-${currentPage}`);

        if (refCurrentpage) {
            refCurrentpage.scrollIntoView();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            className={`${matchesTouchScreen && 'pt-24'} mx-auto w-full ${
                settings?.imageMode === 'fitW' ? 'lg:w-full' : 'lg:w-[60%]'
            }`}
        >
            {images?.length &&
                images.map((img, index) => {
                    return (
                        <div
                            id={`page-${index}`}
                            key={img.id}
                            className={`relative ${
                                chapterState.isWebtoon ? 'my-0' : 'my-4'
                            } h-fit w-full`}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <Img
                                saveCurrentPage={handleSaveCurrentPage}
                                useProxy={useProxy}
                                index={index}
                                url={url}
                                src={img.imgSrc}
                            />
                        </div>
                    );
                })}
        </div>
    );
}

export default memo(VerticalReading);
