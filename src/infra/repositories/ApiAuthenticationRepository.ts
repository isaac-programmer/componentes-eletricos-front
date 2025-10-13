import { api } from "../services/api";
import { LoginResponse } from "@/domain/entities/authentication";
import { handleApiError } from "../utils/handleApiError";
import { LoginRequest } from "@/domain/schemas/authenticationSchema";

class ApiAuthenticationRepository {
  async signIn(data: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>("/auth/login", data);
      return response.data;
    } catch (error) {
      console.error("Erro ao realizar login:", error);

      const errorMessage = handleApiError(error, "Não foi possível realizar o login. Confira suas credenciais e tente novamente");
      throw new Error(errorMessage);
    }
  }
}

export const apiAuthenticationRepository = new ApiAuthenticationRepository();