import Skeleton from 'react-loading-skeleton';
import torriGate from '/public/images/torri-gate.jpg';
import Image from 'next/image';

interface DetailsBannerProps {
    imgUrl: string;
    isLoading: boolean;
}

export default function DetailsBanner({
    imgUrl,
    isLoading,
}: DetailsBannerProps) {
    const styles =
        'deslide-cover count={10} h-full w-full bg-cover bg-top bg-no-repeat';

    return (
        <div className="absolute inset-0 z-0 h-[35%] w-full lg:h-[45%] ">
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
                        className=" count={10} object-fit absolute h-full w-full bg-cover bg-top bg-no-repeat object-cover blur"
                        layout="fill"
                        src={imgUrl !== 'notFound' ? imgUrl : torriGate}
                    />
                </figure>
            )}
        </div>
    );
}
