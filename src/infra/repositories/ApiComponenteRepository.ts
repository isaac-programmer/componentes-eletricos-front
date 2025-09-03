import { Componente } from "@/domain/entities/componente";
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

      const data: Componente[] = await response.json();
      return { data };
    } catch (error) {
      console.error("Erro ao buscar componentes:", error);
      return { data: [] };
    }
  }
}

export const apiComponenteRepository = new ApiComponenteRepository();