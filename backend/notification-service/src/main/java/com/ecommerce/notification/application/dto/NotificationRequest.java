package com.ecommerce.notification.application.dto;

import com.ecommerce.notification.domain.model.NotificationType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record NotificationRequest(@NotNull Long customerId, @NotBlank @Size(max = 1000) String message,
                                  @NotNull NotificationType notificationType) {
}
