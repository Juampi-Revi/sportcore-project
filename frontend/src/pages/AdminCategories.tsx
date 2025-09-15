import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaArrowLeft, FaEdit, FaPlus, FaTags, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { categoryApiService, CategoryDto } from '../services/categoryApiService';

const AdminCategories: React.FC = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const categoriesData = await categoryApiService.getAllCategories();
      setCategories(categoriesData);
    } catch (err) {
      console.error('Error loading categories:', err);
      setError('Error loading categories');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (window.confirm(t('admin.categories.deleteConfirm'))) {
      try {
        await categoryApiService.deleteCategory(id);
        setCategories(categories.filter(c => c.id !== id));
        alert(t('admin.categories.deleteSuccess'));
      } catch (err) {
        console.error('Error deleting category:', err);
        alert(t('admin.categories.deleteError'));
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
                  <div className="h-16 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('admin.categories.error')}</h1>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={loadCategories}
              className="mt-4 bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
            >
              {t('admin.categories.retry')}
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
            to="/admin/categories/add"
            className="flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            <FaPlus className="text-lg" />
            <span>{t('admin.categories.newCategory')}</span>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-primary-600 to-gray-900 bg-clip-text text-transparent mb-2">
            {t('admin.categories.title')}
          </h1>
          <p className="text-gray-600 text-lg">
            {t('admin.categories.subtitle')}
          </p>
        </div>

        {/* Categories Grid */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20 group hover:shadow-3xl hover:-translate-y-2 transition-all duration-500">
                {/* Category Icon */}
                <div className="h-32 bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                  <FaTags className="text-white text-4xl" />
                </div>
                
                {/* Category Info */}
                <div className="p-6">
                  <h3 className="text-xl font-black text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                    {category.description || t('admin.categories.noDescription')}
                  </p>
                  
                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin/categories/edit/${category.id}`}
                      className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-semibold"
                    >
                      <FaEdit className="text-sm" />
                      <span>{t('admin.categories.edit')}</span>
                    </Link>
                    
                    <button
                      onClick={() => handleDeleteCategory(category.id!)}
                      className="flex-1 flex items-center justify-center space-x-2 bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-xl transition-all duration-300 text-sm font-semibold"
                    >
                      <FaTrash className="text-sm" />
                      <span>{t('admin.categories.delete')}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏷️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('admin.categories.noCategories')}</h3>
            <p className="text-gray-600 mb-4">{t('admin.categories.noCategoriesMessage')}</p>
            <Link
              to="/admin/categories/add"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <FaPlus className="text-lg" />
              <span>{t('admin.categories.addCategory')}</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;
