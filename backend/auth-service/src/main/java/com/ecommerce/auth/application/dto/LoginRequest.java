package com.ecommerce.auth.application.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(@NotBlank String usernameOrEmail, @NotBlank String password) {
}
