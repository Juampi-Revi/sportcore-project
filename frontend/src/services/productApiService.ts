import axios from 'axios';

const API_BASE_URL = 'http://localhost:8082';

// Product interfaces
export interface ProductDto {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  brand: string;
  flavor?: string;
  images?: ProductImageDto[];
}

export interface ProductImageDto {
  id?: number;
  url: string;
  altText?: string;
}

export interface CategoryDto {
  id: number;
  name: string;
  description?: string;
}

// Pagination interfaces
export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string;
}

// Product API functions
export const productApiService = {
  // Get all products
  getAllProducts: async (): Promise<ProductDto[]> => {
    const response = await axios.get(`${API_BASE_URL}/products/all`);
    return response.data;
  },

  // Get products with pagination
  getProductsPaginated: async (params: PaginationParams = {}): Promise<PaginatedResponse<ProductDto>> => {
    const { page = 0, size = 10, sort } = params;
    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });
    
    if (sort) {
      queryParams.append('sort', sort);
    }
    
    const response = await axios.get(`${API_BASE_URL}/products?${queryParams.toString()}`);
    return response.data;
  },

  // Get product by ID
  getProductById: async (id: number): Promise<ProductDto> => {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  },

  // Create new product
  createProduct: async (product: Omit<ProductDto, 'id'>): Promise<ProductDto> => {
    const response = await axios.post(`${API_BASE_URL}/products`, product);
    return response.data;
  },

  // Update product
  updateProduct: async (id: number, product: Partial<ProductDto>): Promise<ProductDto> => {
    const response = await axios.put(`${API_BASE_URL}/products/${id}`, product);
    return response.data;
  },

  // Delete product
  deleteProduct: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/products/${id}`);
  },

  // Search products
  searchProducts: async (name: string): Promise<ProductDto[]> => {
    const response = await axios.get(`${API_BASE_URL}/products/search?name=${encodeURIComponent(name)}`);
    return response.data;
  },

  // Get random products
  getRandomProducts: async (limit: number = 10): Promise<ProductDto[]> => {
    const response = await axios.get(`${API_BASE_URL}/products/random?limit=${limit}`);
    return response.data;
  },

  // Get products by category
  getProductsByCategory: async (categoryId: number): Promise<ProductDto[]> => {
    const response = await axios.get(`${API_BASE_URL}/products/category/${categoryId}`);
    return response.data;
  }
};

// Category API functions
export const categoryApiService = {
  // Get all categories
  getAllCategories: async (): Promise<CategoryDto[]> => {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  },

  // Get category by ID
  getCategoryById: async (id: number): Promise<CategoryDto> => {
    const response = await axios.get(`${API_BASE_URL}/categories/${id}`);
    return response.data;
  }
};
