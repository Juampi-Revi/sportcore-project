package com.sportcore.repository;

import com.sportcore.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    // Find category by name (case insensitive)
    Optional<Category> findByNameIgnoreCase(String name);

    // Find categories by name containing (case insensitive)
    List<Category> findByNameContainingIgnoreCase(String name);

    // Check if category name exists (for validation)
    boolean existsByName(String name);

    // Check if category name exists excluding current category (for updates)
    boolean existsByNameAndIdNot(String name, Long id);

    // Find categories with products count
    @Query("SELECT c FROM Category c LEFT JOIN FETCH c.products")
    List<Category> findAllWithProducts();

    // Find category with products
    @Query("SELECT c FROM Category c LEFT JOIN FETCH c.products WHERE c.id = :id")
    Optional<Category> findByIdWithProducts(@Param("id") Long id);
}
