import { Stock } from "../entities/stock";

export interface StockRepository {
  getByComponentId(componentId: string): Promise<Stock[]>;
}