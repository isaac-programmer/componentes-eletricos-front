import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiStockRepository } from "@/infra/repositories/ApiStockRepository";
import { AddStockDTO, ConsumeStockDTO, TransferStockDTO } from "@/domain/repositories/StockRepository";

export function useStockTransactions(componentId: string) {
  const queryClient = useQueryClient();

  const addStock = useMutation({
    mutationFn: (data: AddStockDTO) => apiStockRepository.add(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["component-stock-by-laboratory", componentId] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocorreu um erro desconhecido");
      }
    }
  });

  const consumeStock = useMutation({
    mutationFn: (data: ConsumeStockDTO) => apiStockRepository.consume(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["component-stock-by-laboratory", componentId] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocorreu um erro desconhecido");
      }
    }
  });

  const transferStock = useMutation({
    mutationFn: (data: TransferStockDTO) => apiStockRepository.transfer(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["component-stock-by-laboratory", componentId] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocorreu um erro desconhecido");
      }
    }
  });

  return { 
    addStock, 
    consumeStock, 
    transferStock 
  };
}