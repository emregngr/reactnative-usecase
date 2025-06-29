import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { CONSTANTS } from "enums";
// import { router } from "expo-router";

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message: string;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

export interface ApiRequestConfig extends AxiosRequestConfig {
  skipAuthRefresh?: boolean;
  skipErrorHandling?: boolean;
}

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    const token = await AsyncStorage.getItem(CONSTANTS.API_TOKEN);

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.warn("HTTP :: Request Error", error);
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response?.status === 401) {
      // router.navigate("/token-expire");
      return Promise.reject(new Error());
    }
    return response;
  },

  async (error: AxiosError) => {
    const originalRequest = error.config as ApiRequestConfig;

    const apiError: ApiError = {
      status: error.response?.status || 500,
      message: "Bir hata oluştu",
      errors: {},
    };

    if (error.response?.data) {
      const errorData = error.response.data as any;

      if (errorData.message) {
        apiError.message = errorData.message;
      }

      if (errorData.errors) {
        apiError.errors = errorData.errors;
      }
    }

    if (!originalRequest?.skipErrorHandling) {
      console.warn("Error Status", apiError.status);
      console.warn("Error Message", apiError.message);
      console.warn("Errors", apiError.errors);
    }

    if (error?.message === "Request failed with status code 401") {
      // router.navigate("/token-expire");
      return Promise.reject(error);
    }

    return Promise.reject(apiError);
  }
);

const apiClient = {
  async get<T = any>(url: string, config?: ApiRequestConfig): Promise<T> {
    const response = await axiosInstance.get<ApiResponse<T>>(url, config);
    return response.data as T;
  },

  async post<T = any>(
    url: string,
    data?: any,
    config?: ApiRequestConfig
  ): Promise<T> {
    const response = await axiosInstance.post<ApiResponse<T>>(
      url,
      data,
      config
    );
    return response.data as T;
  },

  async put<T = any>(
    url: string,
    data?: any,
    config?: ApiRequestConfig
  ): Promise<T> {
    const response = await axiosInstance.put<ApiResponse<T>>(url, data, config);
    return response.data as T;
  },

  async patch<T = any>(
    url: string,
    data?: any,
    config?: ApiRequestConfig
  ): Promise<T> {
    const response = await axiosInstance.patch<ApiResponse<T>>(
      url,
      data,
      config
    );
    return response.data as T;
  },

  async delete<T = any>(url: string, config?: ApiRequestConfig): Promise<T> {
    const response = await axiosInstance.delete<ApiResponse<T>>(url, config);
    return response.data as T;
  },
};

export default apiClient;
