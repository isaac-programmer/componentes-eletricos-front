export interface Laboratory {
  id: string;
  name: string;
  inactive: boolean;
  componentCount?: number;
  createdAt: Date;
  updatedAt: Date;
}