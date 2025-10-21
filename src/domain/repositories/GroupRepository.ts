import { Group } from "@/domain/entities/group";

interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface GroupFilters {
  search?: string;
  name?: string;
}

export interface GroupRepository {
  getAll(filters?: GroupFilters): Promise<Group[]>;
}