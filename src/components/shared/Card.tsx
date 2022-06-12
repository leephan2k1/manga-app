import classNames from 'classnames';
import { LayoutDetails } from './ListView';
import Image from 'next/image';

interface CardProps {
    details: LayoutDetails;
}

export default function Card({ details }: CardProps) {
    const commonStyles = `animate__faster animate__animated animate__zoomIn  rounded-2xl  overflow-hidden`;

    if (details === 'details') {
        return (
            <div
                className={classNames(
                    commonStyles,
                    'aspect-w-2 aspect-h-1 bg-deep-black',
                )}
            >
                <div className="flex h-full w-full  ">
                    <figure className="relative h-full w-[35%]">
                        <Image
                            alt="manga-thumbnail"
                            layout="fill"
                            className="absolute inset-0 rounded-xl object-cover object-center"
                            src={
                                'http://st.nettruyenco.com/data/comics/144/jirai-nandesuka-chihara-san-5968.jpg'
                            }
                        />
                    </figure>
                    <div className="flex h-full flex-1 bg-orange-500 p-4 text-white">
                        <h1 className="fond-bold text-lg line-clamp-2 md:text-xl lg:text-2xl">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Accusantium mollitia facilis atque molestias
                            aliquid cum totam officia enim ipsam minima qui
                            deserunt animi quaerat nihil numquam deleniti
                            quisquam, suscipit blanditiis!
                        </h1>
                    </div>
                </div>
            </div>
        );
    }

    if (details === 'column') {
        return (
            <div
                className={classNames(
                    commonStyles,
                    'mx-auto h-[100px] w-[95%] bg-deep-black',
                )}
            >
                <div className="flex h-full w-full bg-cyan-500">
                    <figure className="h-full w-[35%] bg-red-500"></figure>
                </div>
            </div>
        );
    }

    return (
        <div className={classNames(commonStyles, 'aspect-w-3 aspect-h-5')}>
            <div className="flex h-full w-full flex-col p-2 text-white lg:p-4">
                <figure className="relative h-[92%]">
                    <Image
                        alt="manga-thumbnail"
                        layout="fill"
                        className="absolute inset-0 rounded-xl object-cover object-center"
                        src={
                            'http://st.nettruyenco.com/data/comics/144/jirai-nandesuka-chihara-san-5968.jpg'
                        }
                    />
                </figure>
                <h1 className="my-2 flex items-center px-4 text-lg line-clamp-1 md:text-xl lg:text-2xl">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Eaque facere, modi eos qui repudiandae hic harum illo
                    deserunt sequi molestiae accusantium corporis inventore quod
                    ex esse temporibus id dolores ducimus!
                </h1>
            </div>
        </div>
    );
}
