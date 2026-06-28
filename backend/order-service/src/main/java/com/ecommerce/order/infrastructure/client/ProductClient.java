package com.ecommerce.order.infrastructure.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.ecommerce.order.config.FeignConfig;

import java.math.BigDecimal;
import java.time.Instant;

@FeignClient(name = "product-service", configuration = FeignConfig.class)
public interface ProductClient {
    @GetMapping("/api/v1/products/{id}")
    ProductResponse getProduct(@PathVariable Long id);

    record ProductResponse(Long id, String name, String description, String category,
                           BigDecimal price, Integer stockQuantity, String imageUrl, Instant createdAt) {
    }
}
