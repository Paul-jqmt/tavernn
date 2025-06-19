package etna.tavernn.notifications.controller;

import etna.tavernn.notifications.dto.CreateNotificationRequest;
import etna.tavernn.notifications.dto.NotificationResponse;
import etna.tavernn.notifications.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping
    public ResponseEntity<NotificationResponse> createNotification(@RequestBody CreateNotificationRequest request) {
        return ResponseEntity.ok(notificationService.createNotification(request));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<NotificationResponse>> getUserNotifications(@PathVariable String userId) {
        return ResponseEntity.ok(notificationService.getUserNotifications(userId));
    }

    @GetMapping("/user/{userId}/unseen")
    public ResponseEntity<List<NotificationResponse>> getUnseenNotifications(@PathVariable String userId) {
        return ResponseEntity.ok(notificationService.getUnseenNotifications(userId));
    }

    @PatchMapping("/{id}/seen")
    public ResponseEntity<NotificationResponse> markAsSeen(@PathVariable String id) {
        return ResponseEntity.ok(notificationService.markAsSeen(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable String id) {
        notificationService.deleteNotification(id);
        return ResponseEntity.noContent().build();
    }
}