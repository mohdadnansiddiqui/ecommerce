package com.ecommerce.notification.application.service;

import com.ecommerce.notification.application.dto.NotificationRequest;
import com.ecommerce.notification.application.dto.NotificationResponse;
import com.ecommerce.notification.application.mapper.NotificationMapper;
import com.ecommerce.notification.domain.repository.NotificationRepository;
import com.ecommerce.notification.infrastructure.client.CustomerClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;
    private final CustomerClient customerClient;

    public NotificationResponse create(NotificationRequest request) {
        customerClient.getCustomer(request.customerId());
        return notificationMapper.toResponse(notificationRepository.save(notificationMapper.toEntity(request)));
    }

    @Transactional(readOnly = true)
    public List<NotificationResponse> getByCustomer(Long customerId) {
        return notificationRepository.findByCustomerIdOrderByCreatedAtDesc(customerId).stream()
                .map(notificationMapper::toResponse)
                .toList();
    }
}
