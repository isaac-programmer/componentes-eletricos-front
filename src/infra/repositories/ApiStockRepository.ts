import { api } from "../services/api";
import { ComponentStockByLaboratory, Stock } from "@/domain/entities/stock";
import { StockRepository } from "@/domain/repositories/StockRepository";

class ApiStockRepository implements StockRepository {
  async getStockComponent(): Promise<Stock[]> {
    try {
      const response = await api.get<Stock[]>("/stock");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar estoque de componentes:", error);
      return [];
    }
  }

   async getComponentStockByLaboratory(componentId: string): Promise<ComponentStockByLaboratory[]> {
    try {
      const response = await api.get<ComponentStockByLaboratory[]>("/stock/by-laboratory", {
        params: { componentId }
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar estoque de componente por laboratório:", error);
      return [];
    }
  }
}

export const apiStockRepository = new ApiStockRepository();