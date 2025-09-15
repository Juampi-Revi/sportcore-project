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
  viewMode?: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  image,
  onAddToCart,
  onViewDetails,
  viewMode = 'grid'
}) => {
  const { t } = useTranslation();

  if (viewMode === 'list') {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 border border-white/20 group relative">
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
        
        <div className="flex relative z-10">
          {/* Image */}
          <div className="w-48 h-48 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden flex-shrink-0">
            {image ? (
              <img 
                src={image} 
                alt={name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            ) : (
              <span className="text-gray-500 text-lg font-medium">Product Image</span>
            )}
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2 group-hover:from-primary-600 group-hover:to-primary-500 transition-all duration-300">
                {name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {description}
              </p>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                ${price.toFixed(2)}
              </span>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => onViewDetails?.(id)}
                  className="bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80 px-4 py-2 rounded-2xl font-medium transition-all duration-300 border border-gray-200/50 hover:border-gray-300/50 hover:shadow-lg"
                >
                  {t('products.viewDetails')}
                </button>
                <button
                  onClick={() => onAddToCart?.(id)}
                  className="bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white hover:from-primary-600 hover:via-primary-700 hover:to-primary-800 px-4 py-2 rounded-2xl font-medium transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                >
                  {t('products.addToCart')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl hover:-translate-y-3 hover:scale-[1.02] transition-all duration-500 border border-white/20 group relative">
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
      
      <div className="h-56 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        ) : (
          <span className="text-gray-500 text-lg font-medium">Product Image</span>
        )}
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-8 relative z-10">
        <h3 className="text-xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3 group-hover:from-primary-600 group-hover:to-primary-500 transition-all duration-300">
          {name}
        </h3>
        <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed">
          {description}
        </p>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
              ${price.toFixed(2)}
            </span>
          </div>
          <div className="space-y-3">
            <button 
              onClick={() => onViewDetails?.(id)}
              className="w-full bg-white/60 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-2xl hover:bg-white/80 hover:shadow-lg transition-all duration-300 text-sm font-semibold border border-gray-200/50 hover:border-gray-300/50"
            >
              {t('products.viewDetails')}
            </button>
            <button 
              onClick={() => onAddToCart?.(id)}
              className="w-full bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white px-6 py-3 rounded-2xl hover:from-primary-600 hover:via-primary-700 hover:to-primary-800 transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
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
