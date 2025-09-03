import { Componente } from "@/domain/entities/componente";

export interface GetAllComponentesResponse {
  data: Componente[];
}

export interface ComponenteRepository {
  getAll(): Promise<GetAllComponentesResponse>;
}