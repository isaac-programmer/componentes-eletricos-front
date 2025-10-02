import { apiComponentRepository } from "@/infra/repositories/ApiComponentRepository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ComponentFormData } from "@/domain/schemas/componentSchema";
import toast from "react-hot-toast";

export function useCreateComponent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ComponentFormData) => apiComponentRepository.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["componentes"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocorreu um erro desconhecido");
      }
    }
  });
}