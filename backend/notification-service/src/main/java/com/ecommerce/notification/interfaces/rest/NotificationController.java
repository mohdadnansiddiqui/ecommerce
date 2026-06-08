package com.ecommerce.notification.interfaces.rest;

import com.ecommerce.notification.application.dto.NotificationRequest;
import com.ecommerce.notification.application.dto.NotificationResponse;
import com.ecommerce.notification.application.service.NotificationService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
@Tag(name = "Notifications")
public class NotificationController {
    private final NotificationService notificationService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<NotificationResponse> create(@Valid @RequestBody NotificationRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(notificationService.create(request));
    }

    @GetMapping("/customers/{customerId}")
    @PreAuthorize("isAuthenticated()")
    public List<NotificationResponse> getByCustomer(@PathVariable Long customerId) {
        return notificationService.getByCustomer(customerId);
    }
}
