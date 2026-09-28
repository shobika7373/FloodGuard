const VAPID_PUBLIC_KEY =
  "BJkOSW7CNsGhCKnUbIHs7gIAy3AHSm8ARvPwFsecfVpD0gcP-xJtxNekW5XOyg9__UoXxIYzBXsozKkzeGFrTM8";

const API_BASE_URL = "http://127.0.0.1:8000";

function urlBase64ToUint8Array(
  base64String: string
): Uint8Array<ArrayBuffer> {
  const padding =
    "=".repeat((4 - (base64String.length % 4)) % 4);

  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);

  const bytes = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i++) {
    bytes[i] = rawData.charCodeAt(i);
  }

  return bytes;
}

export async function subscribeToPushNotifications(): Promise<PushSubscription> {
  // Check service worker support
  if (!("serviceWorker" in navigator)) {
    throw new Error(
      "Service workers are not supported by this browser."
    );
  }

  // Check Push API support
  if (!("PushManager" in window)) {
    throw new Error(
      "Push notifications are not supported by this browser."
    );
  }

  // Check Notification API support
  if (!("Notification" in window)) {
    throw new Error(
      "Browser notifications are not supported."
    );
  }

  // Request notification permission
  const permission =
    await Notification.requestPermission();

  if (permission !== "granted") {
    throw new Error(
      "Notification permission was not granted."
    );
  }

  // Wait for FloodGuard service worker
  const registration =
    await navigator.serviceWorker.ready;

  // Check whether this device is already subscribed
  let subscription =
    await registration.pushManager.getSubscription();

  // Create a new push subscription
  if (!subscription) {
    const applicationServerKey =
      urlBase64ToUint8Array(VAPID_PUBLIC_KEY);

    subscription =
      await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });
  }

  // Send subscription to FloodGuard backend
  const response = await fetch(
    `${API_BASE_URL}/api/notifications/subscribe`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscription),
    }
  );

  if (!response.ok) {
    let errorMessage =
      "Failed to register device with FloodGuard.";

    try {
      const errorData = await response.json();

      if (errorData?.detail) {
        errorMessage = errorData.detail;
      }
    } catch {
      // Use default error message
    }

    throw new Error(errorMessage);
  }

  return subscription;
}