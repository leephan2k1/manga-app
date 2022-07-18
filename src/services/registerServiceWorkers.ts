const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_KEY as string;

export const register = async () => {
    const register = await navigator.serviceWorker.register('/sw.js');

    let subscription = await register.pushManager.getSubscription();

    if (!subscription) {
        subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: publicVapidKey,
        });
    }

    return subscription;
};
