package com.ecommerce.product.infrastructure.security;

import com.ecommerce.product.application.service.JwtService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.Instant;
import java.util.Date;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
class ProductSecurityTest {

    @Autowired
    JwtService jwtService;

    @Test
    void jwtWithRoleClaimIsAccepted() {
        var key = Keys.hmacShaKeyFor(Decoders.BASE64.decode("ZWNvbW1lcmNlLW1pY3Jvc2VydmljZXMtamF2YS0yMS1zcHJpbmctYm9vdC0zLWp3dC1zaGFyZWQtc2VjcmV0LWtleS0yMDI2"));
        String token = Jwts.builder()
                .subject("admin")
                .claim("roles", List.of("ADMIN"))
                .issuedAt(Date.from(Instant.now()))
                .expiration(Date.from(Instant.now().plusSeconds(300)))
                .signWith(key)
                .compact();

        assertThat(jwtService.isTokenValid(token)).isTrue();
        assertThat(jwtService.authorities(token)).extracting("authority").contains("ROLE_ADMIN");
    }
}
