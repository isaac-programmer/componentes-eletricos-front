import { api } from "../services/api";
import { AuthTokens } from "@/domain/entities/auth";
import { handleApiError } from "../utils/handleApiError";
import { LoginRequest } from "@/domain/schemas/authenticateSchema";

class ApiAuthRepository {
  async signIn(data: LoginRequest): Promise<AuthTokens> {
    try {
      const response = await api.post<AuthTokens>("/auth/login", data);
      return response.data;
    } catch (error) {
      console.error("Erro ao realizar login:", error);

      const errorMessage = handleApiError(error, "Não foi possível realizar o login. Confira suas credenciais e tente novamente");
      throw new Error(errorMessage);
    }
  }
}

export const apiAuthRepository = new ApiAuthRepository();