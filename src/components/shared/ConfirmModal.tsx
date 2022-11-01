import { Dialog, Transition } from '@headlessui/react';
import { useAtom } from 'jotai';
import { Fragment, memo } from 'react';
import { confirmModal } from '~/atoms/confirmModalAtom';
import Image from 'next/image';

function ConfirmModal() {
    const [isOpen, closeModal] = useAtom(confirmModal);

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
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
                                <Dialog.Panel className="flex h-[250px] w-[300px] transform flex-col items-center justify-between overflow-hidden rounded-2xl bg-highlight p-6 text-left align-middle text-white shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-2xl  uppercase"
                                    >
                                        Chắc không bạn?
                                    </Dialog.Title>

                                    <figure className=" relative h-[130px] w-full overflow-hidden rounded-2xl">
                                        <Image
                                            alt="moe"
                                            src="/images/quest-transformed.jpeg"
                                            layout="fill"
                                            className="absolute inset-0"
                                        />
                                    </figure>

                                    <div className="mt-4 flex w-full justify-end space-x-4 text-gray-700">
                                        <button
                                            type="button"
                                            className="rounded-xl bg-rose-400 px-4 py-2"
                                        >
                                            Chắc
                                        </button>
                                        <button
                                            onClick={() => closeModal(false)}
                                            type="button"
                                            className="rounded-xl bg-sky-300 px-4 py-2"
                                        >
                                            Hông
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default memo(ConfirmModal);
