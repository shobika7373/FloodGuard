/// <reference lib="webworker" />

import { precacheAndRoute } from 'workbox-precaching';

type FloodGuardPushData = {
  title?: string;
  body?: string;
  area?: string;
  risk?: string;
  riskScore?: number;
  action?: string;
  url?: string;
};

declare let self: ServiceWorkerGlobalScope & {
  __WB_MANIFEST: Array<string | { url: string; revision?: string | null }>;
};

// IMPORTANT: Workbox searches for this exact expression.
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('push', (event: PushEvent) => {
  let data: FloodGuardPushData = {};

  try {
    data = event.data
      ? event.data.json()
      : {};
  } catch {
    data = {
      title: 'FloodGuard Prototype Alert',
      body: 'PROTOTYPE / SIMULATED ALERT',
    };
  }

  const title =
    data.title || 'FloodGuard Prototype Alert';

  const body = [
    'PROTOTYPE / SIMULATED ALERT',

    data.area
      ? `Affected area: ${data.area}`
      : '',

    data.risk
      ? `Risk: ${data.risk}`
      : '',

    data.riskScore !== undefined
      ? `Risk score: ${data.riskScore}/100`
      : '',

    data.action
      ? `Recommended action: ${data.action}`
      : '',

    data.body || '',
  ]
    .filter(Boolean)
    .join('\n');

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      tag: 'floodguard-prototype-alert',
      data: {
        url: data.url || '/FloodGuard/',
      },
    }),
  );
});

self.addEventListener(
  'notificationclick',
  (event: NotificationEvent) => {
    event.notification.close();

    const url =
      event.notification.data?.url ||
      '/FloodGuard/';

    event.waitUntil(
      self.clients
        .matchAll({
          type: 'window',
          includeUncontrolled: true,
        })
        .then((clientList) => {
          for (const client of clientList) {
            if ('focus' in client) {
              const windowClient =
                client as WindowClient;

              if ('navigate' in windowClient) {
                windowClient.navigate(url);
              }

              return windowClient.focus();
            }
          }

          if (self.clients.openWindow) {
            return self.clients.openWindow(url);
          }

          return undefined;
        }),
    );
  },
);