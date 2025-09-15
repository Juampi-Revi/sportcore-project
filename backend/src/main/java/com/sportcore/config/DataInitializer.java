package com.sportcore.config;

import java.math.BigDecimal;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.sportcore.entity.Category;
import com.sportcore.entity.Product;
import com.sportcore.entity.ProductImage;
import com.sportcore.repository.CategoryRepository;
import com.sportcore.repository.ProductRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        if (categoryRepository.count() == 0) {
            Category proteins = new Category("Proteins", "High-quality protein supplements for muscle building and recovery");
            Category creatine = new Category("Creatine", "Creatine supplements for enhanced strength and power");
            Category preWorkout = new Category("Pre-Workout", "Energy and performance boosting supplements");
            Category postWorkout = new Category("Post-Workout", "Recovery and muscle building supplements");
            Category vitamins = new Category("Vitamins", "Essential vitamins and minerals for overall health");
            Category fatBurners = new Category("Fat Burners", "Supplements to support fat loss and metabolism");

            categoryRepository.saveAll(Arrays.asList(proteins, creatine, preWorkout, postWorkout, vitamins, fatBurners));

            Product wheyProtein = new Product();
            wheyProtein.setName("Whey Protein Isolate");
            wheyProtein.setDescription("Premium whey protein isolate with 25g protein per serving. Perfect for post-workout recovery and muscle building.");
            wheyProtein.setPrice(new BigDecimal("49.99"));
            wheyProtein.setStock(50);
            wheyProtein.setCategory(proteins);
            wheyProtein.setBrand("SportCore");
            wheyProtein.setFlavor("Vanilla");

            Product caseinProtein = new Product();
            caseinProtein.setName("Casein Protein");
            caseinProtein.setDescription("Slow-release casein protein for overnight muscle recovery. 24g protein per serving.");
            caseinProtein.setPrice(new BigDecimal("54.99"));
            caseinProtein.setStock(30);
            caseinProtein.setCategory(proteins);
            caseinProtein.setBrand("SportCore");
            caseinProtein.setFlavor("Chocolate");

            Product creatineMonohydrate = new Product();
            creatineMonohydrate.setName("Creatine Monohydrate");
            creatineMonohydrate.setDescription("Pure creatine monohydrate for increased strength and power output. 5g per serving.");
            creatineMonohydrate.setPrice(new BigDecimal("24.99"));
            creatineMonohydrate.setStock(100);
            creatineMonohydrate.setCategory(creatine);
            creatineMonohydrate.setBrand("SportCore");
            creatineMonohydrate.setFlavor("Unflavored");

            productRepository.saveAll(Arrays.asList(wheyProtein, caseinProtein, creatineMonohydrate));

            ProductImage wheyImage = new ProductImage();
            wheyImage.setUrl("https://via.placeholder.com/400x400/DC2626/FFFFFF?text=Whey+Protein");
            wheyImage.setAltText("Whey Protein Isolate - Vanilla");
            wheyImage.setPrimary(true);
            wheyImage.setProduct(wheyProtein);
            wheyProtein.addImage(wheyImage);

            ProductImage caseinImage = new ProductImage();
            caseinImage.setUrl("https://via.placeholder.com/400x400/DC2626/FFFFFF?text=Casein+Protein");
            caseinImage.setAltText("Casein Protein - Chocolate");
            caseinImage.setPrimary(true);
            caseinImage.setProduct(caseinProtein);
            caseinProtein.addImage(caseinImage);

            ProductImage creatineImage = new ProductImage();
            creatineImage.setUrl("https://via.placeholder.com/400x400/DC2626/FFFFFF?text=Creatine+Monohydrate");
            creatineImage.setAltText("Creatine Monohydrate");
            creatineImage.setPrimary(true);
            creatineImage.setProduct(creatineMonohydrate);
            creatineMonohydrate.addImage(creatineImage);

            productRepository.saveAll(Arrays.asList(wheyProtein, caseinProtein, creatineMonohydrate));

            System.out.println("Datos iniciales cargados: " + productRepository.count() + " productos");
        }
    }
}
