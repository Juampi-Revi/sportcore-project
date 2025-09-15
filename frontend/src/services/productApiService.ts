import axios from 'axios';

const API_BASE_URL = 'http://localhost:8082';

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

export const productApiService = {
  getAllProducts: async (): Promise<ProductDto[]> => {
    const response = await axios.get(`${API_BASE_URL}/products/all`);
    return response.data;
  },

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

  getProductById: async (id: number): Promise<ProductDto> => {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  },

  createProduct: async (product: Omit<ProductDto, 'id'>): Promise<ProductDto> => {
    const response = await axios.post(`${API_BASE_URL}/products`, product);
    return response.data;
  },

  updateProduct: async (id: number, product: Partial<ProductDto>): Promise<ProductDto> => {
    const response = await axios.put(`${API_BASE_URL}/products/${id}`, product);
    return response.data;
  },

  deleteProduct: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/products/${id}`);
  },

  searchProducts: async (name: string): Promise<ProductDto[]> => {
    const response = await axios.get(`${API_BASE_URL}/products/search?name=${encodeURIComponent(name)}`);
    return response.data;
  },

  getRandomProducts: async (limit: number = 10): Promise<ProductDto[]> => {
    const response = await axios.get(`${API_BASE_URL}/products/random?limit=${limit}`);
    return response.data;
  },

  getProductsByCategory: async (categoryId: number): Promise<ProductDto[]> => {
    const response = await axios.get(`${API_BASE_URL}/products/category/${categoryId}`);
    return response.data;
  }
};

export const categoryApiService = {
  getAllCategories: async (): Promise<CategoryDto[]> => {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  },

  getCategoryById: async (id: number): Promise<CategoryDto> => {
    const response = await axios.get(`${API_BASE_URL}/categories/${id}`);
    return response.data;
  }
};
