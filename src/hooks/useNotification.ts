import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useReadLocalStorage } from 'usehooks-ts';
import useSubscription from '~/context/SubscriptionContext';
import axiosClient from '~/services/axiosClient';

export default function useNotification() {
    const router = useRouter();
    const sub = useSubscription();
    const { data: session, status } = useSession();
    const isSupportedSW = useReadLocalStorage('supportSW');

    return {
        info: async (comicId: string) => {
            try {
                const res = await (
                    await axiosClient.post('notify/info', {
                        comicId,
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        userId: session?.user?.id as string,
                    })
                ).data;

                if (res?.message === 'subscribed') return 'subscribed';
                else return 'nonsub';
            } catch (err) {
                return 'nonsub';
            }
        },

        subscribe: async (comicId: string) => {
            if (!isSupportedSW) return 'unsupported_browser';

            if (status === 'unauthenticated') {
                router.push('/login');
                return;
            }

            if (Notification.permission !== 'granted') {
                const result = await Notification.requestPermission();
                if (result !== 'granted') return 'permission_denied';
            }

            try {
                await axiosClient.post('notify/subscribe', {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    userId: session?.user?.id as string,
                    endpoint: sub?.endpoint,
                    p256dh: sub?.keys.p256dh,
                    auth: sub?.keys.auth,
                    comicId,
                });

                return 'success';
            } catch (err) {
                console.log('error subscribe:: ', err);
            }
        },

        unsubscribe: async (comicId: string) => {
            if (status === 'unauthenticated') {
                router.push('/login');
                return;
            }

            try {
                await axiosClient.delete(`notify/unsubscribe`, {
                    data: {
                        comicId,
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        //@ts-ignore
                        userId: session?.user?.id as string,
                    },
                });

                return 'success';
            } catch (err) {
                console.log('error unsubscribe:: ', err);
                return 'error';
            }
        },
    };
}
