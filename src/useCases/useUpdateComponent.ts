import { toast } from "react-hot-toast";
import { handleApiError } from "@/infra/utils/handleApiError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ComponentFormData } from "@/domain/schemas/componentSchema";
import { apiComponentRepository } from "@/infra/repositories/ApiComponentRepository";

interface UpdateParams {
  id: string;
  data: Partial<ComponentFormData>;
}

export function useUpdateComponent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateParams) => apiComponentRepository.update(id, data),
    onSuccess: (updatedComponent) => {
      queryClient.invalidateQueries({ queryKey: ["componentes"] });
      queryClient.setQueryData(["componente", updatedComponent.id], updatedComponent);
    },
    onError: (error) => {
      const errorMessage = handleApiError(error, "Falha ao atualizar o componente");
      toast.error(errorMessage);
    }
  });
}