import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiLaboratoryRepository } from "@/infra/repositories/ApiLaboratoryRepository";
import { toast } from "react-hot-toast";
import { LaboratoryFormData } from "@/domain/repositories/LaboratoryRepository";

export function useCreateLaboratory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LaboratoryFormData) => apiLaboratoryRepository.create(data),
    onSuccess: () => {
      toast.success("Laboratório criado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["laboratorios"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocorreu um erro desconhecido");
      }
    },
  });
}
