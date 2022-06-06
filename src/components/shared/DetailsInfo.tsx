import Image from 'next/image';

export default function DetailsInfo() {
    const title = 'Đảo Hải Tặc';

    return (
        <div className="flex h-full w-full flex-col items-center overflow-x-hidden md:flex-row md:items-start ">
            {/* manga thumbnail  */}
            <div className="mt-4 w-[50%] md:w-[250px] md:min-w-[250px]">
                <figure className="aspect-w-3 aspect-h-5 relative rounded-2xl">
                    <Image
                        className="absolute inset-0 rounded-2xl object-cover object-center"
                        layout="fill"
                        alt="manga-thumbnail"
                        src={
                            'https://st.nettruyenco.com/data/comics/209/dao-hai-tac.jpg'
                        }
                    />
                </figure>
            </div>
            {/* manga title  */}
            <div className="flex h-full w-full flex-col  space-y-2    p-4 text-white">
                <div className="w-full text-center md:text-left lg:w-[80%]">
                    <h1
                        className={`font-secondary text-[5.5vw] font-bold leading-none ${
                            title.length < 40
                                ? 'md:text-[5.5vw] lg:text-[3.5vw]'
                                : 'md:text-[3.5vw] lg:text-[2.5vw]'
                        }`}
                    >
                        {title}
                        {console.log(title.length)}
                    </h1>
                    <h2 className="text-[3vw]  md:text-[2vw] lg:text-[1.2vw]">
                        アヤシモン
                    </h2>
                    <h3 className="text-center text-[3vw] md:text-left md:text-[2vw] lg:text-[1.1vw]">
                        Oda Eiichiro
                    </h3>
                </div>
            </div>
        </div>
    );
}
