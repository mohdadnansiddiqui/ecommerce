package com.ecommerce.auth.interfaces.rest;

import com.ecommerce.auth.application.dto.RoleUpdateRequest;
import com.ecommerce.auth.application.dto.UserResponse;
import com.ecommerce.auth.application.service.RoleService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@Tag(name = "Role Management")
public class RoleController {
    private final RoleService roleService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<UserResponse> getUsers() {
        return roleService.getUsers();
    }

    @PostMapping("/{userId}/roles")
    @PreAuthorize("hasRole('ADMIN')")
    public UserResponse assignRole(@PathVariable Long userId, @Valid @RequestBody RoleUpdateRequest request) {
        return roleService.assignRole(userId, request);
    }
}
