package com.ecommerce.order.domain.repository;

import com.ecommerce.order.domain.model.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<PurchaseOrder, Long> {
    List<PurchaseOrder> findByCustomerId(Long customerId);
}
