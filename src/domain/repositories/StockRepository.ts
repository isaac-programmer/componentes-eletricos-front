import { ComponentStockByLaboratory, Stock } from "../entities/stock";

export interface AddStockDTO { 
  componentId: string; 
  laboratoryDestinationId: string; 
  quantity: number; 
}

export interface ConsumeStockDTO { 
  componentId: string; 
  laboratoryOriginId: string; 
  quantity: number; 
  motive: string;
}

export interface TransferStockDTO { 
  componentId: string; 
  laboratoryOriginId: string; 
  laboratoryDestinationId: string; 
  quantity: number; 
}

export interface StockRepository {
  getStockComponent(): Promise<Stock[]>;
  getComponentStockByLaboratory(componentId: string): Promise<ComponentStockByLaboratory[]>;
  add(data: AddStockDTO): Promise<void>;
  consume(data: ConsumeStockDTO): Promise<void>;
  transfer(data: TransferStockDTO): Promise<void>;
}