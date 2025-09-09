import { useQuery } from "@tanstack/react-query";
import { apiComponentRepository } from "@/infra/repositories/ApiComponentRepository";

export function useGetComponents(search?: string) {
  return useQuery({
    queryKey: ["componentes", search],
    queryFn: () => apiComponentRepository.getAll(search),
  });
}