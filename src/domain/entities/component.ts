interface Category {
  id: string;
  name: string;
}

export interface Component {
  id: string;
  name: string;
  reference: string;
  category: Category;
  description?: string;
  origin: string;
  imageUrl?: string;
  categoryId: string;
  inactive: boolean;
  createdAt: Date;
  updatedAt: Date;
}