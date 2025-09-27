import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiStockRepository } from "@/infra/repositories/ApiStockRepository";
import { AddStockDTO, ConsumeStockDTO, TransferStockDTO } from "@/domain/repositories/StockRepository";

export function useStockTransactions(componentId: string) {
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["stock", componentId] });
    toast.success("Operação realizada com sucesso!");
  };

  const onError = (error: any) => {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("Ocorreu um erro desconhecido.");
    }
  };

  const addStock = useMutation({
    mutationFn: (data: AddStockDTO) => apiStockRepository.add(data),
    onSuccess,
    onError,
  });

  const consumeStock = useMutation({
    mutationFn: (data: ConsumeStockDTO) => apiStockRepository.consume(data),
    onSuccess,
    onError,
  });

  const transferStock = useMutation({
    mutationFn: (data: TransferStockDTO) => apiStockRepository.transfer(data),
    onSuccess,
    onError,
  });

  return { 
    addStock, 
    consumeStock, 
    transferStock 
  };
}