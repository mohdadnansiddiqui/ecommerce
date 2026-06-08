package com.ecommerce.notification.application.mapper;

import com.ecommerce.notification.application.dto.NotificationRequest;
import com.ecommerce.notification.application.dto.NotificationResponse;
import com.ecommerce.notification.domain.model.Notification;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface NotificationMapper {
    Notification toEntity(NotificationRequest request);

    NotificationResponse toResponse(Notification notification);
}
