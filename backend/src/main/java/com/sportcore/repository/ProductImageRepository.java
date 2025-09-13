package com.sportcore.repository;

import com.sportcore.entity.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {

    // Find images by product
    List<ProductImage> findByProductId(Long productId);

    // Find primary image by product
    Optional<ProductImage> findByProductIdAndIsPrimaryTrue(Long productId);

    // Find all primary images
    List<ProductImage> findByIsPrimaryTrue();

    // Count images by product
    long countByProductId(Long productId);

    // Delete images by product
    void deleteByProductId(Long productId);
}
