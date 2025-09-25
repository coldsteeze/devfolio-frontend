import axios from "axios"

import { tokenService } from "./tokenService"

export const api = axios.create({
    baseURL: "http://localhost:8080"
})

axios.interceptors.request.use((config) => {
    const token = tokenService.getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

axios.interceptors.response.use(
    (res) => res,
    async (error) => {
        if (error.response?.status === 401) {
            const refreshed = await tokenService.refreshAccessToken();
            if (refreshed) {
                error.config.headers.Authorization = `Bearer ${tokenService.getAccessToken()}`;
                return api.request(error.config);
            } else {
                tokenService.clearTokens();
            }
        }
        return Promise.reject(error);
    }
)
    