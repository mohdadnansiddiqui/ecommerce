package com.ecommerce.inventory.application.mapper;

import com.ecommerce.inventory.application.dto.InventoryRequest;
import com.ecommerce.inventory.application.dto.InventoryResponse;
import com.ecommerce.inventory.domain.model.Inventory;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-07T22:38:04+0530",
    comments = "version: 1.6.3, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
@Component
public class InventoryMapperImpl implements InventoryMapper {

    @Override
    public Inventory toEntity(InventoryRequest request) {
        if ( request == null ) {
            return null;
        }

        Inventory.InventoryBuilder inventory = Inventory.builder();

        inventory.productId( request.productId() );
        inventory.availableQuantity( request.availableQuantity() );
        inventory.warehouseLocation( request.warehouseLocation() );

        return inventory.build();
    }

    @Override
    public InventoryResponse toResponse(Inventory inventory) {
        if ( inventory == null ) {
            return null;
        }

        Long id = null;
        Long productId = null;
        Integer availableQuantity = null;
        String warehouseLocation = null;

        id = inventory.getId();
        productId = inventory.getProductId();
        availableQuantity = inventory.getAvailableQuantity();
        warehouseLocation = inventory.getWarehouseLocation();

        InventoryResponse inventoryResponse = new InventoryResponse( id, productId, availableQuantity, warehouseLocation );

        return inventoryResponse;
    }
}
