import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSave, FaTimes, FaTrash, FaUpload } from 'react-icons/fa';
import { categoryApiService, CategoryDto } from '../../services/productApiService';

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  brand: string;
  flavor: string;
  images: File[];
}

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: Partial<ProductFormData>;
}

const ProductForm: React.FC<ProductFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
  initialData = {}
}) => {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData.name || '',
    description: initialData.description || '',
    price: initialData.price || 0,
    stock: initialData.stock || 0,
    category: initialData.category || '',
    brand: initialData.brand || '',
    flavor: initialData.flavor || '',
    images: initialData.images || []
  });

  const [errors, setErrors] = useState<Partial<ProductFormData>>({});
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Load categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await categoryApiService.getAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  const handleInputChange = (field: keyof ProductFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({ 
      ...prev, 
      images: prev.images.filter((_, i) => i !== index) 
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = t('admin.productNameRequired');
    }
    if (!formData.description.trim()) {
      newErrors.description = t('admin.productDescriptionRequired');
    }
    if (formData.price <= 0) {
      newErrors.price = t('admin.productPriceRequired');
    }
    if (formData.stock < 0) {
      newErrors.stock = t('admin.productStockRequired');
    }
    if (!formData.category.trim()) {
      newErrors.category = t('admin.productCategoryRequired');
    }
    if (!formData.brand.trim()) {
      newErrors.brand = t('admin.productBrandRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-gray-900 mb-2">
          {t('admin.addProduct')}
        </h2>
        <p className="text-gray-600">
          {t('admin.addProductDescription')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t('admin.productName')} *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-4 focus:ring-primary-500/20 transition-all duration-300 ${
                errors.name ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'
              }`}
              placeholder={t('admin.productNamePlaceholder')}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t('admin.productBrand')} *
            </label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) => handleInputChange('brand', e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-4 focus:ring-primary-500/20 transition-all duration-300 ${
                errors.brand ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'
              }`}
              placeholder={t('admin.productBrandPlaceholder')}
            />
            {errors.brand && (
              <p className="text-red-500 text-sm mt-1">{errors.brand}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t('admin.productDescription')} *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-4 focus:ring-primary-500/20 transition-all duration-300 resize-none ${
              errors.description ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'
            }`}
            placeholder={t('admin.productDescriptionPlaceholder')}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Price and Stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t('admin.productPrice')} *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                $
              </span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                className={`w-full pl-8 pr-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-4 focus:ring-primary-500/20 transition-all duration-300 ${
                  errors.price ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'
                }`}
                placeholder="0.00"
              />
            </div>
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t('admin.productStock')} *
            </label>
            <input
              type="number"
              min="0"
              value={formData.stock}
              onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
              className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-4 focus:ring-primary-500/20 transition-all duration-300 ${
                errors.stock ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'
              }`}
              placeholder="0"
            />
            {errors.stock && (
              <p className="text-red-500 text-sm mt-1">{errors.stock}</p>
            )}
          </div>
        </div>

        {/* Category and Flavor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t('admin.productCategory')} *
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              disabled={loadingCategories}
              className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-4 focus:ring-primary-500/20 transition-all duration-300 ${
                errors.category ? 'border-red-500' : 'border-gray-200 focus:border-primary-500'
              } ${loadingCategories ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <option value="">
                {loadingCategories ? t('common.loading') : t('admin.selectCategory')}
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t('admin.productFlavor')}
            </label>
            <input
              type="text"
              value={formData.flavor}
              onChange={(e) => handleInputChange('flavor', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-300"
              placeholder={t('admin.productFlavorPlaceholder')}
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {t('admin.productImages')}
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary-500 transition-colors duration-300">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center space-y-2"
            >
              <FaUpload className="text-4xl text-gray-400" />
              <span className="text-gray-600 font-medium">
                {t('admin.uploadImages')}
              </span>
              <span className="text-sm text-gray-500">
                {t('admin.uploadImagesDescription')}
              </span>
            </label>
          </div>

          {/* Display uploaded images */}
          {formData.images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center justify-center space-x-2 px-8 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-300 font-semibold"
          >
            <FaTimes />
            <span>{t('common.cancel')}</span>
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center space-x-2 px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <FaSave />
            )}
            <span>{isLoading ? t('common.saving') : t('common.save')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
