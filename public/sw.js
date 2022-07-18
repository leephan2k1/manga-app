console.log('service workers loaded!');

self.addEventListener('push', function (event) {
    console.log('Received notification...');

    const { title, ...options } = event.data.json();

    event.waitUntil(registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function (event) {
    const { url } = event.notification.data;

    event.notification.close();

    event.waitUntil(clients.openWindow(url));
});
