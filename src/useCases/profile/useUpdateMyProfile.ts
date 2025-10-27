import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateMyProfileFormData } from "@/domain/schemas/userSchema";
import { apiUserRepository } from "@/infra/repositories/ApiUserRepository";

interface UpdateParams {
  data: Partial<UpdateMyProfileFormData>;
}

export function useUpdateMyProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: UpdateParams) => apiUserRepository.updateMyProfile(data),
    onSuccess: (updatedProfile) => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.setQueryData(["profile"], updatedProfile);
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