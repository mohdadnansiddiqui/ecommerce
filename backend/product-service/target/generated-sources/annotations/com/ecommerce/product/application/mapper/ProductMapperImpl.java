package com.ecommerce.product.application.mapper;

import com.ecommerce.product.application.dto.ProductRequest;
import com.ecommerce.product.application.dto.ProductResponse;
import com.ecommerce.product.domain.model.Product;
import java.math.BigDecimal;
import java.time.Instant;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-07T22:40:17+0530",
    comments = "version: 1.6.3, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
@Component
public class ProductMapperImpl implements ProductMapper {

    @Override
    public Product toEntity(ProductRequest request) {
        if ( request == null ) {
            return null;
        }

        Product.ProductBuilder product = Product.builder();

        product.name( request.name() );
        product.description( request.description() );
        product.category( request.category() );
        product.price( request.price() );
        product.stockQuantity( request.stockQuantity() );
        product.imageUrl( request.imageUrl() );

        return product.build();
    }

    @Override
    public ProductResponse toResponse(Product product) {
        if ( product == null ) {
            return null;
        }

        Long id = null;
        String name = null;
        String description = null;
        String category = null;
        BigDecimal price = null;
        Integer stockQuantity = null;
        String imageUrl = null;
        Instant createdAt = null;

        id = product.getId();
        name = product.getName();
        description = product.getDescription();
        category = product.getCategory();
        price = product.getPrice();
        stockQuantity = product.getStockQuantity();
        imageUrl = product.getImageUrl();
        createdAt = product.getCreatedAt();

        ProductResponse productResponse = new ProductResponse( id, name, description, category, price, stockQuantity, imageUrl, createdAt );

        return productResponse;
    }

    @Override
    public void updateEntity(ProductRequest request, Product product) {
        if ( request == null ) {
            return;
        }

        if ( request.name() != null ) {
            product.setName( request.name() );
        }
        if ( request.description() != null ) {
            product.setDescription( request.description() );
        }
        if ( request.category() != null ) {
            product.setCategory( request.category() );
        }
        if ( request.price() != null ) {
            product.setPrice( request.price() );
        }
        if ( request.stockQuantity() != null ) {
            product.setStockQuantity( request.stockQuantity() );
        }
        if ( request.imageUrl() != null ) {
            product.setImageUrl( request.imageUrl() );
        }
    }
}
