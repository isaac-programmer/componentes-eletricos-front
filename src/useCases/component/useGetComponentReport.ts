import { useQuery } from "@tanstack/react-query";
import { apiComponentRepository } from "@/infra/repositories/ApiComponentRepository";

import { ComponentFilters } from "@/domain/repositories/ComponentRepository";

export function useGetComponentReport(filters?: ComponentFilters) {
  return useQuery({
    queryKey: ["component-report", filters],
    queryFn: () => apiComponentRepository.getReport(filters),
  });
}
