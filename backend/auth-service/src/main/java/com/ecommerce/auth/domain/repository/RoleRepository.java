package com.ecommerce.auth.domain.repository;

import com.ecommerce.auth.domain.model.Role;
import com.ecommerce.auth.domain.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRoleName(RoleName roleName);
}
