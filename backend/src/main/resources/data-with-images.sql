-- Insertar categorías
INSERT INTO categories (id, name, description, created_at, updated_at) VALUES
(1, 'Proteins', 'High-quality protein supplements for muscle building and recovery', NOW(), NOW()),
(2, 'Creatine', 'Creatine supplements for enhanced strength and power', NOW(), NOW()),
(3, 'Pre-Workout', 'Energy and performance boosting supplements', NOW(), NOW()),
(4, 'Post-Workout', 'Recovery and muscle building supplements', NOW(), NOW()),
(5, 'Vitamins', 'Essential vitamins and minerals for overall health', NOW(), NOW()),
(6, 'Fat Burners', 'Supplements to support fat loss and metabolism', NOW(), NOW());

-- Insertar productos con imágenes
INSERT INTO products (id, name, description, price, stock, brand, flavor, category_id, created_at, updated_at) VALUES
(1, 'Whey Protein Isolate', 'Premium whey protein isolate with 25g protein per serving. Perfect for post-workout recovery and muscle building.', 49.99, 50, 'SportCore', 'Vanilla', 1, NOW(), NOW()),
(2, 'Casein Protein', 'Slow-release casein protein for overnight muscle recovery. 24g protein per serving.', 54.99, 30, 'SportCore', 'Chocolate', 1, NOW(), NOW()),
(3, 'Creatine Monohydrate', 'Pure creatine monohydrate for increased strength and power output. 5g per serving.', 24.99, 100, 'SportCore', 'Unflavored', 2, NOW(), NOW());

-- Insertar imágenes para los productos
INSERT INTO product_images (id, product_id, url, alt_text, is_primary, created_at, updated_at) VALUES
(1, 1, 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&h=800&fit=crop&crop=center', 'Whey Protein Isolate Vanilla - Premium protein supplement', true, NOW(), NOW()),
(2, 2, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop&crop=center', 'Casein Protein Chocolate - Slow-release protein for recovery', true, NOW(), NOW()),
(3, 3, 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&h=800&fit=crop&crop=center', 'Creatine Monohydrate - Pure creatine for strength and power', true, NOW(), NOW());
