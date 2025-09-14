import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaCheck, FaCreditCard, FaTruck } from 'react-icons/fa';
import { useCart } from '../contexts/CartContext';
import { orderApiService, ShippingAddress, PaymentInfo, CreateOrderRequest } from '../services/orderApiService';
import OrderSummary from '../components/molecules/OrderSummary';
import ShippingForm from '../components/molecules/ShippingForm';
import PaymentForm from '../components/molecules/PaymentForm';

type CheckoutStep = 'shipping' | 'payment' | 'review';

const Checkout: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state, clearCart } = useCart();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [shippingData, setShippingData] = useState<ShippingAddress | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if cart is empty
  useEffect(() => {
    if (state.items.length === 0) {
      navigate('/cart');
    }
  }, [state.items.length, navigate]);

  const handleShippingSubmit = (data: ShippingAddress) => {
    setShippingData(data);
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = async (data: PaymentInfo) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate payment
      const isValidPayment = await orderApiService.validatePayment(data);
      if (!isValidPayment) {
        setError(t('checkout.paymentValidationFailed'));
        setIsLoading(false);
        return;
      }

      setPaymentData(data);
      setCurrentStep('review');
    } catch (err) {
      setError(t('checkout.paymentValidationError'));
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!shippingData || !paymentData) return;

    setIsLoading(true);
    setError(null);

    try {
      const shipping = state.totalPrice >= 50 ? 0 : 9.99;
      const tax = state.totalPrice * 0.08;
      const total = state.totalPrice + shipping + tax;

      const orderData: CreateOrderRequest = {
        items: state.items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        shippingAddress: shippingData,
        paymentInfo: paymentData,
        subtotal: state.totalPrice,
        shipping,
        tax,
        total
      };

      const order = await orderApiService.createOrder(orderData);
      
      // Clear cart and redirect to confirmation
      clearCart();
      navigate(`/order-confirmation/${order.id}`, { 
        state: { order } 
      });
    } catch (err) {
      setError(t('checkout.orderCreationError'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToCart = () => {
    navigate('/cart');
  };

  const handleBackToShipping = () => {
    setCurrentStep('shipping');
  };

  const handleBackToPayment = () => {
    setCurrentStep('payment');
  };

  if (state.items.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        {/* Navigation */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={handleBackToCart}
            className="flex items-center space-x-2 text-gray-600 hover:text-primary-500 transition-colors duration-300"
          >
            <FaArrowLeft className="text-lg" />
            <span>{t('common.back')}</span>
          </button>
          <span className="text-gray-400">/</span>
          <span className="text-primary-500 font-medium">{t('checkout.title')}</span>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {/* Shipping Step */}
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'shipping' 
                  ? 'bg-primary-500 text-white' 
                  : currentStep === 'payment' || currentStep === 'review'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}>
                {currentStep === 'payment' || currentStep === 'review' ? (
                  <FaCheck className="text-sm" />
                ) : (
                  <span className="text-sm font-bold">1</span>
                )}
              </div>
              <div className="text-center">
                <p className={`text-sm font-medium ${
                  currentStep === 'shipping' ? 'text-primary-500' : 'text-gray-600'
                }`}>
                  {t('checkout.shipping')}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className={`w-16 h-0.5 ${
              currentStep === 'payment' || currentStep === 'review' 
                ? 'bg-green-500' 
                : 'bg-gray-300'
            }`}></div>

            {/* Payment Step */}
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'payment' 
                  ? 'bg-primary-500 text-white' 
                  : currentStep === 'review'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}>
                {currentStep === 'review' ? (
                  <FaCheck className="text-sm" />
                ) : (
                  <span className="text-sm font-bold">2</span>
                )}
              </div>
              <div className="text-center">
                <p className={`text-sm font-medium ${
                  currentStep === 'payment' ? 'text-primary-500' : 'text-gray-600'
                }`}>
                  {t('checkout.payment')}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className={`w-16 h-0.5 ${
              currentStep === 'review' ? 'bg-green-500' : 'bg-gray-300'
            }`}></div>

            {/* Review Step */}
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'review' 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-gray-300 text-gray-600'
              }`}>
                <span className="text-sm font-bold">3</span>
              </div>
              <div className="text-center">
                <p className={`text-sm font-medium ${
                  currentStep === 'review' ? 'text-primary-500' : 'text-gray-600'
                }`}>
                  {t('checkout.review')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 'shipping' && (
              <ShippingForm
                onSubmit={handleShippingSubmit}
                onBack={handleBackToCart}
                isLoading={isLoading}
              />
            )}

            {currentStep === 'payment' && shippingData && (
              <PaymentForm
                shippingAddress={shippingData}
                onSubmit={handlePaymentSubmit}
                onBack={handleBackToShipping}
                isLoading={isLoading}
              />
            )}

            {currentStep === 'review' && shippingData && paymentData && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {t('checkout.reviewOrder')}
                </h3>

                {/* Shipping Information */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <FaTruck className="text-primary-500" />
                    <h4 className="font-semibold text-gray-900">{t('checkout.shippingTo')}</h4>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-900">
                      {shippingData.firstName} {shippingData.lastName}
                    </p>
                    <p className="text-gray-600">{shippingData.email}</p>
                    <p className="text-gray-600">{shippingData.phone}</p>
                    <p className="text-gray-600">
                      {shippingData.address}, {shippingData.city}, {shippingData.state} {shippingData.zipCode}
                    </p>
                    <p className="text-gray-600">{shippingData.country}</p>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <FaCreditCard className="text-primary-500" />
                    <h4 className="font-semibold text-gray-900">{t('checkout.paymentMethod')}</h4>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-900">
                      {paymentData.cardholderName}
                    </p>
                    <p className="text-gray-600">
                      **** **** **** {paymentData.cardNumber.slice(-4)}
                    </p>
                    <p className="text-gray-600">
                      {paymentData.expiryDate}
                    </p>
                  </div>
                </div>

                {/* Place Order Button */}
                <div className="pt-6 border-t border-gray-200">
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:from-primary-600 hover:to-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {isLoading ? t('checkout.placingOrder') : t('checkout.placeOrder')}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <OrderSummary className="sticky top-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
