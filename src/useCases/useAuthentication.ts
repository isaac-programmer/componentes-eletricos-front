import { apiAuthenticationRepository } from "@/infra/repositories/ApiAuthenticationRepository";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginRequest } from "@/domain/schemas/authenticationSchema";
import toast from "react-hot-toast";

export function useAuthenticateSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => apiAuthenticationRepository.signIn(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authentication"] });
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