package com.ecommerce.auth.application.mapper;

import com.ecommerce.auth.application.dto.UserResponse;
import com.ecommerce.auth.domain.model.Role;
import com.ecommerce.auth.domain.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Set;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "roles", expression = "java(mapRoles(user))")
    UserResponse toResponse(User user);

    default Set<String> mapRoles(User user) {
        return user.getRoles().stream()
                .map(Role::getRoleName)
                .map(Enum::name)
                .collect(Collectors.toSet());
    }
}
