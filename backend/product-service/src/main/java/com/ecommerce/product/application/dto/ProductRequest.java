package com.ecommerce.product.application.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record ProductRequest(
        @NotBlank @Size(max = 160) String name,
        @Size(max = 2000) String description,
        @NotBlank @Size(max = 120) String category,
        @NotNull @DecimalMin("0.01") BigDecimal price,
        @NotNull @Min(0) Integer stockQuantity,
        String imageUrl) {
}
