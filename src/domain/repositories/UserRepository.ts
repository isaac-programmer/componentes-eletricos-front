import { User } from "@/domain/entities/user";
import { UserFormData } from "../schemas/userSchema";

interface PaginationMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface UserFilters {
  search?: string;
  name?: string;
  cpf?: string;
  email?: string;
  phone?: string;
  groupId?: string;
  laboratoryId?: string;
  page?: number;
  limit?: number;
}

export interface GetAllUsersResponse {
  data: User[];
  meta: PaginationMeta;
}

export interface UserRepository {
  getById(id: string): Promise<User>;
  getAll(filters?: UserFilters): Promise<GetAllUsersResponse>;
  create(data: UserFormData): Promise<User>;
  update(id: string, data: UserFormData): Promise<User>;
  delete(id: string): Promise<void>;
}