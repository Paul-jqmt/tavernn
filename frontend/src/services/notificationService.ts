import api from "@/services/api";
import {CreateNotificationRequest} from "@/types/notifications.ts";
import {NotificationResponse} from "@/types/notifications.ts";

export const notificationService = {
    async createNotification(data: CreateNotificationRequest): Promise<NotificationResponse> {
        const response = await api.post("/api/notifications", data);
        return response.data;
    },

    async getUserNotifications(userId: string): Promise<NotificationResponse[]> {
        const response = await api.get(`/api/notifications/user/${userId}`);
        return response.data;
    },

    async getUnseenNotifications(userId: string): Promise<NotificationResponse[]> {
        const response = await api.get(`/api/notifications/user/${userId}/unseen`);
        return response.data;
    },

    async markAsSeen(notificationId: string): Promise<NotificationResponse> {
        const response = await api.patch(`/api/notifications/${notificationId}/seen`);
        return response.data;
    },

    async deleteNotification(notificationId: string): Promise<void> {
        await api.delete(`/api/notifications/${notificationId}`);
    }
}
