import { 
  GetAllComponentsResponse, 
  ComponentRepository, 
  ComponentFilters
} from "@/domain/repositories/ComponentRepository";
import { api } from "../services/api";
import { handleApiError } from "../utils/handleApiError";
import { ComponentFormData } from "@/domain/schemas/componentSchema";
import { Component } from "@/domain/entities/component";

class ApiComponentRepository implements ComponentRepository {

  async getAll(filters: ComponentFilters = {}): Promise<GetAllComponentsResponse> {
    try {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.append(key, value);
        }
      });

      const response = await api.get<GetAllComponentsResponse>(`/components?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar componentes:", error);

      const errorMessage = handleApiError(error, "Não foi possível carregar os componentes. Tente recarregar a página");
      throw new Error(errorMessage);
    }
  }

  async create(data: ComponentFormData): Promise<Component> {
    const formData = new FormData();

    const { image, ...restOfData } = data;

    Object.entries(restOfData).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    if (image instanceof FileList && image.length > 0) {
      formData.append("image", image[0]);
    }

    try {
      const response = await api.post<Component>("/components", formData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao cadastrar componente:`, error);

      const errorMessage = handleApiError(error, "Não foi possível cadastrar o componente");
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