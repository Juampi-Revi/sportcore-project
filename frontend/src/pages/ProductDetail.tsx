import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaExpand, FaHeart, FaShare, FaShieldAlt, FaShoppingCart, FaStar, FaTruck, FaUndo } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import LazyImage from '../components/atoms/LazyImage';
import ThumbnailGallery from '../components/molecules/ThumbnailGallery';
import ImageGallery from '../components/organisms/ImageGallery';
import { useCart } from '../contexts/CartContext';
import { productApiService, ProductDto } from '../services/productApiService';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState<ProductDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const productData = await productApiService.getProductById(parseInt(id));
        setProduct(productData);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Error loading product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    setIsAddingToCart(true);
    try {
      // Add product to cart using context
      addItem(product, quantity);
      
      // Simulate API call for better UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Show success message
      alert(`${quantity} ${product.name} added to cart!`);
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Error adding product to cart');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Product link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-6">
          {/* Loading skeleton */}
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-32 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="h-96 bg-gray-300 rounded-2xl"></div>
                <div className="flex space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-20 w-20 bg-gray-300 rounded-lg"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                <div className="h-12 bg-gray-300 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl text-gray-400 mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('product.productNotFound')}</h2>
          <p className="text-gray-600 mb-6">{t('product.productNotFoundDescription')}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary-500 text-white px-6 py-3 rounded-xl hover:bg-primary-600 transition-colors duration-300"
          >
            {t('product.backToHome')}
          </button>
        </div>
      </div>
    );
  }

  const primaryImage = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&h=600&fit=crop';
  const allImages = product.images?.map(img => img.url) || [primaryImage];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        {/* Navigation */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-primary-500 transition-colors duration-300"
          >
            <FaArrowLeft className="text-lg" />
            <span>{t('common.back')}</span>
          </button>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">{t('navigation.products')}</span>
          <span className="text-gray-400">/</span>
          <span className="text-primary-500 font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative group">
              <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer">
                <LazyImage
                  src={allImages[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onLoad={() => console.log('Image loaded')}
                />
                
                {/* Gallery Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <button
                    onClick={() => setIsGalleryOpen(true)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white"
                    title={t('gallery.viewFullSize')}
                  >
                    <FaExpand className="text-gray-700 text-xl" />
                  </button>
                </div>
              </div>
              
              {/* Image Actions */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <button
                  onClick={handleShare}
                  className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-300"
                  title={t('gallery.share')}
                >
                  <FaShare className="text-gray-700" />
                </button>
                <button 
                  className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors duration-300"
                  title={t('gallery.like')}
                >
                  <FaHeart className="text-gray-700" />
                </button>
              </div>
            </div>

            {/* Enhanced Thumbnail Gallery */}
            <ThumbnailGallery
              images={allImages}
              selectedIndex={selectedImageIndex}
              onImageSelect={setSelectedImageIndex}
              altText={product.name}
              autoPlay={false}
              showIndicators={true}
              showNavigation={true}
            />
          </div>

          {/* Product Information */}
          <div className="space-y-8">
            {/* Product Title & Brand */}
            <div>
              <div className="flex items-center space-x-3 mb-2">
                {product.brand && (
                  <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                    {product.brand}
                  </span>
                )}
                {product.flavor && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                    {product.flavor}
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-black text-gray-900 mb-4">{product.name}</h1>
              
              {/* Rating (mock) */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} className="text-yellow-400 text-sm" />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">(4.8) • 127 reviews</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-5xl font-black bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">${product.price}</span>
              <div className="text-sm text-gray-600">
                <div>Stock: {product.stock} units</div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-600 font-semibold">In Stock</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('product.description')}</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('product.quantity')}</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                  >
                    -
                  </button>
                  <span className="px-4 py-3 font-semibold">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {t('product.total')}: <span className="font-semibold text-primary-500">${(product.price * quantity).toFixed(2)}</span>
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart || product.stock === 0}
                className="w-full bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-2xl hover:from-primary-600 hover:via-primary-700 hover:to-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-3 hover:shadow-3xl hover:-translate-y-1 active:translate-y-0 active:scale-95"
              >
                {isAddingToCart ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>{t('product.addingToCart')}</span>
                  </>
                ) : (
                  <>
                    <FaShoppingCart />
                    <span>{t('product.addToCart')}</span>
                  </>
                )}
              </button>
              
              {product.stock === 0 && (
                <div className="text-center text-red-600 font-medium">
                  {t('product.outOfStock')}
                </div>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FaTruck className="text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{t('product.freeShipping')}</div>
                  <div className="text-sm text-gray-600">{t('product.onOrdersOver')}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FaShieldAlt className="text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{t('product.qualityGuarantee')}</div>
                  <div className="text-sm text-gray-600">{t('product.authentic')}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FaUndo className="text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{t('product.easyReturns')}</div>
                  <div className="text-sm text-gray-600">{t('product.dayPolicy')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery Modal */}
      <ImageGallery
        images={allImages}
        altText={product.name}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        initialIndex={selectedImageIndex}
        productName={product.name}
      />
    </div>
  );
};

export default ProductDetail;
