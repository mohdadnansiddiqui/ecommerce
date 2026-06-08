package com.ecommerce.payment.infrastructure.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@FeignClient(name = "order-service", url = "${services.order.url}")
public interface OrderClient {
    @GetMapping("/api/v1/orders/{id}")
    OrderResponse getOrder(@PathVariable Long id);

    record OrderResponse(Long id, Long customerId, BigDecimal totalAmount, String orderStatus,
                         Instant createdAt, List<Object> items) {
    }
}
