package com.ecommerce.order.domain.repository;

import com.ecommerce.order.domain.model.OrderStatus;
import com.ecommerce.order.domain.model.PurchaseOrder;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
class OrderRepositoryIntegrationTest {
    @Autowired
    OrderRepository orderRepository;

    @Test
    void findByCustomerIdReturnsOrders() {
        orderRepository.save(PurchaseOrder.builder()
                .customerId(10L)
                .totalAmount(new BigDecimal("75.00"))
                .orderStatus(OrderStatus.PLACED)
                .build());

        assertThat(orderRepository.findByCustomerId(10L)).hasSize(1);
    }
}
