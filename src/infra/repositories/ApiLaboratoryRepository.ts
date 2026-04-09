import { api } from "../services/api";
import { handleApiError } from "../utils/handleApiError";
import { GetAllLaboratoriesResponse, LaboratoryFilters, LaboratoryRepository, LaboratoryFormData } from "@/domain/repositories/LaboratoryRepository";
import { Laboratory } from "@/domain/entities/laboratory";

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

      const errorMessage = handleApiError(error, "Não foi possível obter os laboratórios. Tente recarregar a página");
      throw new Error(errorMessage);
    }
  }

  async create(data: LaboratoryFormData): Promise<Laboratory> {
    try {
      const response = await api.post<Laboratory>("/laboratories", data);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar laboratório:", error);
      const errorMessage = handleApiError(error, "Não foi possível criar o laboratório. Tente novamente.");
      throw new Error(errorMessage);
    }
  }

  async update(id: string, data: Partial<LaboratoryFormData>): Promise<Laboratory> {
    try {
      const response = await api.patch<Laboratory>(`/laboratories/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar laboratório:", error);
      const errorMessage = handleApiError(error, "Não foi possível atualizar o laboratório. Tente novamente.");
      throw new Error(errorMessage);
    }
  }
  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/laboratories/${id}`);
    } catch (error) {
      console.error("Erro ao remover o laboratório:", error);

      const errorMessage = handleApiError(error, "Não foi possível remover o laboratório. Tente novamente.");
      throw new Error(errorMessage);
    }
  }
}

export const apiLaboratoryRepository = new ApiLaboratoryRepository();