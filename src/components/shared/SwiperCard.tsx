import classNames from 'classnames';
import Image from 'next/image';

interface SwiperCardProps {
    imgSrc: string;
    style?: string;
    childStyle?: string;
}

export default function SwiperCard({
    imgSrc,
    style,
    childStyle,
}: SwiperCardProps) {
    return (
        <div className={classNames(style)}>
            <div className={classNames(childStyle)}>
                <Image
                    className="absolute inset-0 object-cover object-center"
                    alt="image-preview"
                    src={imgSrc}
                    layout="fill"
                />
            </div>
        </div>
    );
}
