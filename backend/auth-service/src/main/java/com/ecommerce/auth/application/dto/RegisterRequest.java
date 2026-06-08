package com.ecommerce.auth.application.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank @Size(min = 3, max = 120) String username,
        @NotBlank @Email String email,
        @NotBlank @Size(min = 8, max = 120) String password) {
}
