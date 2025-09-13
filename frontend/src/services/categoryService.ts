import api from './api';

export interface Category {
  id: number;
  name: string;
  description: string;
  products?: Product[];
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: number;
  brand?: string;
  flavor?: string;
}

export interface CreateCategoryDto {
  name: string;
  description: string;
}

export interface UpdateCategoryDto extends CreateCategoryDto {
  id: number;
}

export const categoryService = {
  // Get all categories
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Get category by ID
  getCategoryById: async (id: number): Promise<Category> => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  // Create new category
  createCategory: async (category: CreateCategoryDto): Promise<Category> => {
    const response = await api.post('/categories', category);
    return response.data;
  },

  // Update category
  updateCategory: async (id: number, category: CreateCategoryDto): Promise<Category> => {
    const response = await api.put(`/categories/${id}`, category);
    return response.data;
  },

  // Delete category
  deleteCategory: async (id: number): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },
};
