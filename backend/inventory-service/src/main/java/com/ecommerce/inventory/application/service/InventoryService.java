package com.ecommerce.inventory.application.service;

import com.ecommerce.inventory.application.dto.InventoryRequest;
import com.ecommerce.inventory.application.dto.InventoryResponse;
import com.ecommerce.inventory.application.dto.StockUpdateRequest;
import com.ecommerce.inventory.application.mapper.InventoryMapper;
import com.ecommerce.inventory.domain.model.Inventory;
import com.ecommerce.inventory.domain.repository.InventoryRepository;
import com.ecommerce.inventory.shared.exception.BadRequestException;
import com.ecommerce.inventory.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class InventoryService {
    private final InventoryRepository inventoryRepository;
    private final InventoryMapper inventoryMapper;

    public InventoryResponse create(InventoryRequest request) {
        inventoryRepository.findByProductId(request.productId())
                .ifPresent(existing -> {
                    throw new BadRequestException("Inventory already exists for product " + request.productId());
                });
        return inventoryMapper.toResponse(inventoryRepository.save(inventoryMapper.toEntity(request)));
    }

    public InventoryResponse updateStock(Long productId, StockUpdateRequest request) {
        Inventory inventory = inventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory not found for product " + productId));
        inventory.setAvailableQuantity(request.availableQuantity());
        return inventoryMapper.toResponse(inventoryRepository.save(inventory));
    }

    @Transactional(readOnly = true)
    public InventoryResponse getStock(Long productId) {
        return inventoryRepository.findByProductId(productId)
                .map(inventoryMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory not found for product " + productId));
    }
}
