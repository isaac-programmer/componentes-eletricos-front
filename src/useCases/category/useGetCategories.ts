import { useQuery } from "@tanstack/react-query";
import { apiCategoryRepository } from "@/infra/repositories/ApiCategoryRepository";
import { CategoryFilters } from "@/domain/repositories/CategoryRepository";

export function useGetCategories(filters?: CategoryFilters) {
  return useQuery({
    queryKey: ["categorias", filters],
    queryFn: () => apiCategoryRepository.getAll(filters),
  });
}