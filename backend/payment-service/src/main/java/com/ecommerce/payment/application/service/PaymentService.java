package com.ecommerce.payment.application.service;

import com.ecommerce.payment.application.dto.PaymentRequest;
import com.ecommerce.payment.application.dto.PaymentResponse;
import com.ecommerce.payment.application.mapper.PaymentMapper;
import com.ecommerce.payment.domain.model.Payment;
import com.ecommerce.payment.domain.model.PaymentStatus;
import com.ecommerce.payment.domain.repository.PaymentRepository;
import com.ecommerce.payment.infrastructure.client.OrderClient;
import com.ecommerce.payment.shared.exception.BadRequestException;
import com.ecommerce.payment.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final PaymentMapper paymentMapper;
    private final OrderClient orderClient;

    public PaymentResponse createPayment(PaymentRequest request) {
        var order = orderClient.getOrder(request.orderId());
        if (request.amount().compareTo(order.totalAmount()) != 0) {
            throw new BadRequestException("Payment amount must match order total");
        }
        Payment payment = paymentMapper.toEntity(request);
        payment.setPaymentStatus(PaymentStatus.SUCCESS);
        return paymentMapper.toResponse(paymentRepository.save(payment));
    }

    @Transactional(readOnly = true)
    public PaymentResponse getPayment(Long id) {
        return paymentRepository.findById(id)
                .map(paymentMapper::toResponse)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with id " + id));
    }

    @Transactional(readOnly = true)
    public List<PaymentResponse> getHistory(Long orderId) {
        return paymentRepository.findByOrderId(orderId).stream()
                .map(paymentMapper::toResponse)
                .toList();
    }
}
