import axios from 'axios';

const API_BASE_URL = 'http://localhost:8082';

export interface CategoryDto {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

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
  },

  // Delete category
  deleteCategory: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/categories/${id}`);
  }
};
