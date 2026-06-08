package com.ecommerce.inventory.interfaces.rest;

import com.ecommerce.inventory.application.dto.InventoryRequest;
import com.ecommerce.inventory.application.dto.InventoryResponse;
import com.ecommerce.inventory.application.dto.StockUpdateRequest;
import com.ecommerce.inventory.application.service.InventoryService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/inventory")
@RequiredArgsConstructor
@Tag(name = "Inventory")
public class InventoryController {
    private final InventoryService inventoryService;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<InventoryResponse> create(@Valid @RequestBody InventoryRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(inventoryService.create(request));
    }

    @PatchMapping("/products/{productId}/stock")
    @PreAuthorize("hasRole('ADMIN')")
    public InventoryResponse updateStock(@PathVariable Long productId, @Valid @RequestBody StockUpdateRequest request) {
        return inventoryService.updateStock(productId, request);
    }

    @GetMapping("/products/{productId}/stock")
    @PreAuthorize("isAuthenticated()")
    public InventoryResponse getStock(@PathVariable Long productId) {
        return inventoryService.getStock(productId);
    }
}
