import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { CartItem as CartItemType, useCart } from '../../contexts/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { t } = useTranslation();
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center space-x-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <span className="text-xs">No Image</span>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {item.name}
              </h3>
              
              <div className="flex items-center space-x-2 mt-1">
                {item.brand && (
                  <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                    {item.brand}
                  </span>
                )}
                {item.flavor && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                    {item.flavor}
                  </span>
                )}
              </div>
              
              <div className="mt-2">
                <span className="text-2xl font-bold text-primary-500">
                  ${item.price.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  each
                </span>
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={handleRemove}
              className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
              title={t('cart.removeItem')}
            >
              <FaTrash className="text-sm" />
            </button>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex-shrink-0">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="p-2 hover:bg-gray-100 transition-colors duration-200 text-gray-600 hover:text-gray-900"
              disabled={item.quantity <= 1}
            >
              <FaMinus className="text-xs" />
            </button>
            
            <span className="px-4 py-2 font-semibold text-gray-900 min-w-[3rem] text-center">
              {item.quantity}
            </span>
            
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="p-2 hover:bg-gray-100 transition-colors duration-200 text-gray-600 hover:text-gray-900"
            >
              <FaPlus className="text-xs" />
            </button>
          </div>
          
          {/* Item Total */}
          <div className="mt-2 text-right">
            <span className="text-sm text-gray-600">
              {t('cart.subtotal')}:
            </span>
            <div className="text-lg font-bold text-gray-900">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
