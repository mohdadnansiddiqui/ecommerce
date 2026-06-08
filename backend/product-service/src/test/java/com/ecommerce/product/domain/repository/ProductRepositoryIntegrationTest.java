package com.ecommerce.product.domain.repository;

import com.ecommerce.product.domain.model.Product;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
class ProductRepositoryIntegrationTest {

    @Autowired
    ProductRepository productRepository;

    @Test
    void searchFindsProductsAcrossNameDescriptionAndCategory() {
        productRepository.save(Product.builder()
                .name("Noise Cancelling Headphones")
                .description("Wireless audio")
                .category("Electronics")
                .price(new BigDecimal("249.00"))
                .stockQuantity(10)
                .build());

        var results = productRepository
                .findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrCategoryContainingIgnoreCase("noise", "noise", "noise");

        assertThat(results).hasSize(1);
    }
}
