package com.ecommerce.order.infrastructure.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.Instant;

@FeignClient(name = "customer-service", url = "${services.customer.url}")
public interface CustomerClient {
    @GetMapping("/api/v1/customers/{id}")
    CustomerResponse getCustomer(@PathVariable Long id);

    record CustomerResponse(Long id, String firstName, String lastName, String email,
                            String phoneNumber, String address, Instant createdAt) {
    }
}
