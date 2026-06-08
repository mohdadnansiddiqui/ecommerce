package com.ecommerce.payment.application.dto;

import com.ecommerce.payment.domain.model.PaymentMethod;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record PaymentRequest(@NotNull Long orderId, @NotNull @DecimalMin("0.01") BigDecimal amount,
                             @NotNull PaymentMethod paymentMethod) {
}
