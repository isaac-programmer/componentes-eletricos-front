import { api } from "../services/api";
import { Stock } from "@/domain/entities/stock";
import { StockRepository } from "@/domain/repositories/StockRepository";

class ApiStockRepository implements StockRepository {
  async getByComponentId(componentId: string): Promise<Stock[]> {
    try {
      const response = await api.get<Stock[]>(`/stock/component/${componentId}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar estoque por componente:", error);
      return [];
    }
  }
}

export const apiStockRepository = new ApiStockRepository();