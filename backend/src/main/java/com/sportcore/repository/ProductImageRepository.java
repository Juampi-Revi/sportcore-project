package com.sportcore.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sportcore.entity.ProductImage;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {

    List<ProductImage> findByProductId(Long productId);

    Optional<ProductImage> findByProductIdAndIsPrimaryTrue(Long productId);

    List<ProductImage> findByIsPrimaryTrue();

    long countByProductId(Long productId);

    void deleteByProductId(Long productId);
}
