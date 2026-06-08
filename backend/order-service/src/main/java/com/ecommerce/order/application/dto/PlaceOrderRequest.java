package com.ecommerce.order.application.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record PlaceOrderRequest(@NotNull Long customerId, @NotEmpty List<@Valid OrderItemRequest> items) {
}
