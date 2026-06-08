package com.ecommerce.payment.interfaces.rest;

import com.ecommerce.payment.application.dto.PaymentRequest;
import com.ecommerce.payment.application.dto.PaymentResponse;
import com.ecommerce.payment.application.service.PaymentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/payments")
@RequiredArgsConstructor
@Tag(name = "Payments")
public class PaymentController {
    private final PaymentService paymentService;

    @PostMapping
    @PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    public ResponseEntity<PaymentResponse> createPayment(@Valid @RequestBody PaymentRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(paymentService.createPayment(request));
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public PaymentResponse getPayment(@PathVariable Long id) {
        return paymentService.getPayment(id);
    }

    @GetMapping("/history")
    @PreAuthorize("isAuthenticated()")
    public List<PaymentResponse> getHistory(@RequestParam Long orderId) {
        return paymentService.getHistory(orderId);
    }
}
