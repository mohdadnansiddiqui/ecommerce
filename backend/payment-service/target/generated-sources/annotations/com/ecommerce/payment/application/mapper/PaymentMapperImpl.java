package com.ecommerce.payment.application.mapper;

import com.ecommerce.payment.application.dto.PaymentRequest;
import com.ecommerce.payment.application.dto.PaymentResponse;
import com.ecommerce.payment.domain.model.Payment;
import com.ecommerce.payment.domain.model.PaymentMethod;
import com.ecommerce.payment.domain.model.PaymentStatus;
import java.math.BigDecimal;
import java.time.Instant;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-07T22:39:40+0530",
    comments = "version: 1.6.3, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
@Component
public class PaymentMapperImpl implements PaymentMapper {

    @Override
    public Payment toEntity(PaymentRequest request) {
        if ( request == null ) {
            return null;
        }

        Payment.PaymentBuilder payment = Payment.builder();

        payment.orderId( request.orderId() );
        payment.amount( request.amount() );
        payment.paymentMethod( request.paymentMethod() );

        return payment.build();
    }

    @Override
    public PaymentResponse toResponse(Payment payment) {
        if ( payment == null ) {
            return null;
        }

        Long id = null;
        Long orderId = null;
        BigDecimal amount = null;
        PaymentMethod paymentMethod = null;
        PaymentStatus paymentStatus = null;
        Instant paymentDate = null;

        id = payment.getId();
        orderId = payment.getOrderId();
        amount = payment.getAmount();
        paymentMethod = payment.getPaymentMethod();
        paymentStatus = payment.getPaymentStatus();
        paymentDate = payment.getPaymentDate();

        PaymentResponse paymentResponse = new PaymentResponse( id, orderId, amount, paymentMethod, paymentStatus, paymentDate );

        return paymentResponse;
    }
}
