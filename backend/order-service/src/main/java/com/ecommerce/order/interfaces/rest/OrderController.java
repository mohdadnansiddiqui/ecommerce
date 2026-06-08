package com.ecommerce.order.interfaces.rest;

import com.ecommerce.order.application.dto.OrderResponse;
import com.ecommerce.order.application.dto.PlaceOrderRequest;
import com.ecommerce.order.application.service.JwtService;
import com.ecommerce.order.application.service.OrderService;
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
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
@Tag(name = "Orders")
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    @PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    public ResponseEntity<OrderResponse> placeOrder(@Valid @RequestBody PlaceOrderRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.placeOrder(request));
    }

    @PostMapping("/{id}/cancel")
    @PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    public OrderResponse cancelOrder(@PathVariable Long id) {
        return orderService.cancelOrder(id);
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")
    public OrderResponse getOrder(@PathVariable Long id) {
        return orderService.getOrder(id);
    }

    @GetMapping("/customers/{customerId}")
    @PreAuthorize("isAuthenticated()")
    public List<OrderResponse> getOrdersByCustomer(@PathVariable Long customerId) {
        return orderService.getOrdersByCustomer(customerId);
    }
}
