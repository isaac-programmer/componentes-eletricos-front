import { useQuery } from "@tanstack/react-query";
import { apiStockRepository } from "@/infra/repositories/ApiStockRepository";

export function useGetComponentStockByLaboratory(componentId: string) {
  return useQuery({
    queryKey: ["component-stock-by-laboratory", componentId],
    queryFn: () => apiStockRepository.getComponentStockByLaboratory(componentId),
    enabled: !!componentId,
  });
}