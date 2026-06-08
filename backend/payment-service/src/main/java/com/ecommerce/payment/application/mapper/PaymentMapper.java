package com.ecommerce.payment.application.mapper;

import com.ecommerce.payment.application.dto.PaymentRequest;
import com.ecommerce.payment.application.dto.PaymentResponse;
import com.ecommerce.payment.domain.model.Payment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PaymentMapper {
    Payment toEntity(PaymentRequest request);

    PaymentResponse toResponse(Payment payment);
}
