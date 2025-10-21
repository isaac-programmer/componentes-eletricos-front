import { apiUserRepository } from "@/infra/repositories/ApiUserRepository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserFormData } from "@/domain/schemas/userSchema";
import toast from "react-hot-toast";

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserFormData) => apiUserRepository.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["usuarios"] });
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