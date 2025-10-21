import { useQuery } from "@tanstack/react-query";
import { apiGroupRepository } from "@/infra/repositories/ApiGroupRepository";
import { GroupFilters } from "@/domain/repositories/GroupRepository";

export function useGetGroups(filters?: GroupFilters) {
  return useQuery({
    queryKey: ["grupos", filters],
    queryFn: () => apiGroupRepository.getAll(filters),
  });
}