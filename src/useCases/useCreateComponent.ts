import { apiComponentRepository } from "@/infra/repositories/ApiComponentRepository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ComponentFormData } from "@/domain/schemas/componentSchema";

export function useCreateComponent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ComponentFormData) => apiComponentRepository.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["componentes"] });
    },
  });
}