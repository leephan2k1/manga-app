import Skeleton from 'react-loading-skeleton';

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
                <figure
                    style={{
                        backgroundImage: `url(${imgUrl})`,
                    }}
                    className={styles}
                ></figure>
            )}
        </div>
    );
}
