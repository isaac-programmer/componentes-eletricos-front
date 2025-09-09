import { 
  GetAllComponentsResponse, 
  ComponentRepository 
} from "@/domain/repositories/ComponentRepository";
import { api } from "../services/api";
import { handleApiError } from "../utils/handleApiError";

class ApiComponentRepository implements ComponentRepository {

  async getAll(search?: string): Promise<GetAllComponentsResponse> {
    try {
      const params = new URLSearchParams();
      
      if (search) {
        params.append("search", search);
      }

      const response = await api.get<GetAllComponentsResponse>(`/components?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar componentes:", error);

      const errorMessage = handleApiError(error, "Não foi possível carregar os componentes. Tente recarregar a página");
      throw new Error(errorMessage);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/components/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar componente:`, error);
      
      const errorMessage = handleApiError(error, "Falha ao deletar componente. Tente novamente");
      throw new Error(errorMessage);
    }
  }
}

export const apiComponentRepository = new ApiComponentRepository();