import axios from 'axios';

const API_BASE_URL = 'http://localhost:8082';

// Order interfaces
export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  billingAddress: ShippingAddress;
}

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface CreateOrderRequest {
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentInfo: PaymentInfo;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface OrderResponse {
  id: number;
  orderNumber: string;
  status: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  createdAt: string;
  estimatedDelivery: string;
}

export const orderApiService = {
  // Create a new order
  createOrder: async (orderData: CreateOrderRequest): Promise<OrderResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/orders`, orderData);
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Get order by ID
  getOrderById: async (orderId: number): Promise<OrderResponse> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  // Get orders by user (for future use)
  getUserOrders: async (userId: number): Promise<OrderResponse[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  },

  // Validate payment (mock implementation)
  validatePayment: async (paymentInfo: PaymentInfo): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - in real app, this would call a payment processor
      const isValid = paymentInfo.cardNumber.length >= 13 && 
                     paymentInfo.expiryDate.length === 5 && 
                     paymentInfo.cvv.length >= 3;
      
      return isValid;
    } catch (error) {
      console.error('Error validating payment:', error);
      return false;
    }
  }
};
