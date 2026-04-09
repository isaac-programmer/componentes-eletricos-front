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
  startDate?: string;
  endDate?: string;
}

export interface GetAllComponentsResponse {
  data: Component[];
  meta: PaginationMeta;
}

export interface ComponentReportItem {
  id: string;
  name: string;
  reference: string;
  description: string | null;
  stockAtStart: number;
  stockAtEnd: number;
  consumedInPeriod: number;
}

export interface GetComponentReportResponse {
  data: ComponentReportItem[];
  meta: PaginationMeta;
}

export interface ComponentRepository {
  getById(id: string): Promise<Component>;
  getAll(filters?: ComponentFilters): Promise<GetAllComponentsResponse>;
  getReport(filters?: ComponentFilters): Promise<GetComponentReportResponse>;
  create(data: ComponentFormData): Promise<Component>;
  update(id: string, data: ComponentFormData): Promise<Component>;
  delete(id: string): Promise<void>;
}