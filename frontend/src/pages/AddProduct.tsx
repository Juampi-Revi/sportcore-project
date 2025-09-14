import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/organisms/ProductForm';
import { productApiService, ProductDto } from '../services/productApiService';

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

const AddProduct: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (data: ProductFormData) => {
    setIsLoading(true);
    setMessage(null);

    try {
      // Convert form data to ProductDto format
      const productData: Omit<ProductDto, 'id'> = {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        categoryId: parseInt(data.category),
        brand: data.brand,
        flavor: data.flavor || undefined,
        // Note: Images would need to be uploaded separately in a real implementation
        images: []
      };

      // Call the real API
      const createdProduct = await productApiService.createProduct(productData);
      
      console.log('Product created successfully:', createdProduct);
      
      setMessage({
        type: 'success',
        text: t('admin.productCreated')
      });

      // Redirect to products list after success
      setTimeout(() => {
        navigate('/admin/products');
      }, 2000);

    } catch (error: any) {
      console.error('Error creating product:', error);
      
      let errorMessage = t('common.error');
      
      // Handle specific error cases
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 400) {
        errorMessage = t('admin.productNameExists');
      } else if (error.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      }
      
      setMessage({
        type: 'error',
        text: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/products');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Success/Error Message */}
        {message && (
          <div className={`mb-8 p-6 rounded-2xl flex items-center space-x-3 ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            {message.type === 'success' ? (
              <FaCheckCircle className="text-2xl" />
            ) : (
              <FaExclamationCircle className="text-2xl" />
            )}
            <span className="font-semibold">{message.text}</span>
          </div>
        )}

        {/* Product Form */}
        <ProductForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default AddProduct;
