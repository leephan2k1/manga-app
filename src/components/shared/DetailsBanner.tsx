import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import { PROXY_SERVER, SOURCE_COLLECTIONS } from '~/constants';
import { isExactMatch } from '~/utils/stringHandler';
import torriGate from '/public/images/torri-gate.jpg';

interface DetailsBannerProps {
    imgUrl: string;
    isLoading: boolean;
}

const url = SOURCE_COLLECTIONS['NTC'];

export default function DetailsBanner({
    imgUrl,
    isLoading,
}: DetailsBannerProps) {
    const styles = 'deslide-cover h-full w-full bg-cover bg-top bg-no-repeat';

    return (
        <div className="absolute inset-0 z-0 h-[35%] w-full lg:h-[45%]">
            {isLoading ? (
                <Skeleton
                    className={styles}
                    baseColor="#202020"
                    highlightColor="#444"
                />
            ) : (
                <figure className="deslide-cover">
                    <Image
                        alt="comic-banner"
                        className="object-fit absolute h-full w-full bg-cover bg-top bg-no-repeat object-cover blur"
                        layout="fill"
                        src={
                            imgUrl !== 'notFound'
                                ? isExactMatch(imgUrl, 'res.cloudinary.com')
                                    ? imgUrl
                                    : `${PROXY_SERVER}/proxy?url=${url}&src=${imgUrl}`
                                : torriGate
                        }
                    />
                </figure>
            )}
        </div>
    );
}
