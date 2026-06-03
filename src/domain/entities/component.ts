import { ComponentOrigin } from "../enums/ComponentOrigin";

interface Category {
  id: string;
  name: string;
}

interface Laboratory {
  id: string;
  name: string;
}

export interface Component {
  id: string;
  name: string;
  reference: string;
  category: Category;
  laboratory?: Laboratory;
  description?: string;
  origin: ComponentOrigin;
  imageUrl?: string;
  categoryId: string;
  inactive: boolean;
  totalQuantity?: number;
  createdAt: Date;
  updatedAt: Date;
}