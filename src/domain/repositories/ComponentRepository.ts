import { Component } from "@/domain/entities/component";
import { ComponentFormData } from "../schemas/componentSchema";

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
  page?: number;
  limit?: number;
}

export interface GetAllComponentsResponse {
  data: Component[];
  meta: PaginationMeta;
}

export interface ComponentRepository {
  getById(id: string): Promise<Component>;
  getAll(filters?: ComponentFilters): Promise<GetAllComponentsResponse>;
  create(data: ComponentFormData): Promise<Component>;
  update(id: string, data: ComponentFormData): Promise<Component>;
  delete(id: string): Promise<void>;
}