import { Menu, Transition } from '@headlessui/react';
import { Fragment, memo } from 'react';
import {
    ChevronDownIcon,
    EllipsisHorizontalIcon,
    PencilIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';
import { DisplayMode } from './Comment';

interface CommentOptionsProps {
    handleSelectOptions: (value: DisplayMode) => void;
}

function CommentOptions({ handleSelectOptions }: CommentOptionsProps) {
    return (
        <div className="absolute-center">
            <Menu as="div" className="relative inline-block text-left">
                <div className="absolute-center">
                    <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        <EllipsisHorizontalIcon className="h-8 w-8" />
                        <ChevronDownIcon
                            className="ml-2 -mr-1 h-5 w-5"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-2xl rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() =>
                                            handleSelectOptions('edit')
                                        }
                                        className={`${
                                            active
                                                ? 'bg-highlight'
                                                : 'text-white'
                                        } smooth-effect group flex w-full items-center space-x-2 rounded-md px-2 py-2 text-2xl`}
                                    >
                                        <PencilIcon className="smooth-effect h-8 w-8 group-hover:text-green-500" />{' '}
                                        <span>Chỉnh sửa</span>
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() =>
                                            handleSelectOptions('remove')
                                        }
                                        className={`${
                                            active
                                                ? 'bg-highlight'
                                                : 'text-white'
                                        } smooth-effect group flex w-full items-center space-x-2 rounded-md px-2 py-2 text-2xl`}
                                    >
                                        <TrashIcon className="smooth-effect h-8 w-8 group-hover:text-rose-500" />{' '}
                                        <span>Xoá</span>
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
}

export default memo(CommentOptions);
