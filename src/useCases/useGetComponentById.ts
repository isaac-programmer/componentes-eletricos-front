import { useQuery } from "@tanstack/react-query";
import { apiComponentRepository } from "@/infra/repositories/ApiComponentRepository";

export function useGetComponentById(id: string) {
  return useQuery({
    queryKey: ["componente", id],
    queryFn: () => apiComponentRepository.getById(id),
    enabled: !!id,
  });
}