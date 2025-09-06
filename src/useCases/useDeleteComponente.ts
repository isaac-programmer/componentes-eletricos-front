import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiComponenteRepository } from "@/infra/repositories/ApiComponenteRepository";

export function useDeleteComponente() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiComponenteRepository.delete(id),
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