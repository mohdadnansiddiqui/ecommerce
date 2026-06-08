package com.ecommerce.inventory.application.dto;

public record InventoryResponse(Long id, Long productId, Integer availableQuantity, String warehouseLocation) {
}
