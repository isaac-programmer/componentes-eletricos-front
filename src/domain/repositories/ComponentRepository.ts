import { Component } from "@/domain/entities/component";

interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface GetAllComponentsResponse {
  data: Component[];
  meta: PaginationMeta;
}

export interface ComponentRepository {
  getAll(search?: string): Promise<GetAllComponentsResponse>;
  delete(id: string): Promise<void>;
}