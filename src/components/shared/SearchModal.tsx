import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { useRecoilState } from 'recoil';
import { searchModalState } from '~/atoms/searchModelAtom';
import { SearchIcon } from '@heroicons/react/solid';

export default function SearchModal() {
    const [showModal, setShowModal] = useRecoilState(searchModalState);
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <Transition appear show={showModal} as={Fragment}>
            <Dialog
                initialFocus={inputRef}
                as="div"
                className="relative z-10"
                onClose={setShowModal}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed top-[10%] left-0 right-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="h-fit w-[85%] transform overflow-hidden rounded-2xl bg-background p-6 text-left align-middle shadow-xl transition-all md:w-[75%]">
                                <div className="flex items-center justify-between">
                                    <Dialog.Title
                                        as="h3"
                                        className="my-4 mx-2 font-secondary text-4xl leading-6 text-white md:text-6xl"
                                    >
                                        Tìm Truyện
                                    </Dialog.Title>
                                    <button
                                        className="button rounded-full p-4 text-white md:mr-6"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <XIcon className="h-10 w-10" />
                                    </button>
                                </div>
                                <div className="my-10 flex h-[60px] items-center rounded-xl bg-secondary py-4 text-white">
                                    <SearchIcon className="mx-2 h-10 w-10 md:mx-6 md:h-14 md:w-14" />
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        className="w-full bg-transparent p-4"
                                    />
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
