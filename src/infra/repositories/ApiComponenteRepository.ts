import { 
  GetAllComponentesResponse, 
  ComponenteRepository 
} from "@/domain/repositories/ComponenteRepository";
import { api } from "../services/api";
import { handleApiError } from "../utils/handleApiError";

class ApiComponenteRepository implements ComponenteRepository {
  
  async getAll(): Promise<GetAllComponentesResponse> {
    try {
      const response = await api.get<GetAllComponentesResponse>("/components");
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

export const apiComponenteRepository = new ApiComponenteRepository();