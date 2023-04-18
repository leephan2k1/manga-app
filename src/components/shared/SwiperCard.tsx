import classNames from 'classnames';
import Image from 'next/image';
import { memo, useEffect, useRef, useState } from 'react';
import { useSwiper } from 'swiper/react';
import { SOURCE_COLLECTIONS } from '~/constants';
// import { baseURL } from '~/services/axiosClient';
import round_robin_server from '~/utils/proxyBalancer';

interface SwiperCardProps {
    imgSrc: string;
    style?: string;
    childStyle?: string;
}

const url = SOURCE_COLLECTIONS['NTC'];

function SwiperCard({ imgSrc, style, childStyle }: SwiperCardProps) {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const swiper = useSwiper();
    const [triggerEffect, setTriggerEffect] = useState(false);

    useEffect(() => {
        swiper.on('slideChange', () => {
            setTriggerEffect((prevState) => !prevState);
        });

        return () => {
            setTriggerEffect((prevState) => !prevState);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div key={String(triggerEffect)} className={classNames(style)}>
            <div
                ref={cardRef}
                className={classNames(childStyle, 'magictime', 'vanishIn')}
            >
                <Image
                    priority
                    className="absolute inset-0 object-cover object-center"
                    alt="image-preview"
                    src={`${round_robin_server()}/proxy?url=${url}&src=${imgSrc}`}
                    layout="fill"
                />
            </div>
        </div>
    );
}

export default memo(SwiperCard);
