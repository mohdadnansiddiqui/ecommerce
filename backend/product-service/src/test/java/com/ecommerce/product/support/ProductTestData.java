package com.ecommerce.product.support;

import com.ecommerce.product.application.dto.ProductRequest;
import com.ecommerce.product.application.dto.ProductResponse;
import com.ecommerce.product.domain.model.Product;

import java.math.BigDecimal;
import java.time.Instant;

public final class ProductTestData {
    private ProductTestData() {
    }

    public static Product product() {
        return Product.builder()
                .id(1L)
                .name("Mechanical Keyboard")
                .description("Hot swappable keyboard")
                .category("Accessories")
                .price(new BigDecimal("129.99"))
                .stockQuantity(25)
                .imageUrl("https://example.com/keyboard.png")
                .createdAt(Instant.parse("2026-01-01T00:00:00Z"))
                .build();
    }

    public static ProductRequest request() {
        return new ProductRequest("Mechanical Keyboard", "Hot swappable keyboard", "Accessories",
                new BigDecimal("129.99"), 25, "https://example.com/keyboard.png");
    }

    public static ProductResponse response() {
        return new ProductResponse(1L, "Mechanical Keyboard", "Hot swappable keyboard", "Accessories",
                new BigDecimal("129.99"), 25, "https://example.com/keyboard.png",
                Instant.parse("2026-01-01T00:00:00Z"));
    }
}
