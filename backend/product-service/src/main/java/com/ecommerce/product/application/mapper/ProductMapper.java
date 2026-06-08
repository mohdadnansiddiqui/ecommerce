package com.ecommerce.product.application.mapper;

import com.ecommerce.product.application.dto.ProductRequest;
import com.ecommerce.product.application.dto.ProductResponse;
import com.ecommerce.product.domain.model.Product;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    Product toEntity(ProductRequest request);

    ProductResponse toResponse(Product product);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(ProductRequest request, @MappingTarget Product product);
}
