"use client"

import { api } from "@/infra/services/api";
import {
    createContext,
    Dispatch,
    ReactNode,
    useContext,
    useEffect,
    useState
} from "react";
import { useRouter } from "next/navigation";
import { getCookie as getCookieValue } from "cookies-next";
import { apiAuthenticationRepository } from "@/infra/repositories/ApiAuthenticationRepository";
import { removeCookie, setCookie } from "@/infra/utils/cookies";
import { LoginRequest } from "@/domain/schemas/authenticationSchema";
import toast from "react-hot-toast";

interface AuthenticationContextType {
    user: User | null;
    signIn: (credentials: LoginRequest) => Promise<void>;
    signOut: () => void;
    isLoading: boolean;
    setIsLoading: Dispatch<React.SetStateAction<boolean>>;
}

const AuthenticationContext = createContext<AuthenticationContextType | undefined>(undefined);

export function AuthenticationProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const signIn = async (data: LoginRequest) => {
        try {
            const { accessToken, refreshToken, user: userData } = await apiAuthenticationRepository.signIn(data);

            setUser(userData);

            const tokenCookieKey = "inventario.token";
            const refreshTokenCookieKey = "inventario.refreshToken";

            setCookie({ key: tokenCookieKey, value: accessToken, expires: 24 });
            setCookie({ key: refreshTokenCookieKey, value: refreshToken, expires: 48 });

            api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

            toast.success("Login realizado com sucesso!");

            router.push("/componentes");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Ocorreu um erro desconhecido");
            }
        }
    };

    const signOut = () => {
        setUser(null);

        const tokenCookieKey = "inventario.token";
        const refreshTokenCookieKey = "inventario.refreshToken";

        removeCookie(tokenCookieKey);
        removeCookie(refreshTokenCookieKey);

        window.location.replace("/login");
    };

    useEffect(() => {
        async function loadUserFromCookies() {
            const tokenCookieKey = "inventario.token";

            const tokenCookie = await getCookieValue(tokenCookieKey);

            if (!tokenCookie) {
                setIsLoading(false);
                return;
            }

            const token = tokenCookie;

            if (token) {
                try {
                    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                    const response = await api.get("/profile");

                    setUser(response.data);
                } catch (error) {
                    console.error("Falha ao buscar perfil do usuário:", error);
                }
            }

            setIsLoading(false);
        }

        loadUserFromCookies();
    }, []);

    return (
        <AuthenticationContext.Provider
            value={{
                user,
                signIn,
                signOut,
                isLoading,
                setIsLoading,
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
}

export function useAuthentication() {
    const context = useContext(AuthenticationContext);
    if (context === undefined) {
        throw new Error("O useAuthentication deve ser usado dentro de um AuthenticationProvider");
    }
    return context;
}