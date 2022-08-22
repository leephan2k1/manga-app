import { ReactNode, useEffect } from 'react';
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts';
import { useSession } from 'next-auth/react';
import useNotification from '~/hooks/useNotification';

interface NotificationObserverProps {
    children: ReactNode;
}

export default function NotificationObserver({
    children,
}: NotificationObserverProps) {
    const { status } = useSession();
    const notification = useNotification();
    const isSupportSW = useReadLocalStorage('supportSW');
    const [isSub, setIsSub] = useLocalStorage('deviceSub', false);

    //register new device:
    useEffect(() => {
        if (isSupportSW && !isSub && status === 'authenticated') {
            (async function () {
                const res = await notification.subscribe(
                    'just_push_new_subscribe',
                );

                switch (res) {
                    case 'success':
                        setIsSub(true);
                        break;
                    case 'permission_denied':
                    case 'unsupported_browser':
                        setIsSub(false);
                        break;
                }
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSupportSW, status]);

    return <>{children}</>;
}
