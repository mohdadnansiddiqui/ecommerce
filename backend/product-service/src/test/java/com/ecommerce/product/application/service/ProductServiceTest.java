package com.ecommerce.product.application.service;

import com.ecommerce.product.application.mapper.ProductMapper;
import com.ecommerce.product.domain.repository.ProductRepository;
import com.ecommerce.product.shared.exception.ResourceNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static com.ecommerce.product.support.ProductTestData.product;
import static com.ecommerce.product.support.ProductTestData.request;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    ProductRepository productRepository;

    @Mock
    ProductMapper productMapper;

    @InjectMocks
    ProductService productService;

    @Test
    void createPersistsProduct() {
        var product = product();
        when(productMapper.toEntity(request())).thenReturn(product);
        when(productRepository.save(product)).thenReturn(product);
        when(productMapper.toResponse(product)).thenReturn(com.ecommerce.product.support.ProductTestData.response());

        var response = productService.create(request());

        assertThat(response.id()).isEqualTo(1L);
        verify(productRepository).save(product);
    }

    @Test
    void getByIdThrowsWhenMissing() {
        when(productRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> productService.getById(99L))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void getAllReturnsMappedProducts() {
        var product = product();
        when(productRepository.findAll()).thenReturn(List.of(product));
        when(productMapper.toResponse(product)).thenReturn(com.ecommerce.product.support.ProductTestData.response());

        assertThat(productService.getAll()).hasSize(1);
    }

    @Test
    void updateChangesExistingProduct() {
        var product = product();
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(productRepository.save(product)).thenReturn(product);
        when(productMapper.toResponse(product)).thenReturn(com.ecommerce.product.support.ProductTestData.response());

        var response = productService.update(1L, request());

        assertThat(response.name()).isEqualTo("Mechanical Keyboard");
        verify(productMapper).updateEntity(request(), product);
    }

    @Test
    void deleteRemovesExistingProduct() {
        var product = product();
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        productService.delete(1L);

        verify(productRepository).delete(product);
    }
}
