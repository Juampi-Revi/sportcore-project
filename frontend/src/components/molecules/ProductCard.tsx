import React from 'react';
import { useTranslation } from 'react-i18next';

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  onAddToCart?: (id: number) => void;
  onViewDetails?: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  image,
  onAddToCart,
  onViewDetails
}) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group">
      <div className="h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <span className="text-gray-500 text-lg font-medium">Product Image</span>
        )}
      </div>
      <div className="p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-500 transition-colors duration-300">
          {name}
        </h3>
        <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
          {description}
        </p>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black text-primary-500">
              ${price.toFixed(2)}
            </span>
          </div>
          <div className="space-y-3">
            <button 
              onClick={() => onViewDetails?.(id)}
              className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-all duration-300 text-sm font-semibold border border-gray-200"
            >
              {t('products.viewDetails')}
            </button>
            <button 
              onClick={() => onAddToCart?.(id)}
              className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
            >
              {t('products.addToCart')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
