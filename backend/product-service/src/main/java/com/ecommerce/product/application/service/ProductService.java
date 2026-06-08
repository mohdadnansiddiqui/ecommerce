package com.ecommerce.product.application.service;

import com.ecommerce.product.application.dto.ProductRequest;
import com.ecommerce.product.application.dto.ProductResponse;
import com.ecommerce.product.application.mapper.ProductMapper;
import com.ecommerce.product.domain.model.Product;
import com.ecommerce.product.domain.repository.ProductRepository;
import com.ecommerce.product.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public ProductResponse create(ProductRequest request) {
        Product product = productMapper.toEntity(request);
        Product saved = productRepository.save(product);
        log.info("Created product {}", saved.getId());
        return productMapper.toResponse(saved);
    }

    @Transactional(readOnly = true)
    public ProductResponse getById(Long id) {
        return productMapper.toResponse(findProduct(id));
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> getAll() {
        return productRepository.findAll().stream()
                .map(productMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> search(String query) {
        if (!StringUtils.hasText(query)) {
            return getAll();
        }
        return productRepository
                .findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCaseOrCategoryContainingIgnoreCase(query, query, query)
                .stream()
                .map(productMapper::toResponse)
                .toList();
    }

    public ProductResponse update(Long id, ProductRequest request) {
        Product product = findProduct(id);
        productMapper.updateEntity(request, product);
        return productMapper.toResponse(productRepository.save(product));
    }

    public void delete(Long id) {
        Product product = findProduct(id);
        productRepository.delete(product);
        log.info("Deleted product {}", id);
    }

    private Product findProduct(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id " + id));
    }
}
