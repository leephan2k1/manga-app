import classNames from 'classnames';
import { useSwiper } from 'swiper/react';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface SwiperButtonProps {
    type: 'next' | 'prev';
    styleButton?: string;
    styleIcon?: string;
}

export default function SwiperButton({
    type,
    styleButton,
    styleIcon,
}: SwiperButtonProps) {
    const swiper = useSwiper();

    const handleClickButton = () => {
        if (type === 'next') {
            swiper.slideNext();
        } else {
            swiper.slidePrev();
        }
    };

    return (
        <button className={classNames(styleButton)} onClick={handleClickButton}>
            {type === 'next' ? (
                <ChevronRightIcon className={styleIcon} />
            ) : (
                <ChevronLeftIcon className={styleIcon} />
            )}
        </button>
    );
}
