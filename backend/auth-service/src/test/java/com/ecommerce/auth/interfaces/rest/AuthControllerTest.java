package com.ecommerce.auth.interfaces.rest;

import com.ecommerce.auth.application.service.AuthService;
import com.ecommerce.auth.application.service.CustomUserDetailsService;
import com.ecommerce.auth.application.service.JwtService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static com.ecommerce.auth.support.AuthTestData.userResponse;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
class AuthControllerTest {
    @Autowired
    MockMvc mockMvc;
    @MockBean
    AuthService authService;

    @MockBean
    JwtService jwtService;

    @MockBean
    CustomUserDetailsService customUserDetailsService;

    @Test
    void registerReturnsCreatedUser() throws Exception {
        when(authService.register(any())).thenReturn(userResponse());

        mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username":"customer1","email":"customer@example.com","password":"Password123"}
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.username").value("customer1"));
    }

    @Test
    void registerRejectsInvalidEmail() throws Exception {
        mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"username":"cu","email":"bad","password":"short"}
                                """))
                .andExpect(status().isBadRequest());
    }
}
