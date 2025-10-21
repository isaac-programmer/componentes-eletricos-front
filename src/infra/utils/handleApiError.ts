import { apiErrorSchema } from "@/domain/types/api-error";
import { AxiosError } from "axios";

export function handleApiError(error: unknown, genericMessage: string): string {
  if (error instanceof AxiosError && error.response) {
    const parsed = apiErrorSchema.safeParse(error.response.data);

    if (parsed.success) {
      const apiError = parsed.data;
      
      return Array.isArray(apiError.message) ? apiError.message[0] : apiError.message;
    }
  }
  
  return genericMessage;
}