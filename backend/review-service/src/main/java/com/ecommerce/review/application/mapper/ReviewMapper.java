package com.ecommerce.review.application.mapper;

import com.ecommerce.review.application.dto.ReviewRequest;
import com.ecommerce.review.application.dto.ReviewResponse;
import com.ecommerce.review.domain.model.Review;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface ReviewMapper {
    Review toEntity(ReviewRequest request);

    ReviewResponse toResponse(Review review);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntity(ReviewRequest request, @MappingTarget Review review);
}
