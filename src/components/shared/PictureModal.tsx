import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface PictureModalProps {
    modalState?: boolean;
    handleCloseModal: () => void;
    imgSrc: string;
}

export default function PictureModal({
    imgSrc,
    modalState,
    handleCloseModal,
}: PictureModalProps) {
    return (
        <Transition appear show={modalState} as={Fragment}>
            <Dialog
                onClose={handleCloseModal}
                as="div"
                className="relative z-[999]"
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-100"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed top-1/2 left-0 right-0 -translate-y-1/2 overflow-hidden">
                    <div className="absolute-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="absolute-center h-full w-fit transform overflow-hidden  transition-all">
                                <div className="absolute-center h-fit w-fit overflow-hidden rounded-lg shadow-xl">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        className="fancy-fade-in rounded-lg"
                                        src={imgSrc}
                                        alt="picture-large"
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
