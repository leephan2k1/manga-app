import { useAtom } from 'jotai';
import Image from 'next/image';
import { Fragment, memo, useState } from 'react';
import toast from 'react-hot-toast';
import { Else, If, Then } from 'react-if';
import { confirmModal } from '~/atoms/confirmModalAtom';
import LoadingIcon from '~/components/icons/LoadingIcon';
import useComment from '~/context/CommentContext';
import { axiosClientV2 } from '~/services/axiosClient';

import { Dialog, Transition } from '@headlessui/react';

function ConfirmModal() {
    const commentCtx = useComment();
    const [isOpen, closeModal] = useAtom(confirmModal);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteComment = async () => {
        try {
            setIsDeleting(true);

            if (!commentCtx?.commentNeedToBeDeleted) throw new Error();

            const { commentId, userId } = commentCtx?.commentNeedToBeDeleted;

            if (!commentId && !userId) throw new Error();

            const { data } = await axiosClientV2.delete(
                `/comments/${commentId}/${userId}`,
            );

            if (data && data.status === 'success') {
                closeModal(false);
                commentCtx.reFetch();
                setIsDeleting(false);
            } else {
                throw new Error();
            }
        } catch (error) {
            setIsDeleting(false);

            toast.error('Opps! Thử lại nhé bạn... :"(');
        }
    };

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

                                    <div className="mt-4 flex w-full justify-end space-x-4 text-white">
                                        <If condition={isDeleting}>
                                            <Then>
                                                <button className="absolute-center h-[30px] w-[50px] rounded-xl">
                                                    <LoadingIcon iconColor="#ffffff" />
                                                </button>
                                            </Then>

                                            <Else>
                                                <button
                                                    onClick={
                                                        handleDeleteComment
                                                    }
                                                    type="button"
                                                    className="smooth-effect rounded-xl bg-rose-400 px-4 py-2 hover:scale-110"
                                                >
                                                    Chắc
                                                </button>
                                            </Else>
                                        </If>

                                        <button
                                            onClick={() => closeModal(false)}
                                            type="button"
                                            className="smooth-effect rounded-xl bg-sky-300 px-4 py-2 hover:scale-110"
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
