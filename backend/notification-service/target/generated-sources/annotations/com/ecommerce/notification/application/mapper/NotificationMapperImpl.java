package com.ecommerce.notification.application.mapper;

import com.ecommerce.notification.application.dto.NotificationRequest;
import com.ecommerce.notification.application.dto.NotificationResponse;
import com.ecommerce.notification.domain.model.Notification;
import com.ecommerce.notification.domain.model.NotificationType;
import java.time.Instant;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-07T22:38:37+0530",
    comments = "version: 1.6.3, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
@Component
public class NotificationMapperImpl implements NotificationMapper {

    @Override
    public Notification toEntity(NotificationRequest request) {
        if ( request == null ) {
            return null;
        }

        Notification.NotificationBuilder notification = Notification.builder();

        notification.customerId( request.customerId() );
        notification.message( request.message() );
        notification.notificationType( request.notificationType() );

        return notification.build();
    }

    @Override
    public NotificationResponse toResponse(Notification notification) {
        if ( notification == null ) {
            return null;
        }

        Long id = null;
        Long customerId = null;
        String message = null;
        NotificationType notificationType = null;
        Instant createdAt = null;

        id = notification.getId();
        customerId = notification.getCustomerId();
        message = notification.getMessage();
        notificationType = notification.getNotificationType();
        createdAt = notification.getCreatedAt();

        NotificationResponse notificationResponse = new NotificationResponse( id, customerId, message, notificationType, createdAt );

        return notificationResponse;
    }
}
