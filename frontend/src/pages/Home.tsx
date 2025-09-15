import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaBolt, FaBurn, FaDna, FaDumbbell, FaFire, FaLeaf, FaRedo, FaStar, FaThLarge } from 'react-icons/fa';
import { GiEnergyArrow, GiMuscleUp } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/molecules/ProductCard';
import SearchBar from '../components/molecules/SearchBar';
import { useCart } from '../contexts/CartContext';
import { categoryApiService, CategoryDto, productApiService, ProductDto } from '../services/productApiService';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
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
    const product = featuredProducts.find(p => p.id === id) || searchResults.find(p => p.id === id);
    if (product) {
      addItem(product, 1);
      alert(`${product.name} added to cart!`);
    }
  };

  const handleViewDetails = (id: number) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-primary-900 to-gray-800 text-white py-24 md:py-32 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-accent-500/10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-500/20 via-transparent to-transparent"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-6xl md:text-7xl font-black mb-8 tracking-tight bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent animate-pulse">
            {t('home.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            {t('home.subtitle')}
          </p>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <SearchBar 
              onSearch={handleSearch}
              className="shadow-2xl backdrop-blur-sm"
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
      <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-500/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent-500/5 to-transparent rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center justify-center mb-16">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl shadow-xl">
                <FaFire className="text-white text-2xl" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-primary-600 to-gray-900 bg-clip-text text-transparent tracking-tight">
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
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary-500/3 via-transparent to-accent-500/3 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center justify-center mb-16">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl shadow-xl">
                <FaThLarge className="text-white text-2xl" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-primary-600 to-gray-900 bg-clip-text text-transparent tracking-tight leading-tight">
                {t('home.categories')}
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {loadingCategories ? (
              // Loading skeleton for categories
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center animate-pulse border border-white/20">
                  <div className="w-16 h-16 bg-gray-200 rounded-2xl mx-auto mb-6"></div>
                  <div className="h-6 bg-gray-200 rounded-lg"></div>
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
                  <button 
                    key={category.id} 
                    className="w-full bg-white/90 backdrop-blur-sm rounded-3xl p-8 text-center hover:shadow-3xl hover:-translate-y-3 hover:scale-[1.02] transition-all duration-500 cursor-pointer group border border-white/30 relative overflow-hidden hover:border-primary-200/50 focus:outline-none focus:ring-4 focus:ring-primary-500/20 active:scale-95"
                    onClick={() => navigate(`/products?category=${category.id}`)}
                  >
                    {/* Glassmorphism overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                    
                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    
                    <div className="flex flex-col items-center justify-center h-full relative z-10">
                      <div className={`text-5xl mb-6 ${color} group-hover:scale-110 transition-transform duration-500 flex items-center justify-center`}>
                        <IconComponent />
                      </div>
                      <h3 className="text-xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-primary-600 group-hover:to-primary-500 transition-all duration-300">
                        {category.name}
                      </h3>
                      
                      {/* Subtle button indicator */}
                      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-8 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mx-auto"></div>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-accent-500/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-primary-500/5 to-transparent rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center justify-center mb-16">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl shadow-xl">
                <FaStar className="text-white text-2xl" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 via-primary-600 to-gray-900 bg-clip-text text-transparent tracking-tight">
                {t('home.recommendations')}
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 text-center hover:shadow-3xl hover:-translate-y-3 hover:scale-[1.02] transition-all duration-500 border border-white/20 relative overflow-hidden group">
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                    <FaStar className="text-white text-3xl" />
                  </div>
                  <h3 className="text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                    Recomendación {item}
                  </h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Descripción de la recomendación número {item}. 
                    Este producto ha sido seleccionado especialmente para ti.
                  </p>
                  <button className="bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white px-8 py-3 rounded-2xl hover:from-primary-600 hover:via-primary-700 hover:to-primary-800 transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95">
                    Ver Producto
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
