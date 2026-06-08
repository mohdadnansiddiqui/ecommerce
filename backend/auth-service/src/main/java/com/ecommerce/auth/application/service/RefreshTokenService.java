package com.ecommerce.auth.application.service;

import com.ecommerce.auth.config.JwtProperties;
import com.ecommerce.auth.domain.model.RefreshToken;
import com.ecommerce.auth.domain.model.User;
import com.ecommerce.auth.domain.repository.RefreshTokenRepository;
import com.ecommerce.auth.shared.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtProperties jwtProperties;

    public RefreshToken create(User user) {
        refreshTokenRepository.deleteByUser(user);
        RefreshToken token = RefreshToken.builder()
                .user(user)
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusSeconds(jwtProperties.refreshTokenDays() * 24 * 60 * 60))
                .build();
        return refreshTokenRepository.save(token);
    }

    @Transactional(readOnly = true)
    public RefreshToken verify(String token) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new BadRequestException("Invalid refresh token"));
        if (refreshToken.getExpiryDate().isBefore(Instant.now())) {
            throw new BadRequestException("Refresh token has expired");
        }
        return refreshToken;
    }
}
