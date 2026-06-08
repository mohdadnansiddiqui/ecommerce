package com.ecommerce.auth.application.service;

import com.ecommerce.auth.application.dto.RoleUpdateRequest;
import com.ecommerce.auth.application.dto.UserResponse;
import com.ecommerce.auth.application.mapper.UserMapper;
import com.ecommerce.auth.domain.repository.RoleRepository;
import com.ecommerce.auth.domain.repository.UserRepository;
import com.ecommerce.auth.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class RoleService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;

    public UserResponse assignRole(Long userId, RoleUpdateRequest request) {
        var user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));
        var role = roleRepository.findByRoleName(request.roleName())
                .orElseThrow(() -> new ResourceNotFoundException("Role not found: " + request.roleName()));
        user.getRoles().add(role);
        return userMapper.toResponse(userRepository.save(user));
    }

    @Transactional(readOnly = true)
    public List<UserResponse> getUsers() {
        return userRepository.findAll().stream().map(userMapper::toResponse).toList();
    }
}
