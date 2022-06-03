import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

import { ChevronRightIcon } from '@heroicons/react/outline';

export interface DropDownLink {
    title: string;
    href: string;
}

interface DropDownProps {
    listDropDown: DropDownLink[];
    show: boolean;
    isMore?: boolean;
}

export default function DropDown({
    listDropDown,
    show,
    isMore,
}: DropDownProps) {
    const [offsetTop, setOffsetTop] = useState(0);
    const effectActive = useRef<HTMLLIElement>(null);

    useEffect(() => {
        if (effectActive.current) {
            effectActive.current.style.cssText = `transform: translateY(${offsetTop}px)`;
        }
    }, [offsetTop]);

    if (!show) return null;

    return (
        <ul
            className="animate__animated animate__fadeIn animate__faster absolute top-full left-1/2 z-50 flex h-fit w-fit -translate-x-1/2 flex-col flex-nowrap items-center justify-evenly rounded-2xl bg-secondary py-4 transition-all"
            onMouseLeave={() => {
                setOffsetTop(0);
            }}
        >
            {listDropDown.length &&
                listDropDown.map((item, index) => {
                    return (
                        <li
                            key={index}
                            onMouseEnter={(e) => {
                                setOffsetTop(e.currentTarget.offsetTop);
                            }}
                            className="hover:text-primary"
                        >
                            <Link href={item.href}>
                                <a className="absolute-center mx-2 my-2 h-14 whitespace-nowrap px-6 font-primary duration-300">
                                    {item.title}
                                    {isMore &&
                                        index === listDropDown.length - 1 && (
                                            <ChevronRightIcon className="h-8 w-8 text-white" />
                                        )}
                                </a>
                            </Link>
                        </li>
                    );
                })}
            <li
                ref={effectActive}
                className={`slide absolute top-2 -z-10 h-14 w-[85%] ${
                    offsetTop === 0 && 'opacity-0'
                } rounded-2xl bg-[#555759] px-6 duration-150`}
            ></li>
        </ul>
    );
}
