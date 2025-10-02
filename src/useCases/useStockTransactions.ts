import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiStockRepository } from "@/infra/repositories/ApiStockRepository";
import { AddStockDTO, ConsumeStockDTO, TransferStockDTO } from "@/domain/repositories/StockRepository";
import { handleApiError } from "@/infra/utils/handleApiError";

export function useStockTransactions(componentId: string) {
  const queryClient = useQueryClient();

  const addStock = useMutation({
    mutationFn: (data: AddStockDTO) => apiStockRepository.add(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stock", componentId] });
    },
    onError: (error) => {
      const errorMessage = handleApiError(error, "Falha ao adicionar quantidade do componente");
      toast.error(errorMessage);
    }
  });

  const consumeStock = useMutation({
    mutationFn: (data: ConsumeStockDTO) => apiStockRepository.consume(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stock", componentId] });
    },
    onError: (error: any) => {
      const errorMessage = handleApiError(error, "Falha ao consumir quantidade do componente");
      toast.error(errorMessage);
    }
  });

  const transferStock = useMutation({
    mutationFn: (data: TransferStockDTO) => apiStockRepository.transfer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stock", componentId] });
    },
    onError: (error: any) => {
      const errorMessage = handleApiError(error, "Falha ao transferir quantidade do componente");
      toast.error(errorMessage);
    }
  });

  return { 
    addStock, 
    consumeStock, 
    transferStock 
  };
}