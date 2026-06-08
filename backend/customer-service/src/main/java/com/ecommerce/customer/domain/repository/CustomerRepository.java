package com.ecommerce.customer.domain.repository;

import com.ecommerce.customer.domain.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    boolean existsByEmail(String email);
}
