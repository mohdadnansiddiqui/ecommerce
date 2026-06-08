package com.ecommerce.auth.domain.repository;

import com.ecommerce.auth.domain.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
class UserRepositoryIntegrationTest {
    @Autowired
    UserRepository userRepository;

    @Test
    void findsByUsernameAndEmail() {
        userRepository.save(User.builder()
                .username("customer1")
                .email("customer@example.com")
                .password("encoded")
                .enabled(true)
                .build());

        assertThat(userRepository.findByUsername("customer1")).isPresent();
        assertThat(userRepository.findByEmail("customer@example.com")).isPresent();
    }
}
