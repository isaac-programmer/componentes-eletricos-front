import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiComponentRepository } from "@/infra/repositories/ApiComponentRepository";

export function useDeleteComponent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiComponentRepository.delete(id),
    onSuccess: () => {
      toast.success("Componente excluído com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["componentes"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocorreu um erro desconhecido.");
      }
    }
  });
}