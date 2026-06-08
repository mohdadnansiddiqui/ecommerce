package com.ecommerce.cart.application.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record UpdateCartItemRequest(@NotNull @Min(1) Integer quantity) {
}
