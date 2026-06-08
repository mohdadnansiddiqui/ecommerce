package com.ecommerce.order.application.service;

import com.ecommerce.order.domain.repository.OrderRepository;
import com.ecommerce.order.infrastructure.client.CartClient;
import com.ecommerce.order.infrastructure.client.CustomerClient;
import com.ecommerce.order.infrastructure.client.ProductClient;
import com.ecommerce.order.shared.exception.ResourceNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static com.ecommerce.order.support.OrderTestData.order;
import static com.ecommerce.order.support.OrderTestData.placeOrderRequest;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class OrderServiceTest {
    @Mock
    OrderRepository orderRepository;
    @Mock
    CustomerClient customerClient;
    @Mock
    ProductClient productClient;
    @Mock
    CartClient cartClient;
    @InjectMocks
    OrderService orderService;

    @Test
    void placeOrderCalculatesTotalAndClearsCart() {
        when(customerClient.getCustomer(10L)).thenReturn(new CustomerClient.CustomerResponse(10L, "Ada", "Lovelace", "ada@example.com", "9999999999", "London", Instant.now()));
        when(productClient.getProduct(99L)).thenReturn(new ProductClient.ProductResponse(99L, "Mouse", "Wireless", "Accessories", new BigDecimal("25.00"), 10, null, Instant.now()));
        when(orderRepository.save(any())).thenAnswer(invocation -> {
            var saved = (com.ecommerce.order.domain.model.PurchaseOrder) invocation.getArgument(0);
            saved.setId(1L);
            return saved;
        });

        var response = orderService.placeOrder(placeOrderRequest());

        assertThat(response.totalAmount()).isEqualByComparingTo("50.00");
        verify(cartClient).clearCart(10L);
    }

    @Test
    void cancelOrderMarksOrderCancelled() {
        var order = order();
        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));
        when(orderRepository.save(order)).thenReturn(order);

        var response = orderService.cancelOrder(1L);

        assertThat(response.orderStatus().name()).isEqualTo("CANCELLED");
    }

    @Test
    void getOrderThrowsWhenMissing() {
        when(orderRepository.findById(404L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> orderService.getOrder(404L))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void getOrdersByCustomerReturnsMappedOrders() {
        when(orderRepository.findByCustomerId(10L)).thenReturn(List.of(order()));

        assertThat(orderService.getOrdersByCustomer(10L)).hasSize(1);
    }
}
