import { Fragment, MouseEvent, useState } from 'react';
import { ReadMode } from '~/types';

import { Dialog, Transition } from '@headlessui/react';
import { CogIcon } from '@heroicons/react/outline';
import useSettingsMode from '~/context/SettingsContext';

interface SettingsModalProps {
    triggerShowSideSettings: () => void;
}

export default function SettingsModal({
    triggerShowSideSettings,
}: SettingsModalProps) {
    const [showModal, setShowModal] = useState(true);
    const settings = useSettingsMode();

    const handleCloseModal = (e: MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.dataset.id) {
            settings?.setReadMode(e.currentTarget.dataset.id as ReadMode);
            setShowModal(false);
            triggerShowSideSettings();
        }
    };

    return (
        <Transition appear show={showModal} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-[999]"
                onClose={() => handleCloseModal}
            >
                <div className="fixed top-1/2 right-0 left-0 -translate-y-1/2">
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
                            <Dialog.Panel className="max-h-[70vh] w-full transform overflow-x-hidden rounded-2xl bg-background p-6 text-left align-middle text-white shadow-xl transition-all md:w-[60%] lg:w-[40%]">
                                <div className="flex items-center justify-between">
                                    <Dialog.Title
                                        as="h3"
                                        className="my-4 font-secondary text-3xl leading-6  md:text-5xl"
                                    >
                                        Cài đặt lần đầu
                                    </Dialog.Title>
                                </div>
                                <div className="flex items-center justify-between text-white/50">
                                    <Dialog.Description>
                                        <div className="flex flex-col">
                                            <p> Chọn chế đọc mà bạn muốn!</p>
                                            <p className="">
                                                Có thể cài đặt lại tại:{' '}
                                                <CogIcon className="inline h-8 w-8" />{' '}
                                                Cài đặt &gt; Chế độ đọc.
                                            </p>
                                        </div>
                                    </Dialog.Description>
                                </div>

                                <div className="my-10 flex h-[60px] items-center rounded-xl bg-highlight py-4 text-white transition-all hover:bg-highlight/40">
                                    <button
                                        data-id="vertical"
                                        onClick={handleCloseModal}
                                        className="mx-4 flex h-full w-full items-center gap-6"
                                    >
                                        <div className="absolute-center h-16 w-12 flex-col items-center  gap-2 overflow-hidden rounded-lg bg-deep-black">
                                            <div className="vertical-slide-demo-page flex h-fit w-6 flex-col items-center gap-2">
                                                <span className="block h-8 w-5 bg-white"></span>
                                                <span className="block h-8 w-5 bg-white"></span>
                                                <span className="block h-8 w-5 bg-white"></span>
                                                <span className="block h-8 w-5 bg-white"></span>
                                                <span className="block h-8 w-5 bg-white"></span>
                                            </div>
                                        </div>
                                        <p>Đọc theo chiều dọc</p>
                                    </button>
                                </div>
                                <div className="my-10 flex h-[60px] items-center rounded-xl bg-highlight py-4 text-white transition-all hover:bg-highlight/40">
                                    <button
                                        data-id="horizontal"
                                        onClick={handleCloseModal}
                                        className="mx-4 flex h-full w-full items-center gap-6"
                                    >
                                        <div className="absolute-center h-16 w-12 flex-col items-center  gap-2 overflow-hidden rounded-lg bg-deep-black">
                                            <div className="horizontal-slide-demo-page flex h-fit w-fit items-center gap-2">
                                                <span className="block h-8 w-5 bg-white"></span>
                                                <span className="block h-8 w-5 bg-white"></span>
                                                <span className="block h-8 w-5 bg-white"></span>
                                                <span className="block h-8 w-5 bg-white"></span>
                                                <span className="block h-8 w-5 bg-white"></span>
                                            </div>
                                        </div>
                                        <p>Đọc theo chiều ngang</p>
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
