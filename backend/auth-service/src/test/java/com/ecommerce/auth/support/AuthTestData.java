package com.ecommerce.auth.support;

import com.ecommerce.auth.application.dto.RegisterRequest;
import com.ecommerce.auth.application.dto.UserResponse;
import com.ecommerce.auth.domain.model.Role;
import com.ecommerce.auth.domain.model.RoleName;
import com.ecommerce.auth.domain.model.User;

import java.time.Instant;
import java.util.Set;

public final class AuthTestData {
    private AuthTestData() {
    }

    public static RegisterRequest registerRequest() {
        return new RegisterRequest("customer1", "customer@example.com", "Password123");
    }

    public static Role customerRole() {
        return Role.builder().id(2L).roleName(RoleName.CUSTOMER).build();
    }

    public static User user() {
        var user = User.builder()
                .id(1L)
                .username("customer1")
                .email("customer@example.com")
                .password("encoded")
                .enabled(true)
                .createdAt(Instant.parse("2026-01-01T00:00:00Z"))
                .build();
        user.getRoles().add(customerRole());
        return user;
    }

    public static UserResponse userResponse() {
        return new UserResponse(1L, "customer1", "customer@example.com", true,
                Instant.parse("2026-01-01T00:00:00Z"), Set.of("CUSTOMER"));
    }
}
