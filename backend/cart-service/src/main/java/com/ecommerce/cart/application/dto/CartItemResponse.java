package com.ecommerce.cart.application.dto;

public record CartItemResponse(Long id, Long productId, Integer quantity) {
}
