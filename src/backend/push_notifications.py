import json
import os
from typing import Any

from pywebpush import webpush, WebPushException


VAPID_PRIVATE_KEY = os.getenv("VAPID_PRIVATE_KEY", "")
VAPID_EMAIL = os.getenv(
    "VAPID_EMAIL",
    "mailto:floodguard@example.com",
)

subscriptions: list[dict[str, Any]] = []


def add_subscription(subscription: dict[str, Any]) -> None:
    endpoint = subscription.get("endpoint")

    if not endpoint:
        raise ValueError("Push subscription endpoint is missing")

    for existing in subscriptions:
        if existing.get("endpoint") == endpoint:
            return

    subscriptions.append(subscription)


def send_push_notification(
    subscription: dict[str, Any],
    title: str,
    message: str,
) -> bool:

    if not VAPID_PRIVATE_KEY:
        raise RuntimeError(
            "VAPID_PRIVATE_KEY is not configured"
        )

    payload = json.dumps(
        {
            "title": title,
            "body": message,
            "url": "/FloodGuard/",
        }
    )

    try:
        webpush(
            subscription_info=subscription,
            data=payload,
            vapid_private_key=VAPID_PRIVATE_KEY,
            vapid_claims={
                "sub": VAPID_EMAIL,
            },
        )

        return True

    except WebPushException as error:
        print("Push notification failed:", error)
        return False


def send_to_all_subscribers(
    title: str,
    message: str,
) -> int:

    sent_count = 0

    for subscription in subscriptions:
        if send_push_notification(
            subscription,
            title,
            message,
        ):
            sent_count += 1

    return sent_count
