package com.ecommerce.order.infrastructure.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "cart-service", url = "${services.cart.url}")
public interface CartClient {
    @DeleteMapping("/api/v1/carts/{customerId}")
    void clearCart(@PathVariable Long customerId);
}
