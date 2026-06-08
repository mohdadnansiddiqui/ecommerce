package com.ecommerce.cart.application.dto;

import java.util.List;

public record CartResponse(Long id, Long customerId, List<CartItemResponse> items) {
}
