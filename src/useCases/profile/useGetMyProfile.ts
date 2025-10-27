import { useQuery } from "@tanstack/react-query";
import { apiUserRepository } from "@/infra/repositories/ApiUserRepository";

export function useGetMyProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => apiUserRepository.getMyProfile(),
  });
}