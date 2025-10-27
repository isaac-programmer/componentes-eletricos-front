import { 
  GetAllUsersResponse, 
  UserRepository, 
  UserFilters
} from "@/domain/repositories/UserRepository";
import { api } from "../services/api";
import { handleApiError } from "../utils/handleApiError";
import { ChangePasswordData, UpdateMyProfileFormData, UserFormData } from "@/domain/schemas/userSchema";
import { User } from "@/domain/entities/user";

class ApiUserRepository implements UserRepository {
  async getById(id: string): Promise<User> {
    try {
      const response = await api.get<User>(`/admin/users/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);

      const errorMessage = handleApiError(error, "Não foi possível encontrar o usuário");
      throw new Error(errorMessage);
    }
  }

  async getMyProfile(): Promise<User> {
    try {
      const response = await api.get<User>(`/profile`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar o perfil:", error);

      const errorMessage = handleApiError(error, "Não foi possível encontrar o perfil");
      throw new Error(errorMessage);
    }
  }

  async updateMyProfile(data: Partial<UpdateMyProfileFormData>): Promise<User> {
    const formData = new FormData();

    const { 
      avatar,
      email,
      phone,
      newPassword,
      confirmPassword,
      ...restOfData
    } = data;

    Object.entries(restOfData).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value as any);
      }
    });

    if (email) {
      formData.append("emails", JSON.stringify([email]));
    }

    if (phone) {
      formData.append("phones", JSON.stringify([phone]));
    }

    if (avatar instanceof FileList && avatar.length > 0) {
      formData.append("avatar", avatar[0]);
    }

    try {
      const response = await api.patch<User>(`/profile`, formData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar o perfil:`, error);

      const errorMessage = handleApiError(error, "Não foi possível atualizar o seu perfil");
      throw new Error(errorMessage);
    }
  }

  async changeMyPassword(data: ChangePasswordData): Promise<void> {
    try {
      await api.patch('/profile/change-password', data);
    } catch (error) {
      console.error(`Erro ao alterar senha:`, error);

      const errorMessage = handleApiError(error, "Não foi possível alterar a senha");
      throw new Error(errorMessage);
    }
  }

  async getAll(filters: UserFilters = {}): Promise<GetAllUsersResponse> {
    try {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.append(key, value);
        }
      });

      const response = await api.get<GetAllUsersResponse>(`/admin/users?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);

      const errorMessage = handleApiError(error, "Não foi possível carregar os usuários. Tente recarregar a página");
      throw new Error(errorMessage);
    }
  }

  async create(data: UserFormData): Promise<User> {
    const formData = new FormData();

    const { 
      avatar, 
      confirmPassword,
      email,
      phone,
      ...restOfData 
    } = data;

    Object.entries(restOfData).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    if (email) {
      formData.append("emails", JSON.stringify([email]));
    }
    if (phone) {
      formData.append("phones", JSON.stringify([phone]));
    }

    if (avatar instanceof FileList && avatar.length > 0) {
      formData.append("avatar", avatar[0]);
    }

    try {
      const response = await api.post<User>("/admin/users", formData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao cadastrar usuário:`, error);

      const errorMessage = handleApiError(error, "Não foi possível cadastrar o usuário");
      throw new Error(errorMessage);
    }
  }

  async update(id: string, data: Partial<UserFormData>): Promise<User> {
    const formData = new FormData();

    const { 
      avatar,
      email,
      phone,
      ...restOfData
    } = data;

    Object.entries(restOfData).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value as any);
      }
    });

    if (email) {
      formData.append("emails", JSON.stringify([email]));
    }
    if (phone) {
      formData.append("phones", JSON.stringify([phone]));
    }

    if (avatar instanceof FileList && avatar.length > 0) {
      formData.append("avatar", avatar[0]);
    }

    try {
      const response = await api.patch<User>(`/admin/users/${id}`, formData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar usuário:`, error);

      const errorMessage = handleApiError(error, "Não foi possível atualizar o usuário");
      throw new Error(errorMessage);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/admin/users/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar usuário:`, error);

      const errorMessage = handleApiError(error, "Falha ao deletar usuário. Tente novamente");
      throw new Error(errorMessage);
    }
  }
}

export const apiUserRepository = new ApiUserRepository();