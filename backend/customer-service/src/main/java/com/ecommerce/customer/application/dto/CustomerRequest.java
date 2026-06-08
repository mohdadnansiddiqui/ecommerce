package com.ecommerce.customer.application.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CustomerRequest(
        @NotBlank @Size(max = 80) String firstName,
        @NotBlank @Size(max = 80) String lastName,
        @NotBlank @Email String email,
        @NotBlank @Size(max = 20) String phoneNumber,
        @Size(max = 1000) String address) {
}
