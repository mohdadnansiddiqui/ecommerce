package com.ecommerce.order.interfaces.rest;

import com.ecommerce.order.application.service.JwtService;
import com.ecommerce.order.application.service.OrderService;
import com.ecommerce.order.shared.exception.ResourceNotFoundException;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static com.ecommerce.order.support.OrderTestData.response;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(OrderController.class)
@AutoConfigureMockMvc(addFilters = false)
class OrderControllerTest {
    @Autowired
    MockMvc mockMvc;
    @MockBean
    OrderService orderService;

    @MockBean
    JwtService jwtService;

    @Test
    void placeOrderReturnsCreated() throws Exception {
        when(orderService.placeOrder(any())).thenReturn(response());

        mockMvc.perform(post("/api/v1/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"customerId":10,"items":[{"productId":99,"quantity":2}]}
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.totalAmount").value(50.00));
    }

    @Test
    void placeOrderRejectsInvalidPayload() throws Exception {
        mockMvc.perform(post("/api/v1/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void getOrderReturnsNotFound() throws Exception {
        when(orderService.getOrder(404L)).thenThrow(new ResourceNotFoundException("Order not found"));

        mockMvc.perform(get("/api/v1/orders/{id}", 404L))
                .andExpect(status().isNotFound());
    }
}
