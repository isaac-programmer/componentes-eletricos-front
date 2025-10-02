import { Category } from "@/domain/entities/category";

interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface CategoryFilters {
  search?: string;
  name?: string;
}

export interface GetAllCategoriesResponse {
  data: Category[];
  meta: PaginationMeta;
}

export interface CategoryRepository {
  getAll(filters?: CategoryFilters): Promise<GetAllCategoriesResponse>;
}