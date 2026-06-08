package com.ecommerce.review.application.dto;

import java.time.Instant;

public record ReviewResponse(Long id, Long customerId, Long productId, Integer rating, String reviewText,
                             Instant createdAt) {
}
