import { useState } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/outline';

type Items = {
    title: string;
    id?: string;
};

interface ListBoxButtonProps {
    title?: string;
    defaultSelected?: string;
    listDropDown: Array<Items>;
}

export default function ListBoxButton({
    title,
    listDropDown,
    defaultSelected,
}: ListBoxButtonProps) {
    const [selectedSource, setSelectedSource] = useState(
        defaultSelected || listDropDown[0].title,
    );

    return (
        <div className="relative">
            <Listbox value={selectedSource} onChange={setSelectedSource}>
                {({ open }) => (
                    <>
                        <Listbox.Button>
                            <div className="mr-2 flex items-center gap-1 text-lg md:text-2xl">
                                <span>
                                    {title} {selectedSource}
                                </span>
                                {open ? (
                                    <ChevronUpIcon className="animate__animated animate__faster animate__rotateIn h-8 w-8" />
                                ) : (
                                    <ChevronDownIcon className="animate__animated animate__faster animate__rotateIn h-8 w-8" />
                                )}
                            </div>
                        </Listbox.Button>
                        <Transition
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Listbox.Options className="bg-hight-light absolute left-1/2 mt-1 h-fit w-[120%] -translate-x-1/2 space-y-4 overflow-auto rounded-md border-white  py-1 text-base shadow-lg shadow-black/30 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {listDropDown.map((source, idx) => (
                                    <Listbox.Option
                                        key={source?.id || idx}
                                        value={source.title}
                                        className={({ active }) =>
                                            `relative w-fit cursor-default select-none py-2 pl-10 pr-4 text-lg hover:cursor-pointer md:text-2xl  ${
                                                active
                                                    ? 'bg-hight-light text-primary'
                                                    : 'text-white'
                                            }`
                                        }
                                    >
                                        {source.title}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </>
                )}
            </Listbox>
        </div>
    );
}
