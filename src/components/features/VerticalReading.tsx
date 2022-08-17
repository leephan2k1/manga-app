import { memo, useEffect } from 'react';
import { SOURCE_COLLECTIONS } from '~/constants';
import useSettingsMode from '~/context/SettingsContext';
import { Page } from '~/types';

import VerticalImages from '../shared/VerticalImages';

interface VerticalReadingProps {
    images: Page[];
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
            <VerticalImages
                handleSaveCurrentPage={handleSaveCurrentPage}
                images={images}
                url={url}
                useProxy={useProxy}
            />
        </div>
    );
}

export default memo(VerticalReading);
