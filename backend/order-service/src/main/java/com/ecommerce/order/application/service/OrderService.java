package com.ecommerce.order.application.service;

import com.ecommerce.order.application.dto.OrderItemResponse;
import com.ecommerce.order.application.dto.OrderResponse;
import com.ecommerce.order.application.dto.PlaceOrderRequest;
import com.ecommerce.order.domain.model.OrderItem;
import com.ecommerce.order.domain.model.OrderStatus;
import com.ecommerce.order.domain.model.PurchaseOrder;
import com.ecommerce.order.domain.repository.OrderRepository;
import com.ecommerce.order.infrastructure.client.CartClient;
import com.ecommerce.order.infrastructure.client.CustomerClient;
import com.ecommerce.order.infrastructure.client.ProductClient;
import com.ecommerce.order.shared.exception.BadRequestException;
import com.ecommerce.order.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class OrderService {
    private final OrderRepository orderRepository;
    private final CustomerClient customerClient;
    private final ProductClient productClient;
    private final CartClient cartClient;

    public OrderResponse placeOrder(PlaceOrderRequest request) {
        customerClient.getCustomer(request.customerId());
        PurchaseOrder order = PurchaseOrder.builder()
                .customerId(request.customerId())
                .orderStatus(OrderStatus.PLACED)
                .totalAmount(BigDecimal.ZERO)
                .build();

        List<OrderItem> items = request.items().stream()
                .map(item -> {
                    var product = productClient.getProduct(item.productId());
                    if (product.stockQuantity() < item.quantity()) {
                        throw new BadRequestException("Insufficient stock for product " + item.productId());
                    }
                    return OrderItem.builder()
                            .order(order)
                            .productId(item.productId())
                            .quantity(item.quantity())
                            .price(product.price())
                            .build();
                })
                .toList();

        BigDecimal total = items.stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        order.setTotalAmount(total);
        order.getItems().addAll(items);

        PurchaseOrder saved = orderRepository.save(order);
        try {
            cartClient.clearCart(request.customerId());
        } catch (Exception ex) {
            log.warn("Unable to clear cart for customer {} after order {}", request.customerId(), saved.getId());
        }
        return toResponse(saved);
    }

    public OrderResponse cancelOrder(Long id) {
        PurchaseOrder order = findOrder(id);
        order.setOrderStatus(OrderStatus.CANCELLED);
        return toResponse(orderRepository.save(order));
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrder(Long id) {
        return toResponse(findOrder(id));
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getOrdersByCustomer(Long customerId) {
        return orderRepository.findByCustomerId(customerId).stream()
                .map(this::toResponse)
                .toList();
    }

    private PurchaseOrder findOrder(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id " + id));
    }

    private OrderResponse toResponse(PurchaseOrder order) {
        return new OrderResponse(order.getId(), order.getCustomerId(), order.getTotalAmount(), order.getOrderStatus(),
                order.getCreatedAt(), order.getItems().stream()
                .map(item -> new OrderItemResponse(item.getId(), item.getProductId(), item.getQuantity(), item.getPrice()))
                .toList());
    }
}
