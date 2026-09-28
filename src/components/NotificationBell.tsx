import { useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  X,
  ShieldAlert,
  MapPin,
} from "lucide-react";
import { subscribeToPushNotifications } from "../services/pushNotifications";

type NotificationItem = {
  id: number;
  area: string;
  risk: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  action: string;
  time: string;
  read: boolean;
};

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    area: "T. Nagar",
    risk: "HIGH",
    action: "Inspect drainage and issue warning",
    time: "Just now",
    read: false,
  },
  {
    id: 2,
    area: "Velachery",
    risk: "CRITICAL",
    action: "Initiate authority inspection",
    time: "5 min ago",
    read: false,
  },
  {
    id: 3,
    area: "Adyar",
    risk: "MODERATE",
    action: "Monitor rainfall and drainage capacity",
    time: "12 min ago",
    read: true,
  },
  {
    id: 4,
    area: "Saidapet",
    risk: "HIGH",
    action: "Inspect vulnerable drainage locations",
    time: "18 min ago",
    read: true,
  },
  {
    id: 5,
    area: "Anna Nagar",
    risk: "LOW",
    action: "Continue monitoring",
    time: "25 min ago",
    read: true,
  },
  {
    id: 6,
    area: "Tambaram",
    risk: "MODERATE",
    action: "Monitor water level and rainfall trend",
    time: "30 min ago",
    read: true,
  },
];

function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);

  const [isSubscribing, setIsSubscribing] =
    useState(false);

  const [subscriptionMessage, setSubscriptionMessage] =
    useState("");

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const enablePushNotifications = async () => {
    setIsSubscribing(true);
    setSubscriptionMessage("");

    try {
      await subscribeToPushNotifications();

      setSubscriptionMessage(
        "Push notifications enabled on this device."
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to enable push notifications.";

      setSubscriptionMessage(message);
    } finally {
      setIsSubscribing(false);
    }
  };

  const markAsRead = (id: number) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const dismissNotification = (id: number) => {
    setNotifications((current) =>
      current.filter(
        (notification) => notification.id !== id
      )
    );
  };

  const getRiskClass = (
    risk: NotificationItem["risk"]
  ) => {
    switch (risk) {
      case "CRITICAL":
        return "bg-red-100 text-red-700 border-red-200";

      case "HIGH":
        return "bg-orange-100 text-orange-700 border-orange-200";

      case "MODERATE":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";

      case "LOW":
        return "bg-green-100 text-green-700 border-green-200";

      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
        aria-label="Open notifications"
      >
        <Bell className="h-5 w-5" />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 z-50 mt-3 w-[380px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="border-b border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    FloodGuard Alerts
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Prototype / Simulated Alerts
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-200"
                  aria-label="Close notifications"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={enablePushNotifications}
                disabled={isSubscribing}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Bell className="h-4 w-4" />

                {isSubscribing
                  ? "Enabling..."
                  : "Enable Push Notifications"}
              </button>

              {subscriptionMessage && (
                <div className="mt-3 rounded-lg bg-white p-2 text-xs text-slate-600">
                  {subscriptionMessage}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
              <span className="text-xs font-semibold text-slate-600">
                {unreadCount} unread alert
                {unreadCount !== 1 ? "s" : ""}
              </span>

              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  <CheckCheck className="h-4 w-4" />
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-[430px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Check className="mx-auto h-8 w-8 text-green-500" />

                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    No active notifications
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    You're all caught up.
                  </p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`border-b border-slate-100 p-4 transition ${
                      notification.read
                        ? "bg-white"
                        : "bg-blue-50/40"
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                        <ShieldAlert className="h-5 w-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-3.5 w-3.5 text-slate-500" />

                              <span className="text-sm font-bold text-slate-900">
                                {notification.area}
                              </span>
                            </div>

                            <span
                              className={`mt-1 inline-flex rounded-md border px-2 py-0.5 text-[10px] font-bold ${getRiskClass(
                                notification.risk
                              )}`}
                            >
                              {notification.risk}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              dismissNotification(
                                notification.id
                              )
                            }
                            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                            aria-label="Dismiss notification"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        <p className="mt-2 text-xs leading-5 text-slate-600">
                          <span className="font-semibold">
                            Recommended action:
                          </span>{" "}
                          {notification.action}
                        </p>

                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-[11px] text-slate-400">
                            {notification.time}
                          </span>

                          {!notification.read && (
                            <button
                              type="button"
                              onClick={() =>
                                markAsRead(notification.id)
                              }
                              className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700"
                            >
                              <Check className="h-3.5 w-3.5" />
                              Mark read
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-center text-[10px] leading-4 text-slate-500">
                PROTOTYPE / SIMULATED DATA — FloodGuard
                browser alerts are for demonstration only.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default NotificationBell;