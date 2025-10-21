import { UserAuthentication } from "@/domain/entities/user";

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserAuthentication;
}

export interface RefreshToken {
  refreshToken: string;
}