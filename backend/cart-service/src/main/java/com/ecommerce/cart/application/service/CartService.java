package com.ecommerce.cart.application.service;

import com.ecommerce.cart.application.dto.AddCartItemRequest;
import com.ecommerce.cart.application.dto.CartItemResponse;
import com.ecommerce.cart.application.dto.CartResponse;
import com.ecommerce.cart.application.dto.UpdateCartItemRequest;
import com.ecommerce.cart.domain.model.Cart;
import com.ecommerce.cart.domain.model.CartItem;
import com.ecommerce.cart.domain.repository.CartRepository;
import com.ecommerce.cart.infrastructure.client.ProductClient;
import com.ecommerce.cart.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class CartService {
    private final CartRepository cartRepository;
    private final ProductClient productClient;

    public CartResponse addItem(AddCartItemRequest request) {
        productClient.getProduct(request.productId());
        Cart cart = cartRepository.findByCustomerId(request.customerId())
                .orElseGet(() -> cartRepository.save(Cart.builder().customerId(request.customerId()).build()));
        cart.getItems().stream()
                .filter(item -> item.getProductId().equals(request.productId()))
                .findFirst()
                .ifPresentOrElse(
                        item -> item.setQuantity(item.getQuantity() + request.quantity()),
                        () -> cart.getItems().add(CartItem.builder()
                                .cart(cart)
                                .productId(request.productId())
                                .quantity(request.quantity())
                                .build()));
        return toResponse(cartRepository.save(cart));
    }

    public CartResponse updateQuantity(Long customerId, Long itemId, UpdateCartItemRequest request) {
        Cart cart = findCart(customerId);
        CartItem item = findItem(cart, itemId);
        item.setQuantity(request.quantity());
        return toResponse(cartRepository.save(cart));
    }

    public CartResponse removeItem(Long customerId, Long itemId) {
        Cart cart = findCart(customerId);
        CartItem item = findItem(cart, itemId);
        cart.getItems().remove(item);
        return toResponse(cartRepository.save(cart));
    }

    @Transactional(readOnly = true)
    public CartResponse viewCart(Long customerId) {
        return toResponse(findCart(customerId));
    }

    public void clearCart(Long customerId) {
        Cart cart = findCart(customerId);
        cart.getItems().clear();
        cartRepository.save(cart);
        log.info("Cleared cart for customer {}", customerId);
    }

    private Cart findCart(Long customerId) {
        return cartRepository.findByCustomerId(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart not found for customer " + customerId));
    }

    private CartItem findItem(Cart cart, Long itemId) {
        return cart.getItems().stream()
                .filter(item -> item.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found with id " + itemId));
    }

    private CartResponse toResponse(Cart cart) {
        return new CartResponse(cart.getId(), cart.getCustomerId(),
                cart.getItems().stream()
                        .map(item -> new CartItemResponse(item.getId(), item.getProductId(), item.getQuantity()))
                        .toList());
    }
}
