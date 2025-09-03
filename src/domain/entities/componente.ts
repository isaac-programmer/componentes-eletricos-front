export interface Componente {
  id: string;
  name: string;
  reference: string;
  category: string;
  description?: string;
  origin: string;
  imageUrl?: string;
  categoryId: string;
  inactive: boolean;
  createdAt: Date;
  updatedAt: Date;
}