import { toast } from "react-hot-toast";
import { handleApiError } from "@/infra/utils/handleApiError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserFormData } from "@/domain/schemas/userSchema";
import { apiUserRepository } from "@/infra/repositories/ApiUserRepository";

interface UpdateParams {
  id: string;
  data: Partial<UserFormData>;
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateParams) => apiUserRepository.update(id, data),
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
      queryClient.setQueryData(["usuario", updatedUser.id], updatedUser);
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