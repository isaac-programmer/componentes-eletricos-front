import { Component } from "@/domain/entities/component";

interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface ComponentFilters {
  search?: string;
  name?: string;
  reference?: string;
  origin?: string;
  categoryId?: string;
  laboratoryId?: string;
}

export interface GetAllComponentsResponse {
  data: Component[];
  meta: PaginationMeta;
}

export interface ComponentRepository {
  getAll(filters?: ComponentFilters): Promise<GetAllComponentsResponse>;
  delete(id: string): Promise<void>;
}