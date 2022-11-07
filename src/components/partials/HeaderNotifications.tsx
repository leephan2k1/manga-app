import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment, memo, useEffect } from 'react';
import useSWR from 'swr';
import { useEffectOnce } from 'usehooks-ts';
import { MANGA_PATH_NAME } from '~/constants';
import { axiosClientV2 } from '~/services/axiosClient';
import { Notification } from '~/types';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Dialog, Transition } from '@headlessui/react';

interface HeaderNotificationsProps {
    shouldShow: boolean;
    setShow: (state: boolean) => void;
}

function HeaderNotifications({
    shouldShow,
    setShow,
}: HeaderNotificationsProps) {
    const router = useRouter();
    const { data: session } = useSession();
    const [animationParent] = useAutoAnimate<HTMLUListElement>();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const userId = session?.user.id;

    const { data: notifications, mutate } = useSWR<Notification[]>(
        `/users/${userId}/notifications`,
        async (slug) => {
            const { data } = await axiosClientV2.get(slug);

            return data?.notifications;
        },
    );

    useEffect(() => {
        if (shouldShow) {
            mutate();
        }
    }, [shouldShow]);

    useEffectOnce(() => {
        const handleRouteChange = () => {
            setShow(false);
        };

        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    });

    const handleNavigateToCommentSection = async (
        notification: Notification,
    ) => {
        router.push(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            `/${MANGA_PATH_NAME}/${notification.comment?.section}/${notification.comment.comicSlug}?scrollTo=${notification.comment?._id}`,
        );

        if (notification.seen) {
            return;
        }

        try {
            await axiosClientV2.post(`/users/${userId}/notifications`, {
                notificationId: notification._id,
            });
        } catch (error) {}
    };

    return (
        <Transition appear show={shouldShow} as={Fragment}>
            <Dialog as="div" onClose={setShow}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 z-[1000] bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="absolute top-[10%] right-[10%] z-[5000]">
                    <div className="flex h-[500px] w-[300px] items-center justify-center p-4 text-center md:w-[350px]">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="h-full w-full transform overflow-hidden overflow-y-scroll rounded-2xl bg-deep-black p-6 text-left align-middle text-white shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-center text-2xl font-medium uppercase leading-6 md:text-3xl"
                                >
                                    Thông báo
                                </Dialog.Title>
                                <div className="my-4">
                                    <ul
                                        ref={animationParent}
                                        className="full-size flex flex-col space-y-4 py-4"
                                    >
                                        {notifications &&
                                            notifications.length > 0 &&
                                            notifications.map(
                                                (notification) => {
                                                    if (!notification.comment)
                                                        return;

                                                    return (
                                                        <li
                                                            onClick={() =>
                                                                handleNavigateToCommentSection(
                                                                    notification,
                                                                )
                                                            }
                                                            key={
                                                                notification._id
                                                            }
                                                            style={{
                                                                backgroundColor:
                                                                    notification?.seen
                                                                        ? ''
                                                                        : '#3f3f3f',
                                                            }}
                                                            className="flex h-28 w-full cursor-pointer items-center space-x-4 rounded-xl p-4 "
                                                        >
                                                            <figure className="min-h-16 min-w-16 md:min-w-20 relative h-16 w-16 md:h-20 md:w-20">
                                                                <Image
                                                                    layout="fill"
                                                                    className="absolute inset-0 h-auto w-auto rounded-full"
                                                                    alt="user-avatar"
                                                                    src={
                                                                        notification
                                                                            .response
                                                                            .image
                                                                    }
                                                                />
                                                            </figure>
                                                            <h4
                                                                style={{
                                                                    color: notification?.seen
                                                                        ? '#d6d3d1'
                                                                        : '#ffffff',
                                                                }}
                                                                className="flex-1 text-xl font-thin leading-7 line-clamp-3"
                                                            >
                                                                <span className="font-bold">
                                                                    {
                                                                        notification
                                                                            .response
                                                                            .name
                                                                    }
                                                                </span>{' '}
                                                                đã trả lời bình
                                                                luận của bạn
                                                                trong{' '}
                                                                <span className="italic">
                                                                    {
                                                                        notification
                                                                            .comment
                                                                            ?.comicName
                                                                    }
                                                                </span>
                                                            </h4>
                                                        </li>
                                                    );
                                                },
                                            )}

                                        {!notifications && (
                                            <li className="text-center text-white/50">
                                                Bạn chưa có thông báo nào...
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}

export default memo(HeaderNotifications);
