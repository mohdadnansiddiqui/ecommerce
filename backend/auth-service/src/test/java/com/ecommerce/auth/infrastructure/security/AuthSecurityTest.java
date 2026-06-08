package com.ecommerce.auth.infrastructure.security;

import com.ecommerce.auth.application.service.JwtService;
import com.ecommerce.auth.domain.model.Role;
import com.ecommerce.auth.domain.model.RoleName;
import com.ecommerce.auth.domain.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
class AuthSecurityTest {
    @Autowired
    JwtService jwtService;

    @Test
    void generatedJwtContainsRoleClaims() {
        var user = User.builder().id(1L).username("admin").email("admin@example.com").enabled(true).build();
        user.getRoles().add(Role.builder().id(1L).roleName(RoleName.ADMIN).build());

        String token = jwtService.generateToken(user);

        assertThat(jwtService.isTokenValid(token)).isTrue();
        assertThat(jwtService.authorities(token)).extracting("authority").contains("ROLE_ADMIN");
    }
}
