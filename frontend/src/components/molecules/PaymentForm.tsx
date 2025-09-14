import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCreditCard, FaLock } from 'react-icons/fa';
import { PaymentInfo, ShippingAddress } from '../../services/orderApiService';

interface PaymentFormProps {
  initialData?: Partial<PaymentInfo>;
  shippingAddress: ShippingAddress;
  onSubmit: (data: PaymentInfo) => void;
  onBack?: () => void;
  isLoading?: boolean;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  initialData = {},
  shippingAddress,
  onSubmit,
  onBack,
  isLoading = false
}) => {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState<PaymentInfo>({
    cardNumber: initialData.cardNumber || '',
    expiryDate: initialData.expiryDate || '',
    cvv: initialData.cvv || '',
    cardholderName: initialData.cardholderName || '',
    billingAddress: initialData.billingAddress || shippingAddress,
  });

  const [errors, setErrors] = useState<Partial<PaymentInfo>>({});
  const [useSameAddress, setUseSameAddress] = useState(true);

  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentInfo> = {};

    // Card number validation (basic)
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = t('checkout.validation.cardNumberRequired');
    } else if (formData.cardNumber.replace(/\s/g, '').length < 13) {
      newErrors.cardNumber = t('checkout.validation.cardNumberInvalid');
    }

    // Expiry date validation
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = t('checkout.validation.expiryDateRequired');
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = t('checkout.validation.expiryDateInvalid');
    }

    // CVV validation
    if (!formData.cvv.trim()) {
      newErrors.cvv = t('checkout.validation.cvvRequired');
    } else if (formData.cvv.length < 3) {
      newErrors.cvv = t('checkout.validation.cvvInvalid');
    }

    // Cardholder name validation
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = t('checkout.validation.cardholderNameRequired');
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

  const handleInputChange = (field: keyof PaymentInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    handleInputChange('cardNumber', formatted);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    handleInputChange('expiryDate', formatted);
  };

  const handleUseSameAddressChange = (checked: boolean) => {
    setUseSameAddress(checked);
    if (checked) {
      setFormData(prev => ({ ...prev, billingAddress: shippingAddress }));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        {t('checkout.paymentInformation')}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card Information */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-4">
            <FaCreditCard className="text-primary-500" />
            <span className="font-medium text-gray-900">{t('checkout.cardDetails')}</span>
          </div>

          {/* Card Number */}
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
              {t('checkout.cardNumber')} *
            </label>
            <input
              type="text"
              id="cardNumber"
              value={formData.cardNumber}
              onChange={handleCardNumberChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                errors.cardNumber ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
            {errors.cardNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
            )}
          </div>

          {/* Expiry Date and CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                {t('checkout.expiryDate')} *
              </label>
              <input
                type="text"
                id="expiryDate"
                value={formData.expiryDate}
                onChange={handleExpiryDateChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                  errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="MM/YY"
                maxLength={5}
              />
              {errors.expiryDate && (
                <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
              )}
            </div>

            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                {t('checkout.cvv')} *
              </label>
              <input
                type="text"
                id="cvv"
                value={formData.cvv}
                onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                  errors.cvv ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="123"
                maxLength={4}
              />
              {errors.cvv && (
                <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
              )}
            </div>
          </div>

          {/* Cardholder Name */}
          <div className="mt-4">
            <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-2">
              {t('checkout.cardholderName')} *
            </label>
            <input
              type="text"
              id="cardholderName"
              value={formData.cardholderName}
              onChange={(e) => handleInputChange('cardholderName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors ${
                errors.cardholderName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder={t('checkout.cardholderNamePlaceholder')}
            />
            {errors.cardholderName && (
              <p className="mt-1 text-sm text-red-600">{errors.cardholderName}</p>
            )}
          </div>
        </div>

        {/* Billing Address */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              id="useSameAddress"
              checked={useSameAddress}
              onChange={(e) => handleUseSameAddressChange(e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor="useSameAddress" className="text-sm font-medium text-gray-700">
              {t('checkout.useSameBillingAddress')}
            </label>
          </div>

          {!useSameAddress && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
              <h4 className="font-medium text-gray-900">{t('checkout.billingAddress')}</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('checkout.firstName')} *
                  </label>
                  <input
                    type="text"
                    value={formData.billingAddress.firstName}
                    onChange={(e) => handleInputChange('billingAddress', {
                      ...formData.billingAddress,
                      firstName: e.target.value
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('checkout.lastName')} *
                  </label>
                  <input
                    type="text"
                    value={formData.billingAddress.lastName}
                    onChange={(e) => handleInputChange('billingAddress', {
                      ...formData.billingAddress,
                      lastName: e.target.value
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('checkout.address')} *
                </label>
                <input
                  type="text"
                  value={formData.billingAddress.address}
                  onChange={(e) => handleInputChange('billingAddress', {
                    ...formData.billingAddress,
                    address: e.target.value
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('checkout.city')} *
                  </label>
                  <input
                    type="text"
                    value={formData.billingAddress.city}
                    onChange={(e) => handleInputChange('billingAddress', {
                      ...formData.billingAddress,
                      city: e.target.value
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('checkout.state')} *
                  </label>
                  <input
                    type="text"
                    value={formData.billingAddress.state}
                    onChange={(e) => handleInputChange('billingAddress', {
                      ...formData.billingAddress,
                      state: e.target.value
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('checkout.zipCode')} *
                  </label>
                  <input
                    type="text"
                    value={formData.billingAddress.zipCode}
                    onChange={(e) => handleInputChange('billingAddress', {
                      ...formData.billingAddress,
                      zipCode: e.target.value
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Security Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-green-700">
            <FaLock className="text-sm" />
            <span className="text-sm font-medium">
              {t('checkout.securePayment')}
            </span>
          </div>
          <p className="text-xs text-green-600 mt-1">
            {t('checkout.securePaymentDescription')}
          </p>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors duration-300"
            >
              {t('common.back')}
            </button>
          )}
          
          <button
            type="submit"
            disabled={isLoading}
            className="ml-auto bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
          >
            {isLoading ? t('checkout.processing') : t('checkout.placeOrder')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
