import { 
    ComponenteRepository,
    GetAllComponentesResponse, 
} from "@/domain/repositories/ComponenteRepository";

class ApiComponenteRepository implements ComponenteRepository {
  private readonly baseUrl = process.env.NEXT_PUBLIC_API_URL;

  async getAll(): Promise<GetAllComponentesResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/components`);

      if (!response.ok) {
        throw new Error("Falha ao buscar os componentes");
      }

      const responseJson: GetAllComponentesResponse = await response.json();
      return responseJson;
    } catch (error) {
      console.error("Erro ao buscar componentes:", error);
      return { 
        data: [], 
        meta: { totalItems: 0, itemCount: 0, itemsPerPage: 10, totalPages: 1, currentPage: 1 } 
      };
    }
  }
}

export const apiComponenteRepository = new ApiComponenteRepository();