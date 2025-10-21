import { useQuery } from "@tanstack/react-query";
import { UserFilters } from "@/domain/repositories/UserRepository";
import { apiUserRepository } from "@/infra/repositories/ApiUserRepository";

export function useGetUsers(filters?: UserFilters) {
  return useQuery({
    queryKey: ["usuarios", filters],
    queryFn: () => apiUserRepository.getAll(filters),
  });
}