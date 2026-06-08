package com.ecommerce.notification.domain.repository;

import com.ecommerce.notification.domain.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByCustomerIdOrderByCreatedAtDesc(Long customerId);
}
