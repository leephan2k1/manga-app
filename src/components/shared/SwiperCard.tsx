import classNames from 'classnames';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useSwiper } from 'swiper/react';
import { SOURCE_COLLECTIONS } from '~/constants';
// import { baseURL } from '~/services/axiosClient';
import { isExactMatch } from '~/utils/stringHandler';
import { PROXY_SERVER } from '~/constants';

interface SwiperCardProps {
    imgSrc: string;
    style?: string;
    childStyle?: string;
}

const url = SOURCE_COLLECTIONS['nt'];

export default function SwiperCard({
    imgSrc,
    style,
    childStyle,
}: SwiperCardProps) {
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
                    src={
                        isExactMatch(imgSrc, 'res.cloudinary.com')
                            ? imgSrc
                            : `${PROXY_SERVER}/proxy?url=${url}&src=${imgSrc}`
                    }
                    layout="fill"
                />
            </div>
        </div>
    );
}
