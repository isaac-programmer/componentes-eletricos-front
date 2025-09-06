import { Componente } from "@/domain/entities/componente";

interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface GetAllComponentesResponse {
  data: Componente[];
  meta: PaginationMeta;
}

export interface ComponenteRepository {
  getAll(): Promise<GetAllComponentesResponse>;
  delete(id: string): Promise<void>;
}