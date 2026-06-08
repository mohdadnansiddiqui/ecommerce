package com.ecommerce.order.support;

import com.ecommerce.order.application.dto.OrderItemRequest;
import com.ecommerce.order.application.dto.OrderItemResponse;
import com.ecommerce.order.application.dto.OrderResponse;
import com.ecommerce.order.application.dto.PlaceOrderRequest;
import com.ecommerce.order.domain.model.OrderItem;
import com.ecommerce.order.domain.model.OrderStatus;
import com.ecommerce.order.domain.model.PurchaseOrder;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public final class OrderTestData {
    private OrderTestData() {
    }

    public static PlaceOrderRequest placeOrderRequest() {
        return new PlaceOrderRequest(10L, List.of(new OrderItemRequest(99L, 2)));
    }

    public static PurchaseOrder order() {
        var order = PurchaseOrder.builder()
                .id(1L)
                .customerId(10L)
                .totalAmount(new BigDecimal("50.00"))
                .orderStatus(OrderStatus.PLACED)
                .createdAt(Instant.parse("2026-01-01T00:00:00Z"))
                .build();
        order.getItems().add(OrderItem.builder().id(5L).order(order).productId(99L).quantity(2).price(new BigDecimal("25.00")).build());
        return order;
    }

    public static OrderResponse response() {
        return new OrderResponse(1L, 10L, new BigDecimal("50.00"), OrderStatus.PLACED,
                Instant.parse("2026-01-01T00:00:00Z"),
                List.of(new OrderItemResponse(5L, 99L, 2, new BigDecimal("25.00"))));
    }
}
