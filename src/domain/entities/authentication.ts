export interface AuthenticationTokens {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RefreshToken {
  refreshToken: string;
}