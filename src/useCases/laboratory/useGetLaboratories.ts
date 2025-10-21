import { useQuery } from "@tanstack/react-query";
import { LaboratoryFilters } from "@/domain/repositories/LaboratoryRepository";
import { apiLaboratoryRepository } from "@/infra/repositories/ApiLaboratoryRepository";

export function useGetLaboratories(filters?: LaboratoryFilters) {
  return useQuery({
    queryKey: ["laboratorios", filters],
    queryFn: () => apiLaboratoryRepository.getAll(filters),
  });
}