import Image from 'next/image';
import { useState } from 'react';
import { BiGlasses } from 'react-icons/bi';
import { useMediaQuery } from 'usehooks-ts';

import {
    ClipboardListIcon,
    ClockIcon,
    InformationCircleIcon,
    StatusOnlineIcon,
} from '@heroicons/react/outline';

export default function SectionSwiperCard() {
    const matches = useMediaQuery('(min-width: 1259px)');
    const [showPreview, setShowPreview] = useState(false);

    return (
        <div
            className="aspect-h-4 aspect-w-3 rounded-xl bg-cyan-500"
            onMouseEnter={() => {
                setShowPreview(true);
            }}
            onMouseLeave={() => {
                setShowPreview(false);
            }}
        >
            <Image
                className="absolute inset-0 rounded-xl object-cover object-center"
                alt="manga-thumbnail z-50"
                src={
                    'https://st.nettruyenco.com/data/comics/5/ke-hoach-tu-cuu-cua-phan-phai-ma-nu.jpg'
                }
                layout="fill"
            />
            <span className="absolute top-2 left-2 h-fit w-fit rounded-xl bg-white bg-opacity-40 px-4 py-2 text-base backdrop-blur-md md:text-xl lg:text-3xl">
                Chapter 255
            </span>
            {matches && showPreview && (
                <div className="animate__faster animate__animated animate__fadeIn flex h-full w-full flex-col space-y-6 overflow-hidden rounded-xl bg-hight-light text-white">
                    <h3 className="ml-4 mt-4 min-h-[40px] text-[100%] font-semibold line-clamp-2">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Fugiat omnis eius deleniti harum similique fugit
                        officiis perspiciatis. Voluptate a minima qui ab, omnis
                        saepe corporis eligendi quo, blanditiis veniam minus!
                    </h3>
                    <p className="ml-4 flex flex-nowrap items-center">
                        <ClipboardListIcon className="h-6 w-6" />
                        <span className="ml-2 text-[90%] line-clamp-1">
                            Chap 255
                        </span>
                    </p>
                    <p className="ml-4 flex items-center">
                        <ClockIcon className="h-6 w-6" />{' '}
                        <span className="ml-2 text-[90%]">18 phút trước</span>
                    </p>
                    <p className="ml-4 flex items-center">
                        <StatusOnlineIcon className="h-6 w-6" />{' '}
                        <span className="ml-2 text-[90%]">Đang tiến hành</span>
                    </p>

                    <div className="flex h-fit w-full flex-col items-center space-y-4 py-6">
                        <button className="flex w-fit items-center justify-center space-x-4 rounded-xl bg-primary py-2 px-4 transition-all hover:scale-[110%]">
                            <BiGlasses /> <span>Đọc ngay</span>
                        </button>
                        <button className="flex w-fit items-center justify-center space-x-4 rounded-xl bg-white py-2 px-4 text-gray-700 transition-all hover:scale-[110%]">
                            <InformationCircleIcon className="h-6 w-6" />{' '}
                            <span>Thông tin</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
