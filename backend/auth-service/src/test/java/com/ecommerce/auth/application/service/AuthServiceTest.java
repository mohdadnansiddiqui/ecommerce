package com.ecommerce.auth.application.service;

import com.ecommerce.auth.application.mapper.UserMapper;
import com.ecommerce.auth.domain.model.RoleName;
import com.ecommerce.auth.domain.repository.RoleRepository;
import com.ecommerce.auth.domain.repository.UserRepository;
import com.ecommerce.auth.shared.exception.BadRequestException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static com.ecommerce.auth.support.AuthTestData.customerRole;
import static com.ecommerce.auth.support.AuthTestData.registerRequest;
import static com.ecommerce.auth.support.AuthTestData.user;
import static com.ecommerce.auth.support.AuthTestData.userResponse;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {
    @Mock
    UserRepository userRepository;
    @Mock
    RoleRepository roleRepository;
    @Mock
    PasswordEncoder passwordEncoder;
    @Mock
    AuthenticationManager authenticationManager;
    @Mock
    JwtService jwtService;
    @Mock
    RefreshTokenService refreshTokenService;
    @Mock
    UserMapper userMapper;
    @Mock
    com.ecommerce.auth.config.JwtProperties jwtProperties;
    @InjectMocks
    AuthService authService;

    @Test
    void registerCreatesCustomerUser() {
        when(userRepository.existsByUsername("customer1")).thenReturn(false);
        when(userRepository.existsByEmail("customer@example.com")).thenReturn(false);
        when(roleRepository.findByRoleName(RoleName.CUSTOMER)).thenReturn(Optional.of(customerRole()));
        when(passwordEncoder.encode("Password123")).thenReturn("encoded");
        when(userRepository.save(any())).thenReturn(user());
        when(userMapper.toResponse(any())).thenReturn(userResponse());

        var response = authService.register(registerRequest());

        assertThat(response.roles()).contains("CUSTOMER");
        verify(userRepository).save(any());
    }

    @Test
    void registerRejectsDuplicateUsername() {
        when(userRepository.existsByUsername("customer1")).thenReturn(true);

        assertThatThrownBy(() -> authService.register(registerRequest()))
                .isInstanceOf(BadRequestException.class);
    }
}
