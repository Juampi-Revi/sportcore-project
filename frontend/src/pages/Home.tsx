import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaBolt, FaBurn, FaDna, FaDumbbell, FaFire, FaLeaf, FaRedo, FaStar, FaThLarge } from 'react-icons/fa';
import { GiEnergyArrow, GiMuscleUp } from 'react-icons/gi';
import ProductCard from '../components/molecules/ProductCard';
import SearchBar from '../components/molecules/SearchBar';
import { categoryApiService, CategoryDto, productApiService, ProductDto } from '../services/productApiService';

const Home: React.FC = () => {
  const { t } = useTranslation();
  
  // State for products and categories
  const [featuredProducts, setFeaturedProducts] = useState<ProductDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [searchResults, setSearchResults] = useState<ProductDto[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Load featured products and categories on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load featured products (random products for now)
        const products = await productApiService.getRandomProducts(4);
        setFeaturedProducts(products);
        
        // Load categories
        const categoriesData = await categoryApiService.getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoadingProducts(false);
        setLoadingCategories(false);
      }
    };

    loadData();
  }, []);

  // Handle search functionality
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const results = await productApiService.searchProducts(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching products:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle product actions
  const handleAddToCart = (id: number) => {
    console.log('Add to cart:', id);
    // TODO: Implement cart functionality
  };

  const handleViewDetails = (id: number) => {
    console.log('View details:', id);
    // TODO: Navigate to product detail page
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-7xl font-black mb-8 tracking-tight">
            {t('home.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            {t('home.subtitle')}
          </p>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <SearchBar 
              onSearch={handleSearch}
              className="shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Search Results Section */}
      {searchResults.length > 0 && (
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-center mb-12">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary-500 rounded-full">
                  <FaFire className="text-white text-2xl" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                  {t('home.searchResults')} ({searchResults.length})
                </h2>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {searchResults.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id!}
                  name={product.name}
                  description={product.description || ''}
                  price={product.price}
                  image={product.images?.[0]?.url}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center mb-16">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-500 rounded-full">
                <FaFire className="text-white text-2xl" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                {t('home.featuredProducts')}
              </h2>
            </div>
          </div>
          
          <div className={`grid gap-10 ${
            featuredProducts.length === 1 
              ? 'grid-cols-1 max-w-md mx-auto' 
              : featuredProducts.length === 2 
              ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' 
              : featuredProducts.length === 3 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          }`}>
            {/* Featured products */}
            {loadingProducts ? (
              // Loading skeleton
              Array.from({ length: Math.min(4, featuredProducts.length || 4) }).map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-56 bg-gray-200"></div>
                  <div className="p-8">
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-6"></div>
                    <div className="h-8 bg-gray-200 rounded mb-3"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))
            ) : featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id!}
                  name={product.name}
                  description={product.description || ''}
                  price={product.price}
                  image={product.images?.[0]?.url}
                  onAddToCart={handleAddToCart}
                  onViewDetails={handleViewDetails}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">{t('products.noProducts')}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center mb-16">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-500 rounded-full">
                <FaThLarge className="text-white text-2xl" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                {t('home.categories')}
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {loadingCategories ? (
              // Loading skeleton for categories
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 text-center animate-pulse">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-6"></div>
                  <div className="h-6 bg-gray-200 rounded"></div>
                </div>
              ))
            ) : (
              categories.map((category, index) => {
                // Map category names to icons and colors
                const getCategoryIcon = (name: string) => {
                  const lowerName = name.toLowerCase();
                  if (lowerName.includes('protein')) return { icon: FaDumbbell, color: 'text-blue-500' };
                  if (lowerName.includes('creatine')) return { icon: GiMuscleUp, color: 'text-purple-500' };
                  if (lowerName.includes('pre-workout') || lowerName.includes('preworkout')) return { icon: FaBolt, color: 'text-yellow-500' };
                  if (lowerName.includes('vitamin')) return { icon: FaLeaf, color: 'text-green-500' };
                  if (lowerName.includes('amino')) return { icon: FaDna, color: 'text-pink-500' };
                  if (lowerName.includes('fat') || lowerName.includes('burner')) return { icon: FaBurn, color: 'text-red-500' };
                  if (lowerName.includes('post-workout') || lowerName.includes('recovery')) return { icon: FaRedo, color: 'text-indigo-500' };
                  return { icon: GiEnergyArrow, color: 'text-orange-500' };
                };

                const { icon: IconComponent, color } = getCategoryIcon(category.name);
                
                return (
                  <div key={category.id} className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group border border-gray-100">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className={`text-5xl mb-6 ${color} group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}>
                        <IconComponent />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-500 transition-colors duration-300">
                        {category.name}
                      </h3>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center mb-16">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-500 rounded-full">
                <FaStar className="text-white text-2xl" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                {t('home.recommendations')}
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-10 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <FaStar className="text-white text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Recomendación {item}
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Descripción de la recomendación número {item}. 
                  Este producto ha sido seleccionado especialmente para ti.
                </p>
                <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">
                  Ver Producto
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
