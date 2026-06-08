package com.ecommerce.review.application.service;

import com.ecommerce.review.application.dto.ReviewRequest;
import com.ecommerce.review.application.dto.ReviewResponse;
import com.ecommerce.review.application.mapper.ReviewMapper;
import com.ecommerce.review.domain.model.Review;
import com.ecommerce.review.domain.repository.ReviewRepository;
import com.ecommerce.review.infrastructure.client.CustomerClient;
import com.ecommerce.review.infrastructure.client.ProductClient;
import com.ecommerce.review.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;
    private final CustomerClient customerClient;
    private final ProductClient productClient;

    public ReviewResponse create(ReviewRequest request) {
        customerClient.getCustomer(request.customerId());
        productClient.getProduct(request.productId());
        return reviewMapper.toResponse(reviewRepository.save(reviewMapper.toEntity(request)));
    }

    public ReviewResponse update(Long id, ReviewRequest request) {
        Review review = findReview(id);
        customerClient.getCustomer(request.customerId());
        productClient.getProduct(request.productId());
        reviewMapper.updateEntity(request, review);
        return reviewMapper.toResponse(reviewRepository.save(review));
    }

    public void delete(Long id) {
        reviewRepository.delete(findReview(id));
    }

    @Transactional(readOnly = true)
    public List<ReviewResponse> getReviewsByProduct(Long productId) {
        return reviewRepository.findByProductIdOrderByCreatedAtDesc(productId).stream()
                .map(reviewMapper::toResponse)
                .toList();
    }

    private Review findReview(Long id) {
        return reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with id " + id));
    }
}
