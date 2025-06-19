
package etna.tavernn.notifications.service;

import etna.tavernn.notifications.dto.CreateNotificationRequest;
import etna.tavernn.notifications.dto.NotificationResponse;
import etna.tavernn.notifications.model.Notification;
import etna.tavernn.notifications.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationResponse createNotification(CreateNotificationRequest request) {
        var notification = Notification.builder()
                .id(UUID.randomUUID().toString())
                .userId(request.getUserId())
                .title(request.getTitle())
                .message(request.getMessage())
                .seen(false)
                .creationDate(LocalDateTime.now())
                .build();

        return mapToResponse(notificationRepository.save(notification));
    }

    public List<NotificationResponse> getUserNotifications(String userId) {
        return notificationRepository.findByUserIdOrderByCreationDateDesc(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<NotificationResponse> getUnseenNotifications(String userId) {
        return notificationRepository.findByUserIdAndSeenOrderByCreationDateDesc(userId, false)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional
    public NotificationResponse markAsSeen(String notificationId) {
        var notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));

        notification.setSeen(true);
        return mapToResponse(notificationRepository.save(notification));
    }

    @Transactional
    public void deleteNotification(String notificationId) {
        notificationRepository.deleteById(notificationId);
    }

    private NotificationResponse mapToResponse(Notification notification) {
        return NotificationResponse.builder()
                .id(notification.getId())
                .userId(notification.getUserId())
                .title(notification.getTitle())
                .message(notification.getMessage())
                .seen(notification.isSeen())
                .creationDate(notification.getCreationDate())
                .build();
    }
}