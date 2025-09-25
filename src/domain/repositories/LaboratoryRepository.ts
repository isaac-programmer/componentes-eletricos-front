import { Laboratory } from "@/domain/entities/laboratory";

interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface LaboratoryFilters {
  search?: string;
  name?: string;
}

export interface GetAllLaboratoriesResponse {
  data: Laboratory[];
  meta: PaginationMeta;
}

export interface LaboratoryRepository {
  getAll(filters?: LaboratoryFilters): Promise<GetAllLaboratoriesResponse>;
}