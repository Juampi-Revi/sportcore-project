import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { productApiService, ProductDto } from '../services/productApiService';

const AdminProducts: React.FC = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const productsData = await productApiService.getAllProducts();
      setProducts(productsData);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Error loading products');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (window.confirm(t('admin.products.deleteConfirm'))) {
      try {
        await productApiService.deleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
        alert(t('admin.products.deleteSuccess'));
      } catch (err) {
        console.error('Error deleting product:', err);
        alert(t('admin.products.deleteError'));
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6">
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('admin.products.error')}</h1>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={loadProducts}
              className="mt-4 bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
            >
              {t('admin.products.retry')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/administracion"
              className="flex items-center space-x-2 text-gray-600 hover:text-primary-500 transition-colors duration-300"
            >
              <FaArrowLeft className="text-lg" />
              <span>{t('admin.actions.backToPanel')}</span>
            </Link>
          </div>
          
          <Link
            to="/admin/products/add"
            className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <FaPlus className="text-lg" />
            <span>{t('admin.products.newProduct')}</span>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-primary-600 to-gray-900 bg-clip-text text-transparent mb-2">
            {t('admin.products.title')}
          </h1>
          <p className="text-gray-600 text-lg">
            {t('admin.products.subtitle')}
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20 group">
                {/* Product Image */}
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                  {product.images?.[0]?.url ? (
                    <img 
                      src={product.images[0].url} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <span className="text-gray-500 text-lg font-medium">Sin imagen</span>
                  )}
                </div>
                
                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                      ${product.price}
                    </span>
                    <span className="text-sm text-gray-500">
                      {t('admin.products.stock')}: {product.stock}
                    </span>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Link
                      to={`/products/${product.id}`}
                      className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-semibold"
                    >
                      <FaEye className="text-sm" />
                      <span>{t('admin.products.view')}</span>
                    </Link>
                    
                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-semibold"
                    >
                      <FaEdit className="text-sm" />
                      <span>{t('admin.products.edit')}</span>
                    </Link>
                    
                    <button
                      onClick={() => handleDeleteProduct(product.id!)}
                      className="flex-1 flex items-center justify-center space-x-2 bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-semibold"
                    >
                      <FaTrash className="text-sm" />
                      <span>{t('admin.products.delete')}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('admin.products.noProducts')}</h3>
            <p className="text-gray-600 mb-4">{t('admin.products.noProductsMessage')}</p>
            <Link
              to="/admin/products/add"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <FaPlus className="text-lg" />
              <span>{t('admin.products.addProduct')}</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
