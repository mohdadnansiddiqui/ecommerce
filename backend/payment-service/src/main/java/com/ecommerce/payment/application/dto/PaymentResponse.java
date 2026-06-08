package com.ecommerce.payment.application.dto;

import com.ecommerce.payment.domain.model.PaymentMethod;
import com.ecommerce.payment.domain.model.PaymentStatus;

import java.math.BigDecimal;
import java.time.Instant;

public record PaymentResponse(Long id, Long orderId, BigDecimal amount, PaymentMethod paymentMethod,
                              PaymentStatus paymentStatus, Instant paymentDate) {
}
