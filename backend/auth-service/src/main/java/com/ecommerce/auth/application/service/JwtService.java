package com.ecommerce.auth.application.service;

import com.ecommerce.auth.config.JwtProperties;
import com.ecommerce.auth.domain.model.Role;
import com.ecommerce.auth.domain.model.User;
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
import java.time.Instant;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JwtService {
    private final JwtProperties properties;

    public String generateToken(User user) {
        Instant now = Instant.now();
        return Jwts.builder()
                .subject(user.getUsername())
                .claim("userId", user.getId())
                .claim("roles", user.getRoles().stream().map(Role::getRoleName).map(Enum::name).toList())
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plusSeconds(properties.accessTokenMinutes() * 60)))
                .signWith(signingKey())
                .compact();
    }

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
