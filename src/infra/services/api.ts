import axios from "axios";
import { getCookie as getCookieValue} from "cookies-next";
import { removeCookie, setCookie } from "../utils/cookies";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const cookieTokenKey: string = process.env.NEXT_PUBLIC_TOKEN_KEY as string;

  const tokenCookie = getCookieValue(cookieTokenKey) as string | undefined;

  if (!tokenCookie) {
    return config;
  }

  try {
    const data = JSON.parse(tokenCookie);
    const token = decodeURIComponent(data?.value);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Erro ao fazer parse do cookie de token:", error);
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalConfig = error.config;

    const tokenCookieKey = "inventario.token";
    const refreshTokenCookieKey = "inventario.refreshToken";

    const refreshTokenCookie = await getCookieValue(refreshTokenCookieKey);

    if (!refreshTokenCookie) {
      return Promise.reject(error);
    }

    try {
      const refreshTokenData = JSON.parse(refreshTokenCookie);
      const refreshToken = decodeURIComponent(refreshTokenData?.value);

      if (
        error?.response?.status === 401 &&
        !originalConfig._retry &&
        refreshToken
      ) {
        originalConfig._retry = true;

        try {
          const response = await api.post("/auth/refresh-token", {
            refreshToken: refreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } = response.data;
          
          setCookie({ key: tokenCookieKey as string, value: accessToken, expires: 1/60 });
          setCookie({ key: refreshTokenCookieKey, value: newRefreshToken, expires: 3/60 });

          api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
          originalConfig.headers["Authorization"] = `Bearer ${accessToken}`;

          return api(originalConfig);
        } catch (refreshError) {
          console.error("Falha ao renovar o token:", refreshError);

          removeCookie(tokenCookieKey);
          removeCookie(refreshTokenCookieKey);

          window.location.replace("/login");
          
          return Promise.reject(refreshError);
        }
      }
    } catch (parseError) {
      console.error("Erro ao fazer parse do cookie de refresh token:", parseError);
    }

    return Promise.reject(error);
  }
);