import { useQuery } from "@tanstack/react-query";
import { apiComponenteRepository } from "@/infra/repositories/ApiComponenteRepository";

export function useGetComponentes() {
  return useQuery({
    queryKey: ['componentes'],
    queryFn: () => apiComponenteRepository.getAll(),
  });
}