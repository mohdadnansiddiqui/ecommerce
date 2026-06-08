package com.ecommerce.review.application.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ReviewRequest(@NotNull Long customerId, @NotNull Long productId,
                            @NotNull @Min(1) @Max(5) Integer rating,
                            @NotBlank @Size(max = 2000) String reviewText) {
}
