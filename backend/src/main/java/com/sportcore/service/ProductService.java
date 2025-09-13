package com.sportcore.service;

import com.sportcore.dto.ProductDto;
import com.sportcore.entity.Category;
import com.sportcore.entity.Product;
import com.sportcore.entity.ProductImage;
import com.sportcore.exception.ResourceNotFoundException;
import com.sportcore.exception.DuplicateResourceException;
import com.sportcore.repository.CategoryRepository;
import com.sportcore.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    // Create a new product
    public ProductDto createProduct(ProductDto productDto) {
        // Check if product name already exists
        if (productRepository.existsByName(productDto.getName())) {
            throw new DuplicateResourceException("Product with name '" + productDto.getName() + "' already exists");
        }

        // Find category
        Category category = categoryRepository.findById(productDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + productDto.getCategoryId()));

        // Create product entity
        Product product = new Product();
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setStock(productDto.getStock());
        product.setCategory(category);
        product.setBrand(productDto.getBrand());
        product.setFlavor(productDto.getFlavor());

        // Save product
        Product savedProduct = productRepository.save(product);

        // Convert to DTO and return
        return convertToDto(savedProduct);
    }

    // Get all products with pagination
    @Transactional(readOnly = true)
    public Page<ProductDto> getAllProducts(Pageable pageable) {
        Page<Product> products = productRepository.findAll(pageable);
        return products.map(this::convertToDto);
    }

    // Get all products
    @Transactional(readOnly = true)
    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Get product by ID
    @Transactional(readOnly = true)
    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return convertToDto(product);
    }

    // Get random products (for home page)
    @Transactional(readOnly = true)
    public List<ProductDto> getRandomProducts(int limit) {
        List<Product> products = productRepository.findRandomProducts(limit);
        return products.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Get products by category
    @Transactional(readOnly = true)
    public List<ProductDto> getProductsByCategory(Long categoryId) {
        List<Product> products = productRepository.findByCategoryId(categoryId);
        return products.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Update product
    public ProductDto updateProduct(Long id, ProductDto productDto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        // Check if product name already exists (excluding current product)
        if (productRepository.existsByNameAndIdNot(productDto.getName(), id)) {
            throw new DuplicateResourceException("Product with name '" + productDto.getName() + "' already exists");
        }

        // Find category
        Category category = categoryRepository.findById(productDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + productDto.getCategoryId()));

        // Update product
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setStock(productDto.getStock());
        product.setCategory(category);
        product.setBrand(productDto.getBrand());
        product.setFlavor(productDto.getFlavor());

        Product updatedProduct = productRepository.save(product);
        return convertToDto(updatedProduct);
    }

    // Delete product
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }

    // Search products by name
    @Transactional(readOnly = true)
    public List<ProductDto> searchProductsByName(String name) {
        List<Product> products = productRepository.findByNameContainingIgnoreCase(name);
        return products.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Convert Entity to DTO
    private ProductDto convertToDto(Product product) {
        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setStock(product.getStock());
        dto.setCategoryId(product.getCategory().getId());
        dto.setBrand(product.getBrand());
        dto.setFlavor(product.getFlavor());
        return dto;
    }
}
