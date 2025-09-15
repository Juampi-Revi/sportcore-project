package com.sportcore.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sportcore.dto.ProductDto;
import com.sportcore.entity.Category;
import com.sportcore.entity.Product;
import com.sportcore.exception.DuplicateResourceException;
import com.sportcore.exception.ResourceNotFoundException;
import com.sportcore.repository.CategoryRepository;
import com.sportcore.repository.ProductRepository;

@Service
@Transactional
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public ProductDto createProduct(ProductDto productDto) {
        if (productRepository.existsByName(productDto.getName())) {
            throw new DuplicateResourceException("Product with name '" + productDto.getName() + "' already exists");
        }

        Category category = categoryRepository.findById(productDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + productDto.getCategoryId()));

        Product product = new Product();
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setPrice(productDto.getPrice());
        product.setStock(productDto.getStock());
        product.setCategory(category);
        product.setBrand(productDto.getBrand());
        product.setFlavor(productDto.getFlavor());

        Product savedProduct = productRepository.save(product);

        return convertToDto(savedProduct);
    }

    @Transactional(readOnly = true)
    public Page<ProductDto> getAllProducts(Pageable pageable) {
        Page<Product> products = productRepository.findAll(pageable);
        return products.map(this::convertToDto);
    }

    @Transactional(readOnly = true)
    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepository.findAllWithImages();
        return products.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProductDto getProductById(Long id) {
        Product product = productRepository.findByIdWithImages(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return convertToDto(product);
    }

    @Transactional(readOnly = true)
    public List<ProductDto> getRandomProducts(int limit) {
        List<Product> products = productRepository.findRandomProductsWithImages(limit);
        return products.stream()
                .map(product -> {
                    Product productWithImages = productRepository.findByIdWithImages(product.getId()).orElse(product);
                    return convertToDto(productWithImages);
                })
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProductDto> getProductsByCategory(Long categoryId) {
        List<Product> products = productRepository.findByCategoryId(categoryId);
        return products.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public ProductDto updateProduct(Long id, ProductDto productDto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        if (productRepository.existsByNameAndIdNot(productDto.getName(), id)) {
            throw new DuplicateResourceException("Product with name '" + productDto.getName() + "' already exists");
        }

        Category category = categoryRepository.findById(productDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + productDto.getCategoryId()));

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

    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<ProductDto> searchProductsByName(String name) {
        List<Product> products = productRepository.findByNameContainingIgnoreCase(name);
        return products.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

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
        
        if (product.getImages() != null && !product.getImages().isEmpty()) {
            dto.setImages(product.getImages().stream()
                .map(image -> {
                    com.sportcore.dto.ProductImageDto imageDto = new com.sportcore.dto.ProductImageDto();
                    imageDto.setId(image.getId());
                    imageDto.setUrl(image.getUrl());
                    imageDto.setAltText(image.getAltText());
                    return imageDto;
                })
                .collect(Collectors.toList()));
        }
        
        return dto;
    }
}
