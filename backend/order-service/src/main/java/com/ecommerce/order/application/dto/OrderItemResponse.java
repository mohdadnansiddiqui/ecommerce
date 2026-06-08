package com.ecommerce.order.application.dto;

import java.math.BigDecimal;

public record OrderItemResponse(Long id, Long productId, Integer quantity, BigDecimal price) {
}
