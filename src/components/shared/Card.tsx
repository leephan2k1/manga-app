import { BookOpenIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import Image from 'next/image';
import { TailwindColors } from '~/constants';
import { randomColors } from '~/utils/randomColors';
import { LayoutDetails } from './ListView';

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
                    <div className="flex h-full flex-1 flex-col space-y-4 bg-orange-500/0 p-4 text-white md:space-y-2 xl:space-y-4">
                        <h1 className="fond-bold h-fit min-h-[20px] w-full font-bold line-clamp-2 ssm:text-3xl md:text-xl  lg:text-3xl">
                            Nartuo
                        </h1>
                        <h2 className="h-fit w-full font-light line-clamp-3 ssm:text-xl md:text-sm md:line-clamp-2 lg:line-clamp-3 xl:text-xl">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Delectus impedit, accusamus voluptate quidem
                            voluptatem labore. Consequuntur beatae nemo
                            aspernatur. Error molestias harum quisquam
                            doloremque atque nulla pariatur optio officiis sit.
                        </h2>
                        <h3 className="text-xs text-gray-300 lg:text-lg">
                            Đang tiến hành
                        </h3>
                        <div className="w-fill h-fit flex-1 md:max-h-[15px] lg:h-fit">
                            <ul className="flex w-full flex-wrap items-center gap-2 overflow-hidden   text-lg md:text-sm xl:text-lg">
                                <li
                                    className="h-fit w-fit overflow-hidden whitespace-nowrap rounded-lg border-[1px] border-gray-400 px-2"
                                    style={{
                                        color: randomColors(TailwindColors, 0),
                                    }}
                                >
                                    Action
                                </li>
                                <li
                                    className="h-fit w-fit overflow-hidden whitespace-nowrap rounded-lg border-[1px] border-gray-400 px-2"
                                    style={{
                                        color: randomColors(TailwindColors, 0),
                                    }}
                                >
                                    Action
                                </li>
                                <li
                                    className="h-fit w-fit overflow-hidden whitespace-nowrap rounded-lg border-[1px] border-gray-400 px-2"
                                    style={{
                                        color: randomColors(TailwindColors, 0),
                                    }}
                                >
                                    Action
                                </li>
                                <li
                                    className="h-fit w-fit overflow-hidden whitespace-nowrap rounded-lg border-[1px] border-gray-400 px-2"
                                    style={{
                                        color: randomColors(TailwindColors, 0),
                                    }}
                                >
                                    Action
                                </li>
                            </ul>
                        </div>
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
                <div className="flex h-full w-full  ">
                    <figure className="relative h-full w-[10%] lg:w-[7%]">
                        <Image
                            alt="manga-thumbnail"
                            layout="fill"
                            className="absolute inset-0 rounded-xl object-cover object-center"
                            src={
                                'http://st.nettruyenco.com/data/comics/144/jirai-nandesuka-chihara-san-5968.jpg'
                            }
                        />
                    </figure>
                    <div className="flex flex-1   p-4 text-white">
                        <div className="h-full w-[75%]">
                            <h1 className="font-secondary text-3xl line-clamp-1">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Corrupti tempora architecto
                                quisquam possimus quas molestiae est. Ipsum
                                voluptas excepturi recusandae! Veniam
                                dignissimos unde recusandae necessitatibus
                                pariatur molestiae aliquid repudiandae minima.
                            </h1>
                            <div className="h-full flex-1">
                                <ul className="flex flex-wrap gap-4 py-4">
                                    <li className="h-fit w-fit rounded-lg border-[1px] border-gray-500 px-2 py-1 text-xl">
                                        Action
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex h-full w-[25%] items-center">
                            <p className="flex space-x-4">
                                <BookOpenIcon className="h-8 w-8" />
                                <span>Chapter 62.6</span>
                            </p>
                        </div>
                    </div>
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
