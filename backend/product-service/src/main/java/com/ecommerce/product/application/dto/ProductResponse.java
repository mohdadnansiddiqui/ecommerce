package com.ecommerce.product.application.dto;

import java.math.BigDecimal;
import java.time.Instant;

public record ProductResponse(
        Long id,
        String name,
        String description,
        String category,
        BigDecimal price,
        Integer stockQuantity,
        String imageUrl,
        Instant createdAt) {
}
