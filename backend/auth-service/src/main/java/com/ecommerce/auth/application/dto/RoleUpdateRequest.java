package com.ecommerce.auth.application.dto;

import com.ecommerce.auth.domain.model.RoleName;
import jakarta.validation.constraints.NotNull;

public record RoleUpdateRequest(@NotNull RoleName roleName) {
}
