package com.ecommerce.inventory.application.service;

import com.ecommerce.inventory.config.JwtProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Collection;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JwtService {

    private final JwtProperties properties;

    public Claims parseToken(String token) {
        return Jwts.parser()
                .verifyWith(signingKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean isTokenValid(String token) {
        try {
            parseToken(token);
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            return false;
        }
    }

    public String username(String token) {
        return parseToken(token).getSubject();
    }

    public Collection<? extends GrantedAuthority> authorities(String token) {
        Object rolesClaim = parseToken(token).get("roles");
        if (rolesClaim instanceof Collection<?> roles) {
            return roles.stream()
                    .map(Object::toString)
                    .map(role -> role.startsWith("ROLE_") ? role : "ROLE_" + role)
                    .map(SimpleGrantedAuthority::new)
                    .toList();
        }
        return List.of();
    }

    private SecretKey signingKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(properties.secret()));
    }
}
