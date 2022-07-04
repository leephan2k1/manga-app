import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Fragment, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useEffectOnce } from 'usehooks-ts';
import { followModal } from '~/atoms/followModaAtom';
import CircleIcon from '~/components/icons/CircleIcon';
import ListBox from '~/components/shared/ListBox';
import { FOLLOW_STATE } from '~/constants';
import useFollow from '~/hooks/useFollow';
import { FollowState, MangaDetails } from '~/types';

import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';

interface FollowModalProps {
    manga: MangaDetails;
    callbackMessage: (message: string, status: string) => void;
}

export default function FollowModal({
    manga,
    callbackMessage,
}: FollowModalProps) {
    const router = useRouter();
    const path = router.asPath;

    const mangaSlug = path.slice(
        path.lastIndexOf('/') + 1,
        path.indexOf('?') > 0 ? path.indexOf('?') : path.length,
    );

    const follow = useFollow();
    const followId = useRef('reading');
    const savedSelectDb = useRef('Đang đọc');
    const [loading, setLoading] = useState(true);
    const [isSaved, setIsSaved] = useState(false);
    const { data: session, status } = useSession();
    const [followStatus, setFollowStatus] = useState('Đang đọc');
    const [showModal, setShowModal] = useRecoilState(followModal);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSelect = async (value: string) => {
        const _followStatus = FOLLOW_STATE.find(
            (stt) => stt.title === value,
        )?.id;

        if (!isSaved) {
            savedSelectDb.current = value;
        }

        //id for submit
        followId.current = _followStatus as string;
        //title for render
        setFollowStatus(value);
    };

    const handleAddStatus = async () => {
        if (status === 'authenticated' && followId.current) {
            setLoading(true);

            const success = await follow.add(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                session?.user?.id as string,
                mangaSlug,
                'nt',
                followId.current as FollowState,
                manga,
            );
            //show toast
            if (success) {
                callbackMessage('Thêm vào danh sách thành công!', 'success');
            } else {
                callbackMessage(
                    'Opps! Có gì đó không đúng, thử lại sau',
                    'error',
                );
            }
            setLoading(false);
            setShowModal(false);
        }
    };

    const handleDeleteStatus = async () => {
        if (status === 'authenticated') {
            setLoading(true);

            const success = await follow._delete(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                session?.user?.id as string,
                mangaSlug,
            );

            //show toast
            if (success) {
                callbackMessage('Xoá khỏi danh sách thành công!', 'success');
            } else {
                callbackMessage(
                    'Opps! Có gì đó không đúng, thử lại sau',
                    'error',
                );
            }

            setShowModal(false);
            setLoading(false);
        }
    };

    useEffectOnce(() => {
        (async function () {
            const res = await follow.get(
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                session?.user?.id as string,
                manga.title,
            );

            if (res) {
                const statusTitle = FOLLOW_STATE.find(
                    (stt) => stt.id === res.data.status,
                )?.title;

                if (statusTitle) {
                    savedSelectDb.current = statusTitle;
                    setFollowStatus(statusTitle);
                    setIsSaved(true);
                }
            }

            setLoading(false);
        })();
    });

    return (
        <Transition appear show={showModal} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-[999]"
                onClose={handleCloseModal}
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

                <div className="fixed top-1/2 left-0 right-0 -translate-y-1/2">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-100"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-100"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="h-full w-full transform overflow-x-hidden rounded-2xl  bg-background p-6 text-left align-middle text-white shadow-xl transition-all md:w-[70%] lg:max-h-[85vh]">
                                <div className="flex items-center justify-between">
                                    <Dialog.Title
                                        as="h3"
                                        className="my-4 mx-2 font-secondary text-4xl leading-6 text-white md:text-6xl"
                                    >
                                        Thêm vào danh sách
                                    </Dialog.Title>
                                    <button
                                        className="button rounded-full p-4 text-white md:mr-6"
                                        onClick={handleCloseModal}
                                    >
                                        <XIcon className="h-10 w-10" />
                                    </button>
                                </div>

                                <div
                                    className="grid min-h-[88vh] w-full grid-rows-2 md:min-h-[450px] md:grid-cols-3
                                 md:grid-rows-1"
                                >
                                    <div className="max-h-1/2 flex items-center justify-center md:col-span-1 md:items-start">
                                        <figure
                                            style={{
                                                backgroundImage: `url(${manga?.thumbnail})`,
                                            }}
                                            className=" h-[300px] w-[200px] rounded-xl bg-cover bg-no-repeat md:mt-6 lg:h-[400px] lg:w-[300px]"
                                        ></figure>
                                    </div>

                                    <div className="flex flex-col justify-between md:col-span-2 md:mt-4 md:px-10 lg:px-4">
                                        <div className="flex flex-col gap-4">
                                            <h1 className="ld:px-0 text-center font-secondary text-3xl font-bold line-clamp-1 md:px-4 md:text-left md:text-4xl">
                                                {manga?.title}
                                            </h1>

                                            <h2 className="ld:px-0 text-center font-secondary line-clamp-1 md:my-8 md:px-4 md:text-left md:text-2xl lg:text-3xl">
                                                Danh sách:
                                            </h2>

                                            <div className="flex h-fit w-full justify-center md:justify-start">
                                                <ListBox
                                                    style={
                                                        'w-[150px] md:w-3/4 lg:w-1/2 md:py-10 py-4 rounded-xl bg-black/40'
                                                    }
                                                    defaultOption={followStatus}
                                                    options={FOLLOW_STATE.map(
                                                        (i) => i.title,
                                                    )}
                                                    handleSelect={handleSelect}
                                                />
                                            </div>
                                        </div>

                                        <div className="my-4 mb-20 flex w-full justify-center gap-4 md:mb-4 md:justify-end">
                                            {isSaved && !loading && (
                                                <button
                                                    onClick={handleDeleteStatus}
                                                    className="w-full rounded-xl py-6 font-secondary text-4xl text-primary transition-all hover:bg-primary/20 md:w-[30%]"
                                                >
                                                    Xóa
                                                </button>
                                            )}

                                            {loading ? (
                                                <div className="ld:w-[30%] rounded-x absolute-center w-full py-6 font-secondary text-4xl md:w-[35%]">
                                                    <CircleIcon
                                                        wraperStyles="circle-sm"
                                                        circleStyles="circle-loading"
                                                    />
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={handleAddStatus}
                                                    className="ld:w-[30%] w-full rounded-xl bg-primary  py-6 font-secondary text-4xl md:w-[35%]"
                                                >
                                                    {savedSelectDb.current !==
                                                    followStatus
                                                        ? 'Cập nhật'
                                                        : 'Lưu'}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
