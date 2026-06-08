package com.ecommerce.customer.application.mapper;

import com.ecommerce.customer.application.dto.CustomerRequest;
import com.ecommerce.customer.application.dto.CustomerResponse;
import com.ecommerce.customer.domain.model.Customer;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
    Customer toEntity(CustomerRequest request);

    CustomerResponse toResponse(Customer customer);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(CustomerRequest request, @MappingTarget Customer customer);
}
