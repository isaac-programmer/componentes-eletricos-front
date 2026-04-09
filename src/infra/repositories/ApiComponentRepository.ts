import { 
  GetAllComponentsResponse, 
  ComponentRepository, 
  ComponentFilters,
  ComponentReportItem,
  GetComponentReportResponse
} from "@/domain/repositories/ComponentRepository";
import { api } from "../services/api";
import { handleApiError } from "../utils/handleApiError";
import { ComponentFormData } from "@/domain/schemas/componentSchema";
import { Component } from "@/domain/entities/component";

class ApiComponentRepository implements ComponentRepository {
  async getById(id: string): Promise<Component> {
    try {
      const response = await api.get<Component>(`/components/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar componente:", error);

      const errorMessage = handleApiError(error, "Não foi possível encontrar o componente");
      throw new Error(errorMessage);
    }
  }

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

      const errorMessage = handleApiError(error, "Não foi possível obter os componentes. Tente recarregar a página");
      throw new Error(errorMessage);
    }
  }

  async getReport(filters?: ComponentFilters): Promise<GetComponentReportResponse> {
    try {
      const params = new URLSearchParams();
      if (filters?.startDate) params.append("startDate", filters.startDate);
      if (filters?.endDate) params.append("endDate", filters.endDate);
      if (filters?.search) params.append("search", filters.search);
      if (filters?.page) params.append("page", filters.page.toString());
      if (filters?.limit) params.append("limit", filters.limit.toString());

      const response = await api.get<GetComponentReportResponse>(`/reports/components?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar relatório de componentes:", error);
      const errorMessage = handleApiError(error, "Não foi possível carregar o relatório.");
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

  async update(id: string, data: Partial<ComponentFormData>): Promise<Component> {
    const formData = new FormData();

    const { image, ...restOfData } = data;

    Object.entries(restOfData).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value as any);
      }
    });

    if (image instanceof FileList && image.length > 0) {
      formData.append("image", image[0]);
    }

    try {
      const response = await api.patch<Component>(`/components/${id}`, formData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar componente:`, error);

      const errorMessage = handleApiError(error, "Não foi possível atualizar o componente");
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