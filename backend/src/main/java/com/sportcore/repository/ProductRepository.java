package com.sportcore.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sportcore.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Find products by category
    List<Product> findByCategoryId(Long categoryId);

    // Find products by category with pagination
    Page<Product> findByCategoryId(Long categoryId, Pageable pageable);

    // Find products by name (case insensitive)
    List<Product> findByNameContainingIgnoreCase(String name);

    // Find products by brand
    List<Product> findByBrandContainingIgnoreCase(String brand);

    // Find products with stock greater than 0
    List<Product> findByStockGreaterThan(Integer stock);

    // Find random products (for home page)
    @Query(value = "SELECT * FROM products ORDER BY RAND() LIMIT :limit", nativeQuery = true)
    List<Product> findRandomProducts(@Param("limit") int limit);

    // Find products by price range
    List<Product> findByPriceBetween(Double minPrice, Double maxPrice);

    // Check if product name exists (for validation)
    boolean existsByName(String name);

    // Check if product name exists excluding current product (for updates)
    boolean existsByNameAndIdNot(String name, Long id);

    // Find products with images
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.images WHERE p.id = :id")
    Optional<Product> findByIdWithImages(@Param("id") Long id);

    // Find all products with images
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.images")
    List<Product> findAllWithImages();
}
