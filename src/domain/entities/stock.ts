export interface Stock {
  componentId: string;
  laboratoryId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ComponentStockByLaboratory {
  laboratoryId: string;
  laboratoryName: string;
  quantity: number;
}