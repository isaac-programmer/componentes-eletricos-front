import { api } from "../services/api";
import { ComponentStockByLaboratory, Stock } from "@/domain/entities/stock";
import { AddStockDTO, ConsumeStockDTO, StockRepository, TransferStockDTO } from "@/domain/repositories/StockRepository";
import { handleApiError } from "../utils/handleApiError";

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


  async add(data: AddStockDTO): Promise<void> {
    try {
      await api.post("/transactions/add", data);
    } catch (error) {
      console.error("Erro ao adicionar quantidade do componente:", error);

      const errorMessage = handleApiError(error, "Não foi possível adicionar quantidade do componente");
      throw new Error(errorMessage);
    }
  }

  async consume(data: ConsumeStockDTO): Promise<void> {
    try {
      await api.post("/transactions/consume", data);
    } catch (error) {
      console.error("Erro ao consumir quantidade do componente:", error);

      const errorMessage = handleApiError(error, "Não foi possível consumir quantidade do componente");
      throw new Error(errorMessage);
    }
  }
  
  async transfer(data: TransferStockDTO): Promise<void> {
    try {
      await api.post("/transactions/transfer", data);
    } catch (error) {
      console.error("Erro ao transferir quantidade do componente:", error);

      const errorMessage = handleApiError(error, "Não foi possível transferir quantidade do componente");
      throw new Error(errorMessage);
    }
  }
}

export const apiStockRepository = new ApiStockRepository();