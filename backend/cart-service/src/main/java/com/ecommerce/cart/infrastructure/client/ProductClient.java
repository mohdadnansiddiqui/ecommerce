package com.ecommerce.cart.infrastructure.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.math.BigDecimal;
import java.time.Instant;

@FeignClient(name = "product-service", url = "${services.product.url}")
public interface ProductClient {
    @GetMapping("/api/v1/products/{id}")
    ProductResponse getProduct(@PathVariable Long id);

    record ProductResponse(Long id, String name, String description, String category,
                           BigDecimal price, Integer stockQuantity, String imageUrl, Instant createdAt) {
    }
}
