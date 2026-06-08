package com.ecommerce.product.interfaces.rest;

import com.ecommerce.product.application.service.ProductService;
import com.ecommerce.product.application.service.JwtService;
import com.ecommerce.product.shared.exception.ResourceNotFoundException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static com.ecommerce.product.support.ProductTestData.response;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ProductController.class)
@AutoConfigureMockMvc(addFilters = false)
class ProductControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    ProductService productService;

    @MockBean
    JwtService jwtService;

    @Test
    void getProductReturnsProduct() throws Exception {
        when(productService.getById(1L)).thenReturn(response());

        mockMvc.perform(get("/api/v1/products/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Mechanical Keyboard"));
    }

    @Test
    void getProductReturnsNotFound() throws Exception {
        when(productService.getById(99L)).thenThrow(new ResourceNotFoundException("Product not found"));

        mockMvc.perform(get("/api/v1/products/{id}", 99L))
                .andExpect(status().isNotFound());
    }

    @Test
    void createProductRejectsInvalidPayload() throws Exception {
        mockMvc.perform(post("/api/v1/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void getAllReturnsProducts() throws Exception {
        when(productService.getAll()).thenReturn(List.of(response()));

        mockMvc.perform(get("/api/v1/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1));
    }

    @Test
    void createProductReturnsCreated() throws Exception {
        when(productService.create(any())).thenReturn(response());

        mockMvc.perform(post("/api/v1/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                  "name": "Mechanical Keyboard",
                                  "description": "Hot swappable keyboard",
                                  "category": "Accessories",
                                  "price": 129.99,
                                  "stockQuantity": 25,
                                  "imageUrl": "https://example.com/keyboard.png"
                                }
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1));
    }
}
