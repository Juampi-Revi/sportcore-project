import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaTruck, FaCreditCard, FaHome, FaShoppingBag } from 'react-icons/fa';
import { orderApiService, OrderResponse } from '../services/orderApiService';

const OrderConfirmation: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!id) {
        setError(t('checkout.orderNotFound'));
        setLoading(false);
        return;
      }

      try {
        // Try to get order from location state first (if coming from checkout)
        const orderFromState = location.state?.order as OrderResponse;
        if (orderFromState) {
          setOrder(orderFromState);
          setLoading(false);
          return;
        }

        // Otherwise fetch from API
        const orderData = await orderApiService.getOrderById(parseInt(id));
        setOrder(orderData);
      } catch (err) {
        setError(t('checkout.orderFetchError'));
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id, location.state, t]);

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleViewOrder = () => {
    // TODO: Implement order details page
    console.log('View order details:', order?.id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <div className="text-red-500 text-6xl mb-4">
                <FaCheckCircle />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('checkout.orderError')}
              </h2>
              <p className="text-gray-600 mb-6">
                {error || t('checkout.orderNotFound')}
              </p>
              <button
                onClick={handleContinueShopping}
                className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-300"
              >
                {t('checkout.continueShopping')}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="text-green-500 text-6xl mb-4">
              <FaCheckCircle />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">
              {t('checkout.orderConfirmed')}
            </h1>
            <p className="text-gray-600 text-lg">
              {t('checkout.orderConfirmedDescription')}
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Order Information */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {t('checkout.orderDetails')}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('checkout.orderNumber')}:</span>
                    <span className="font-semibold text-gray-900">#{order.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('checkout.orderDate')}:</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('checkout.orderStatus')}:</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {t('checkout.statusConfirmed')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('checkout.estimatedDelivery')}:</span>
                    <span className="font-semibold text-gray-900">
                      {new Date(order.estimatedDelivery).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {t('checkout.shippingTo')}
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium text-gray-900">
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </p>
                  <p className="text-gray-600">{order.shippingAddress.email}</p>
                  <p className="text-gray-600">{order.shippingAddress.phone}</p>
                  <p className="text-gray-600">
                    {order.shippingAddress.address}
                  </p>
                  <p className="text-gray-600">
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </p>
                  <p className="text-gray-600">{order.shippingAddress.country}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              {t('checkout.orderItems')}
            </h3>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <FaShoppingBag className="text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Product ID: {item.productId}</h4>
                    <p className="text-sm text-gray-600">
                      {t('checkout.quantity')}: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ${item.price.toFixed(2)} each
                    </p>
                    <p className="text-sm text-gray-600">
                      ${(item.price * item.quantity).toFixed(2)} total
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              {t('checkout.orderSummary')}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>{t('checkout.subtotal')}</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>{t('checkout.shipping')}</span>
                <span>{order.shipping === 0 ? t('checkout.free') : `$${order.shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>{t('checkout.tax')}</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>{t('checkout.total')}</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {t('checkout.whatsNext')}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">1</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{t('checkout.step1')}</p>
                  <p className="text-sm text-gray-600">{t('checkout.step1Description')}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">2</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{t('checkout.step2')}</p>
                  <p className="text-sm text-gray-600">{t('checkout.step2Description')}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold">3</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{t('checkout.step3')}</p>
                  <p className="text-sm text-gray-600">{t('checkout.step3Description')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleContinueShopping}
              className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <FaHome />
              <span>{t('checkout.continueShopping')}</span>
            </button>
            <button
              onClick={handleViewOrder}
              className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <FaShoppingBag />
              <span>{t('checkout.viewOrder')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
