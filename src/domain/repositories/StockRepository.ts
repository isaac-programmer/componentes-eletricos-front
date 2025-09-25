import { ComponentStockByLaboratory, Stock } from "../entities/stock";

export interface StockRepository {
  getStockComponent(): Promise<Stock[]>;
  getComponentStockByLaboratory(componentId: string): Promise<ComponentStockByLaboratory[]>;
}