package com.ecommerce.notification.application.dto;

import com.ecommerce.notification.domain.model.NotificationType;

import java.time.Instant;

public record NotificationResponse(Long id, Long customerId, String message, NotificationType notificationType,
                                   Instant createdAt) {
}
