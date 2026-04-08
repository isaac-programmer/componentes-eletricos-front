import { api } from "../services/api";
import { CategoryFilters, CategoryRepository, GetAllCategoriesResponse } from "@/domain/repositories/CategoryRepository";
import { handleApiError } from "../utils/handleApiError";

class ApiCategoryRepository implements CategoryRepository {
  async getAll(filters: CategoryFilters = {}): Promise<GetAllCategoriesResponse> {
    try {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.append(key, value);
        }
      });

      const response = await api.get<GetAllCategoriesResponse>(`/categories?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);

      const errorMessage = handleApiError(error, "Não foi possível obter as categorias. Tente recarregar a página");
      throw new Error(errorMessage);
    }
  }
}

export const apiCategoryRepository = new ApiCategoryRepository();