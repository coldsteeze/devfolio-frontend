import { TokensResponse } from "@/types/types";
import { api } from "./authApi";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const ACCESS_TOKEN_EXP_KEY = "accessTokenExpiresAt";

export const tokenService = {
    setTokens: (data: TokensResponse) =>{
        localStorage.setItem(ACCESS_TOKEN_KEY,data.accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken);
        localStorage.setItem(ACCESS_TOKEN_EXP_KEY, String(Date.now() +  data.accessTokenExpiresIn * 1000));
    },
    getAccessToken: () => {
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);
        const exp = localStorage.getItem(ACCESS_TOKEN_EXP_KEY);
        if (token && exp && Date.now()<= Number(exp))
        {
            return token;
        }
        return null;
    },
    getRefreshToken: () => {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    },
    clearTokens: () => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(ACCESS_TOKEN_EXP_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
    },
    refreshAccessToken: async () : Promise <boolean> => {
        const refreshToken = tokenService.getRefreshToken();
        if(!refreshToken) return false;
        try {
            const res = await api.post<TokensResponse>('api/auth/refresh', {refreshToken});
            tokenService.setTokens(res.data);
            return true;
        }
        catch(e){
            console.log("Ошибка обновления токенов: " + e);
            return false;
        }
    }

}