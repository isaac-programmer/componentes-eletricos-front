import { useQuery } from "@tanstack/react-query";
import { apiUserRepository } from "@/infra/repositories/ApiUserRepository";

export function useGetUserById(id: string) {
  return useQuery({
    queryKey: ["usuario", id],
    queryFn: () => apiUserRepository.getById(id),
    enabled: !!id,
  });
}