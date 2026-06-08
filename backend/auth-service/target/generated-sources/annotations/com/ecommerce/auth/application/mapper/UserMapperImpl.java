package com.ecommerce.auth.application.mapper;

import com.ecommerce.auth.application.dto.UserResponse;
import com.ecommerce.auth.domain.model.User;
import java.time.Instant;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-07T22:23:33+0530",
    comments = "version: 1.6.3, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserResponse toResponse(User user) {
        if ( user == null ) {
            return null;
        }

        Long id = null;
        String username = null;
        String email = null;
        boolean enabled = false;
        Instant createdAt = null;

        id = user.getId();
        username = user.getUsername();
        email = user.getEmail();
        enabled = user.isEnabled();
        createdAt = user.getCreatedAt();

        Set<String> roles = mapRoles(user);

        UserResponse userResponse = new UserResponse( id, username, email, enabled, createdAt, roles );

        return userResponse;
    }
}
