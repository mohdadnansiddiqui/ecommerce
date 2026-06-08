package com.ecommerce.customer.application.dto;

import java.time.Instant;

public record CustomerResponse(
        Long id,
        String firstName,
        String lastName,
        String email,
        String phoneNumber,
        String address,
        Instant createdAt) {
}
