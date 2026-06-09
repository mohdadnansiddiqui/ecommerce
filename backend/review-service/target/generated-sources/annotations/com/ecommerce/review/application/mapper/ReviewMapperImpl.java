package com.ecommerce.review.application.mapper;

import com.ecommerce.review.application.dto.ReviewRequest;
import com.ecommerce.review.application.dto.ReviewResponse;
import com.ecommerce.review.domain.model.Review;
import java.time.Instant;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-06-09T00:32:33+0530",
    comments = "version: 1.6.3, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
@Component
public class ReviewMapperImpl implements ReviewMapper {

    @Override
    public Review toEntity(ReviewRequest request) {
        if ( request == null ) {
            return null;
        }

        Review.ReviewBuilder review = Review.builder();

        review.customerId( request.customerId() );
        review.productId( request.productId() );
        review.rating( request.rating() );
        review.reviewText( request.reviewText() );

        return review.build();
    }

    @Override
    public ReviewResponse toResponse(Review review) {
        if ( review == null ) {
            return null;
        }

        Long id = null;
        Long customerId = null;
        Long productId = null;
        Integer rating = null;
        String reviewText = null;
        Instant createdAt = null;

        id = review.getId();
        customerId = review.getCustomerId();
        productId = review.getProductId();
        rating = review.getRating();
        reviewText = review.getReviewText();
        createdAt = review.getCreatedAt();

        ReviewResponse reviewResponse = new ReviewResponse( id, customerId, productId, rating, reviewText, createdAt );

        return reviewResponse;
    }

    @Override
    public void updateEntity(ReviewRequest request, Review review) {
        if ( request == null ) {
            return;
        }

        if ( request.customerId() != null ) {
            review.setCustomerId( request.customerId() );
        }
        if ( request.productId() != null ) {
            review.setProductId( request.productId() );
        }
        if ( request.rating() != null ) {
            review.setRating( request.rating() );
        }
        if ( request.reviewText() != null ) {
            review.setReviewText( request.reviewText() );
        }
    }
}
