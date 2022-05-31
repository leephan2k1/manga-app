import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef, useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { SearchIcon } from '@heroicons/react/solid';
import { useRecoilState } from 'recoil';
import { searchModalState } from '~/atoms/searchModelAtom';
import SearchResult from './SearchResult';

export default function SearchModal() {
    const [showModal, setShowModal] = useRecoilState(searchModalState);
    const [showBtnClearInput, setShowBtnClearInput] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClearSearchValue = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }
        setShowBtnClearInput(false);
    };

    const handleOpenButtonClearSearch = () => {
        //Displayed only when input has value
        if (inputRef.current?.value) {
            setShowBtnClearInput(true);
        }
    };

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
                            <Dialog.Panel className="max-h-[70vh] w-[85%] transform overflow-x-hidden overflow-y-scroll rounded-2xl bg-background p-6 text-left align-middle shadow-xl transition-all md:w-[75%] lg:max-h-[85vh]">
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
                                    {/* search icon  */}
                                    <SearchIcon className="mx-2 h-10 w-10 md:mx-6 md:h-14 md:w-14" />
                                    {/* search input  */}
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        className="w-full bg-transparent p-4"
                                        onBlur={handleOpenButtonClearSearch}
                                        onFocus={() =>
                                            setShowBtnClearInput(false)
                                        }
                                    />
                                    {/* clear input  */}
                                    {showBtnClearInput && (
                                        <button
                                            className="absolute-center m-4 h-10 w-10 rounded-lg bg-primary text-white hover:opacity-60 md:h-14 md:w-14 md:rounded-xl"
                                            onClick={handleClearSearchValue}
                                        >
                                            <XIcon className="h-8 w-8" />
                                        </button>
                                    )}
                                </div>
                                <SearchResult />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
