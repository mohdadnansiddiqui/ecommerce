package com.ecommerce.order.application.dto;

import com.ecommerce.order.domain.model.OrderStatus;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record OrderResponse(Long id, Long customerId, BigDecimal totalAmount, OrderStatus orderStatus,
                            Instant createdAt, List<OrderItemResponse> items) {
}
