import { apiAuthRepository } from "@/infra/repositories/ApiAuthRepository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginRequest } from "@/domain/schemas/authenticateSchema";
import toast from "react-hot-toast";

export function useAuthenticate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => apiAuthRepository.signIn(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
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