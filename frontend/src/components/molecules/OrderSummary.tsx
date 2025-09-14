import React from 'react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../contexts/CartContext';

interface OrderSummaryProps {
  className?: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const { state } = useCart();

  const shipping = state.totalPrice >= 50 ? 0 : 9.99;
  const tax = state.totalPrice * 0.08;
  const total = state.totalPrice + shipping + tax;

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}>
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        {t('checkout.orderSummary')}
      </h3>
      
      {/* Order Items */}
      <div className="space-y-4 mb-6">
        {state.items.map((item) => (
          <div key={item.id} className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
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
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-gray-900 truncate">
                {item.name}
              </h4>
              <p className="text-xs text-gray-500">
                {item.brand} {item.flavor && `- ${item.flavor}`}
              </p>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {item.quantity} × ${item.price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mb-4"></div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>{t('checkout.subtotal')}</span>
          <span>${state.totalPrice.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>{t('checkout.shipping')}</span>
          <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
            {shipping === 0 ? t('checkout.free') : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>{t('checkout.tax')}</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-bold text-gray-900">
            <span>{t('checkout.total')}</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Free Shipping Notice */}
      {state.totalPrice < 50 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-blue-700">
            {t('checkout.freeShippingNotice', { 
              amount: (50 - state.totalPrice).toFixed(2) 
            })}
          </p>
        </div>
      )}

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
        <div className="flex items-center space-x-2 text-green-700">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium">
            {t('checkout.secureCheckout')}
          </span>
        </div>
        <p className="text-xs text-green-600 mt-1">
          {t('checkout.secureDescription')}
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
