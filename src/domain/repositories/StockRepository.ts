import { ComponentStockByLaboratory, Stock } from "../entities/stock";

export interface AddStockDTO { 
  componentId: string; 
  laboratoryId: string; 
  quantity: number; 
}

export interface ConsumeStockDTO { 
  componentId: string; 
  laboratoryId: string; 
  quantity: number; 
}

export interface TransferStockDTO { 
  componentId: string; 
  fromLaboratoryId: string; 
  toLaboratoryId: string; 
  quantity: number; 
}

export interface StockRepository {
  getStockComponent(): Promise<Stock[]>;
  getComponentStockByLaboratory(componentId: string): Promise<ComponentStockByLaboratory[]>;
  add(data: AddStockDTO): Promise<void>;
  consume(data: ConsumeStockDTO): Promise<void>;
  transfer(data: TransferStockDTO): Promise<void>;
}