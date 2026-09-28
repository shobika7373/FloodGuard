import { useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  X,
  AlertTriangle,
  Info,
  MapPin,
  Clock,
  Smartphone,
} from "lucide-react";

import { subscribeToPushNotifications } from "../services/pushNotifications";

type NotificationItem = {
  id: number;
  area: string;
  priority: "Immediate" | "High" | "Monitor";
  risk: number;
  title: string;
  explanation: string;
  action: string;
  generatedAt: string;
  read: boolean;
};

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    area: "Saidapet",
    priority: "Immediate",
    risk: 91,
    title: "IMMEDIATE RESPONSE",
    explanation:
      "Simulated flood conditions indicate a high-priority response requirement.",
    action: "Deploy drainage response team",
    generatedAt: "Just now",
    read: false,
  },
  {
    id: 2,
    area: "T. Nagar",
    priority: "High",
    risk: 86,
    title: "HIGH FLOOD RISK",
    explanation:
      "Simulated rainfall and drainage conditions indicate elevated flood risk.",
    action: "Prepare public warning",
    generatedAt: "2 min ago",
    read: false,
  },
  {
    id: 3,
    area: "Velachery",
    priority: "High",
    risk: 79,
    title: "HIGH FLOOD RISK",
    explanation:
      "Simulated conditions indicate increased drainage stress in the area.",
    action: "Inspect vulnerable drainage points",
    generatedAt: "5 min ago",
    read: false,
  },
  {
    id: 4,
    area: "Adyar",
    priority: "High",
    risk: 68,
    title: "HIGH FLOOD RISK",
    explanation:
      "Simulated conditions indicate elevated flood monitoring requirements.",
    action: "Continue water-level monitoring",
    generatedAt: "8 min ago",
    read: true,
  },
  {
    id: 5,
    area: "Anna Nagar",
    priority: "Monitor",
    risk: 48,
    title: "MONITOR CONDITIONS",
    explanation:
      "Simulated conditions currently indicate a lower-priority monitoring state.",
    action: "Continue monitoring conditions",
    generatedAt: "10 min ago",
    read: true,
  },
  {
    id: 6,
    area: "Tambaram",
    priority: "Monitor",
    risk: 52,
    title: "MONITOR CONDITIONS",
    explanation:
      "Simulated rainfall and drainage conditions require continued monitoring.",
    action: "Monitor rainfall and drainage conditions",
    generatedAt: "12 min ago",
    read: true,
  },
];

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);

  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);

  const [isSubscribing, setIsSubscribing] = useState(false);

  const [subscriptionMessage, setSubscriptionMessage] =
    useState("");

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

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
      current.filter((notification) => notification.id !== id)
    );
  };

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

  const getPriorityClass = (
    priority: NotificationItem["priority"]
  ) => {
    if (priority === "Immediate") {
      return "border-red-200 bg-red-50 text-red-700";
    }

    if (priority === "High") {
      return "border-orange-200 bg-orange-50 text-orange-700";
    }

    return "border-blue-200 bg-blue-50 text-blue-700";
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen((current) => !current)}
        className="relative rounded-lg p-2 hover:bg-slate-100"
        aria-label="Prototype notifications"
      >
        <Bell className="h-5 w-5 text-slate-600" />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-[380px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <div>
              <h3 className="font-semibold text-slate-800">
                FloodGuard Alerts
              </h3>

              <p className="text-xs text-slate-500">
                Prototype notification center
              </p>
            </div>

            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  title="Mark all as read"
                >
                  <CheckCheck className="h-4 w-4" />
                </button>
              )}

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                title="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Push Notification Section */}
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100">
                <Smartphone className="h-4 w-4 text-blue-600" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-800">
                  Mobile Push Notifications
                </p>

                <p className="mt-1 text-[11px] leading-4 text-slate-500">
                  Enable notifications to receive FloodGuard alerts
                  on this device.
                </p>

                <button
                  onClick={enablePushNotifications}
                  disabled={isSubscribing}
                  className="mt-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubscribing
                    ? "Enabling..."
                    : "Enable Push Notifications"}
                </button>

                {subscriptionMessage && (
                  <p className="mt-2 text-[11px] font-medium text-slate-600">
                    {subscriptionMessage}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Prototype Warning */}
          <div className="border-b border-yellow-200 bg-yellow-50 px-4 py-2.5">
            <div className="flex gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-yellow-600" />

              <p className="text-[11px] font-medium leading-4 text-yellow-800">
                SIMULATED ALERT — NOT A REAL EMERGENCY NOTIFICATION
              </p>
            </div>
          </div>

          {/* Notifications */}
          <div className="max-h-[520px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-10 text-center">
                <Bell className="mx-auto mb-2 h-8 w-8 text-slate-300" />

                <p className="text-sm font-medium text-slate-600">
                  No notifications
                </p>

                <p className="text-xs text-slate-400">
                  All prototype alerts have been cleared.
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`border-b border-slate-100 px-4 py-4 ${
                    notification.read
                      ? "bg-white"
                      : "bg-slate-50"
                  }`}
                >
                  <div className="flex gap-3">
                    {/* Icon */}
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${getPriorityClass(
                        notification.priority
                      )}`}
                    >
                      {notification.priority === "Monitor" ? (
                        <Info className="h-4 w-4" />
                      ) : (
                        <AlertTriangle className="h-4 w-4" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span
                            className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold ${getPriorityClass(
                              notification.priority
                            )}`}
                          >
                            {notification.priority}
                          </span>

                          <h4 className="mt-1 text-sm font-semibold text-slate-800">
                            {notification.title}
                          </h4>
                        </div>

                        <button
                          onClick={() =>
                            dismissNotification(notification.id)
                          }
                          className="shrink-0 rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                          title="Dismiss"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Area and risk */}
                      <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {notification.area}
                        </span>

                        <span className="font-semibold text-slate-700">
                          Risk: {notification.risk}/100
                        </span>

                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {notification.generatedAt}
                        </span>
                      </div>

                      {/* Explanation */}
                      <p className="mt-2 text-xs leading-5 text-slate-600">
                        {notification.explanation}
                      </p>

                      {/* Recommended action */}
                      <div className="mt-2 rounded-lg bg-slate-100 px-3 py-2">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                          Recommended Action
                        </p>

                        <p className="mt-1 text-xs font-medium text-slate-700">
                          {notification.action}
                        </p>
                      </div>

                      {/* Read button */}
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800"
                        >
                          <Check className="h-3.5 w-3.5" />
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 bg-slate-50 px-4 py-2">
            <p className="text-center text-[10px] font-medium text-slate-500">
              SIMULATED ALERTS • PROTOTYPE ONLY • NOT A REAL EMERGENCY SERVICE
            </p>
          </div>
        </div>
      )}
    </div>
  );
}