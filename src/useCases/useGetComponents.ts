import { useQuery } from "@tanstack/react-query";
import { ComponentFilters } from "@/domain/repositories/ComponentRepository";
import { apiComponentRepository } from "@/infra/repositories/ApiComponentRepository";

export function useGetComponents(filters?: ComponentFilters) {
  return useQuery({
    queryKey: ["componentes", filters],
    queryFn: () => apiComponentRepository.getAll(filters),
  });
}