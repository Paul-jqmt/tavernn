package etna.tavernn.notifications.repository;

import etna.tavernn.notifications.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, String> {
    List<Notification> findByUserIdOrderByCreationDateDesc(String userId);
    List<Notification> findByUserIdAndSeenOrderByCreationDateDesc(String userId, boolean seen);
}