import { useQuery } from "@tanstack/react-query";
import { apiStockRepository } from "@/infra/repositories/ApiStockRepository";

export function useGetStockByComponent(componentId: string) {
  return useQuery({
    queryKey: ["stock", componentId],
    queryFn: () => apiStockRepository.getByComponentId(componentId),
    enabled: !!componentId,
  });
}