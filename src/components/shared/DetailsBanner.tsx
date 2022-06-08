interface DetailsBannerProps {
    imgUrl: string;
}

export default function DetailsBanner({ imgUrl }: DetailsBannerProps) {
    return (
        <div className="absolute inset-0 z-0 h-[35%] w-full lg:h-[45%] ">
            <figure
                style={{
                    backgroundImage: `url(${imgUrl})`,
                }}
                className="deslide-cover h-full w-full bg-cover bg-top bg-no-repeat blur"
            ></figure>
        </div>
    );
}
