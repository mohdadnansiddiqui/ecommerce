package com.ecommerce.inventory.application.mapper;

import com.ecommerce.inventory.application.dto.InventoryRequest;
import com.ecommerce.inventory.application.dto.InventoryResponse;
import com.ecommerce.inventory.domain.model.Inventory;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface InventoryMapper {
    Inventory toEntity(InventoryRequest request);

    InventoryResponse toResponse(Inventory inventory);
}
