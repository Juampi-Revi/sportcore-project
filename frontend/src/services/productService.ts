import api from './api';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  brand?: string;
  flavor?: string;
  images?: ProductImage[];
}

export interface ProductImage {
  id: number;
  url: string;
  altText?: string;
  isPrimary: boolean;
  productId: number;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  brand?: string;
  flavor?: string;
}

export interface UpdateProductDto extends CreateProductDto {
  id: number;
}

export interface ProductResponse {
  content: Product[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export const productService = {
  // Get all products with pagination
  getProducts: async (page: number = 0, size: number = 10): Promise<ProductResponse> => {
    const response = await api.get(`/products?page=${page}&size=${size}`);
    return response.data;
  },

  // Get all products (for admin)
  getAllProducts: async (): Promise<Product[]> => {
    const response = await api.get('/products/all');
    return response.data;
  },

  // Get product by ID
  getProductById: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Get random products (for home page)
  getRandomProducts: async (limit: number = 10): Promise<Product[]> => {
    const response = await api.get(`/products/random?limit=${limit}`);
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (categoryId: number): Promise<Product[]> => {
    const response = await api.get(`/products/category/${categoryId}`);
    return response.data;
  },

  // Search products by name
  searchProducts: async (name: string): Promise<Product[]> => {
    const response = await api.get(`/products/search?name=${encodeURIComponent(name)}`);
    return response.data;
  },

  // Create new product
  createProduct: async (product: CreateProductDto): Promise<Product> => {
    const response = await api.post('/products', product);
    return response.data;
  },

  // Update product
  updateProduct: async (id: number, product: CreateProductDto): Promise<Product> => {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
  },

  // Delete product
  deleteProduct: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};
