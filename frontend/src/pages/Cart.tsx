import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaArrowLeft, FaTrash, FaCreditCard } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/molecules/CartItem';

const Cart: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state, clearCart } = useCart();

  const handleCheckout = () => {
    // TODO: Implement checkout functionality
    console.log('Proceeding to checkout...');
    alert('Checkout functionality will be implemented in the next user story!');
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  if (state.items.length === 0) {
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
            <span className="text-primary-500 font-medium">{t('cart.title')}</span>
          </div>

          {/* Empty Cart */}
          <div className="text-center py-16">
            <div className="text-6xl text-gray-300 mb-6">
              <FaShoppingCart />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('cart.empty')}
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {t('cart.emptyDescription')}
            </p>
            <button
              onClick={handleContinueShopping}
              className="bg-primary-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors duration-300"
            >
              {t('cart.continueShopping')}
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          <span className="text-primary-500 font-medium">{t('cart.title')}</span>
        </div>

        {/* Cart Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">
              {t('cart.title')}
            </h1>
            <p className="text-gray-600">
              {state.totalItems} {state.totalItems === 1 ? t('cart.item') : t('cart.items')}
            </p>
          </div>
          
          <button
            onClick={clearCart}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors duration-300"
          >
            <FaTrash className="text-sm" />
            <span>{t('cart.clearCart')}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {t('cart.orderSummary')}
              </h3>
              
              {/* Summary Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>{t('cart.subtotal')}</span>
                  <span>${state.totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>{t('cart.shipping')}</span>
                  <span className="text-green-600 font-medium">
                    {state.totalPrice >= 50 ? t('cart.free') : '$9.99'}
                  </span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>{t('cart.tax')}</span>
                  <span>${(state.totalPrice * 0.08).toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>{t('cart.total')}</span>
                    <span>
                      ${(state.totalPrice + (state.totalPrice >= 50 ? 0 : 9.99) + (state.totalPrice * 0.08)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <FaCreditCard />
                <span>{t('cart.checkout')}</span>
              </button>

              {/* Continue Shopping */}
              <button
                onClick={handleContinueShopping}
                className="w-full mt-4 text-primary-500 hover:text-primary-600 transition-colors duration-300 font-medium"
              >
                {t('cart.continueShopping')}
              </button>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2 text-green-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">
                    {t('cart.secureCheckout')}
                  </span>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  {t('cart.secureDescription')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
