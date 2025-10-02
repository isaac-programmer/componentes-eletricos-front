import { api } from "../services/api";
import { Category } from "@/domain/entities/category";
import { CategoryFilters, CategoryRepository, GetAllCategoriesResponse } from "@/domain/repositories/CategoryRepository";
import { handleApiError } from "../utils/handleApiError";
import { GetAllLaboratoriesResponse, LaboratoryFilters, LaboratoryRepository } from "@/domain/repositories/LaboratoryRepository";

class ApiLaboratoryRepository implements LaboratoryRepository {
  async getAll(filters: LaboratoryFilters = {}): Promise<GetAllLaboratoriesResponse> {
    try {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.append(key, value);
        }
      });

      const response = await api.get<GetAllLaboratoriesResponse>(`/laboratories?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar laboratórios:", error);

      const errorMessage = handleApiError(error, "Não foi possível carregar os laboratórios. Tente recarregar a página");
      throw new Error(errorMessage);
    }
  }
}

export const apiLaboratoryRepository = new ApiLaboratoryRepository();