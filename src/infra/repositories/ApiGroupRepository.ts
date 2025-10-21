import { api } from "../services/api";
import { GroupFilters, GroupRepository } from "@/domain/repositories/GroupRepository";
import { handleApiError } from "../utils/handleApiError";
import { Group } from "@/domain/entities/group";

class ApiGroupRepository implements GroupRepository {
  async getAll(filters: GroupFilters = {}): Promise<Group[]> {
    try {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.append(key, value);
        }
      });

      const response = await api.get<Group[]>(`/groups?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar grupos:", error);

      const errorMessage = handleApiError(error, "Não foi possível carregar os grupos. Tente recarregar a página");
      throw new Error(errorMessage);
    }
  }
}

export const apiGroupRepository = new ApiGroupRepository();