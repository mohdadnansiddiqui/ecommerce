package com.ecommerce.auth.application.service;

import com.ecommerce.auth.application.dto.AuthResponse;
import com.ecommerce.auth.application.dto.ChangePasswordRequest;
import com.ecommerce.auth.application.dto.LoginRequest;
import com.ecommerce.auth.application.dto.RefreshTokenRequest;
import com.ecommerce.auth.application.dto.RegisterRequest;
import com.ecommerce.auth.application.dto.UserResponse;
import com.ecommerce.auth.application.mapper.UserMapper;
import com.ecommerce.auth.config.JwtProperties;
import com.ecommerce.auth.domain.model.RoleName;
import com.ecommerce.auth.domain.model.User;
import com.ecommerce.auth.domain.repository.RoleRepository;
import com.ecommerce.auth.domain.repository.UserRepository;
import com.ecommerce.auth.shared.exception.BadRequestException;
import com.ecommerce.auth.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AuthService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final UserMapper userMapper;
    private final JwtProperties jwtProperties;

    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.username())) {
            throw new BadRequestException("Username already exists");
        }
        if (userRepository.existsByEmail(request.email())) {
            throw new BadRequestException("Email already exists");
        }
        var customerRole = roleRepository.findByRoleName(RoleName.ADMIN)
                .orElseThrow(() -> new ResourceNotFoundException("CUSTOMER role is not configured"));
        User user = User.builder()
                .username(request.username())
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .enabled(true)
                .build();
        user.getRoles().add(customerRole);
        User saved = userRepository.save(user);
        log.info("Registered user {}", saved.getUsername());
        return userMapper.toResponse(saved);
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.usernameOrEmail(), request.password()));
        User user = userRepository.findByUsername(request.usernameOrEmail())
                .or(() -> userRepository.findByEmail(request.usernameOrEmail()))
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return tokensFor(user);
    }

    public AuthResponse refresh(RefreshTokenRequest request) {
        var refreshToken = refreshTokenService.verify(request.refreshToken());
        return new AuthResponse(jwtService.generateToken(refreshToken.getUser()), refreshToken.getToken(), "Bearer",
                jwtProperties.accessTokenMinutes() * 60, userMapper.toResponse(refreshToken.getUser()));
    }

    public void changePassword(ChangePasswordRequest request) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (!passwordEncoder.matches(request.currentPassword(), user.getPassword())) {
            throw new BadRequestException("Current password is incorrect");
        }
        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);
    }

    private AuthResponse tokensFor(User user) {
        String accessToken = jwtService.generateToken(user);
        String refreshToken = refreshTokenService.create(user).getToken();
        return new AuthResponse(accessToken, refreshToken, "Bearer", jwtProperties.accessTokenMinutes() * 60,
                userMapper.toResponse(user));
    }
}
