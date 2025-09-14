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
(3, 'Creatine Monohydrate', 'Pure creatine monohydrate for increased strength and power output. 5g per serving.', 24.99, 100, 'SportCore', 'Unflavored', 2, NOW(), NOW()),
(4, 'Pre-Workout Blast', 'Explosive energy and focus for intense workouts. Contains beta-alanine and caffeine.', 34.99, 75, 'SportCore', 'Fruit Punch', 3, NOW(), NOW()),
(5, 'BCAA Recovery', 'Branched-chain amino acids for faster muscle recovery and reduced fatigue.', 29.99, 60, 'SportCore', 'Lemon Lime', 4, NOW(), NOW()),
(6, 'Multivitamin Complex', 'Complete daily multivitamin with essential vitamins and minerals for optimal health.', 19.99, 120, 'SportCore', 'Berry', 5, NOW(), NOW()),
(7, 'Fat Burner Pro', 'Advanced fat burning formula with natural ingredients to support weight loss.', 39.99, 45, 'SportCore', 'Green Tea', 6, NOW(), NOW()),
(8, 'Mass Gainer', 'High-calorie protein powder for muscle mass building and weight gain.', 59.99, 25, 'SportCore', 'Cookies & Cream', 1, NOW(), NOW());

-- Insertar imágenes para los productos (múltiples imágenes por producto)
INSERT INTO product_images (id, product_id, url, alt_text, is_primary, created_at, updated_at) VALUES
-- Whey Protein Isolate (3 imágenes)
(1, 1, 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&h=800&fit=crop&crop=center', 'Whey Protein Isolate Vanilla - Premium protein supplement', true, NOW(), NOW()),
(2, 1, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop&crop=center', 'Whey Protein Isolate - Product packaging', false, NOW(), NOW()),
(3, 1, 'https://images.unsplash.com/photo-1626857749000-82152721121f?w=800&h=800&fit=crop&crop=center', 'Whey Protein Isolate - Scoop and powder', false, NOW(), NOW()),

-- Casein Protein (2 imágenes)
(4, 2, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop&crop=center', 'Casein Protein Chocolate - Slow-release protein for recovery', true, NOW(), NOW()),
(5, 2, 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&h=800&fit=crop&crop=center', 'Casein Protein - Product details', false, NOW(), NOW()),

-- Creatine Monohydrate (4 imágenes)
(6, 3, 'https://images.unsplash.com/photo-1626857749000-82152721121f?w=800&h=800&fit=crop&crop=center', 'Creatine Monohydrate - Pure creatine for strength and power', true, NOW(), NOW()),
(7, 3, 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&h=800&fit=crop&crop=center', 'Creatine Monohydrate - Product label', false, NOW(), NOW()),
(8, 3, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop&crop=center', 'Creatine Monohydrate - Powder texture', false, NOW(), NOW()),
(9, 3, 'https://images.unsplash.com/photo-1626857749000-82152721121f?w=800&h=800&fit=crop&crop=center', 'Creatine Monohydrate - Usage instructions', false, NOW(), NOW()),

-- Pre-Workout Blast (3 imágenes)
(10, 4, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop&crop=center', 'Pre-Workout Blast Fruit Punch - Energy and focus supplement', true, NOW(), NOW()),
(11, 4, 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&h=800&fit=crop&crop=center', 'Pre-Workout Blast - Product packaging', false, NOW(), NOW()),
(12, 4, 'https://images.unsplash.com/photo-1626857749000-82152721121f?w=800&h=800&fit=crop&crop=center', 'Pre-Workout Blast - Ingredients list', false, NOW(), NOW()),

-- BCAA Recovery (2 imágenes)
(13, 5, 'https://images.unsplash.com/photo-1626857749000-82152721121f?w=800&h=800&fit=crop&crop=center', 'BCAA Recovery Lemon Lime - Amino acids for muscle recovery', true, NOW(), NOW()),
(14, 5, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop&crop=center', 'BCAA Recovery - Product details', false, NOW(), NOW()),

-- Multivitamin Complex (2 imágenes)
(15, 6, 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&h=800&fit=crop&crop=center', 'Multivitamin Complex Berry - Daily vitamins and minerals', true, NOW(), NOW()),
(16, 6, 'https://images.unsplash.com/photo-1626857749000-82152721121f?w=800&h=800&fit=crop&crop=center', 'Multivitamin Complex - Product packaging', false, NOW(), NOW()),

-- Fat Burner Pro (3 imágenes)
(17, 7, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop&crop=center', 'Fat Burner Pro Green Tea - Natural fat burning formula', true, NOW(), NOW()),
(18, 7, 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&h=800&fit=crop&crop=center', 'Fat Burner Pro - Product label', false, NOW(), NOW()),
(19, 7, 'https://images.unsplash.com/photo-1626857749000-82152721121f?w=800&h=800&fit=crop&crop=center', 'Fat Burner Pro - Natural ingredients', false, NOW(), NOW()),

-- Mass Gainer (2 imágenes)
(20, 8, 'https://images.unsplash.com/photo-1626857749000-82152721121f?w=800&h=800&fit=crop&crop=center', 'Mass Gainer Cookies & Cream - High-calorie protein for weight gain', true, NOW(), NOW()),
(21, 8, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop&crop=center', 'Mass Gainer - Product details', false, NOW(), NOW());
