import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiLaboratoryRepository } from "@/infra/repositories/ApiLaboratoryRepository";
import { toast } from "react-hot-toast";

export function useDeleteLaboratory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => apiLaboratoryRepository.delete(id),
    onSuccess: () => {
      toast.success("Laboratório removido com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["laboratorios"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
