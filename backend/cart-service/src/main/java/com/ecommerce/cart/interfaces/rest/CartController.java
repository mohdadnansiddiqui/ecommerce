package com.ecommerce.cart.interfaces.rest;

import com.ecommerce.cart.application.dto.AddCartItemRequest;
import com.ecommerce.cart.application.dto.CartResponse;
import com.ecommerce.cart.application.dto.UpdateCartItemRequest;
import com.ecommerce.cart.application.service.CartService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/carts")
@RequiredArgsConstructor
@Tag(name = "Carts")
public class CartController {
    private final CartService cartService;

    @PostMapping("/items")
    @PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    public ResponseEntity<CartResponse> addItem(@Valid @RequestBody AddCartItemRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cartService.addItem(request));
    }

    @PutMapping("/{customerId}/items/{itemId}")
    @PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    public CartResponse updateQuantity(@PathVariable Long customerId, @PathVariable Long itemId,
                                       @Valid @RequestBody UpdateCartItemRequest request) {
        return cartService.updateQuantity(customerId, itemId, request);
    }

    @DeleteMapping("/{customerId}/items/{itemId}")
    @PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    public CartResponse removeItem(@PathVariable Long customerId, @PathVariable Long itemId) {
        return cartService.removeItem(customerId, itemId);
    }

    @GetMapping("/{customerId}")
    @PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    public CartResponse viewCart(@PathVariable Long customerId) {
        return cartService.viewCart(customerId);
    }

    @DeleteMapping("/{customerId}")
    @PreAuthorize("hasAnyRole('CUSTOMER','ADMIN')")
    public ResponseEntity<Void> clearCart(@PathVariable Long customerId) {
        cartService.clearCart(customerId);
        return ResponseEntity.noContent().build();
    }
}
