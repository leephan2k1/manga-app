import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';

import CircleIcon from '../icons/CircleIcon';

interface DetailsDescriptionProps {
    mobileUI: boolean;
    mangaReview: string;
    isLoading: boolean;
}

export default function DetailsDescription({
    mobileUI,
    mangaReview,
    isLoading,
}: DetailsDescriptionProps) {
    if (isLoading) {
        return (
            <div className="absolute-center">
                <CircleIcon
                    wraperStyles="circle"
                    circleStyles="circle-loading"
                />
            </div>
        );
    }

    if (!mobileUI)
        return <p className="my-8 text-white">&quot;{mangaReview}&quot;</p>;
    // return <p className="my-8 text-white">&quot;{mangaReview}&quot;</p>;

    return (
        <Disclosure>
            {({ open }) => {
                return (
                    <div
                        className={`${
                            open ? 'flex-col-reverse' : 'flex-col'
                        } flex`}
                    >
                        <Disclosure.Button className={'w-full'}>
                            <button className="flex w-full flex-col items-center bg-cyan-300/0 text-white">
                                Tóm tắt
                                {open ? (
                                    <ChevronUpIcon className="h-8 w-8" />
                                ) : (
                                    <ChevronDownIcon className="h-8 w-8" />
                                )}
                            </button>
                        </Disclosure.Button>

                        <Transition
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Disclosure.Panel>
                                <p className="text-white">
                                    &quot;{mangaReview}&quot;
                                </p>
                            </Disclosure.Panel>
                        </Transition>
                    </div>
                );
            }}
        </Disclosure>
    );
}
