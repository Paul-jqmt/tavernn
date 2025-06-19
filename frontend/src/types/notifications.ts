export interface NotificationResponse {
    id: string;
    title: string;
    content: string;
    seen: boolean;
    createdAt: string;
    userId: string;
}

export interface CreateNotificationRequest {
    title: string;
    content: string;
    userId: string;
}
