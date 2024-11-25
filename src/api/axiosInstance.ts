import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CONSTANTS } from "enums";
// import { router } from "expo-router";

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 60000,
});

axiosInstance.interceptors.request.use(
  async (request) => {
    const token = await AsyncStorage.getItem(CONSTANTS.API_TOKEN);

    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
  },

  (error) => {
    console.warn("HTTP :: Request Error", error);
    return Promise.reject(error);
  }
  // Do something with request error
);

axiosInstance.interceptors.response.use(
  async (response) => {
    if (response?.status === 401) {
      // router.navigate("/token-expire");
      return Promise.reject(new Error());
    }
    return response;
  },

  (error) => {
    console.warn("HTTP :: Request Error", error);
    console.warn("Request Url", error?.config?.url);
    console.warn("Response Status:", error?.response?.status);
    console.warn("Response Data:", error?.response?.data);

    if (error?.message === "Request failed with status code 401") {
      // router.navigate("/token-expire");
      return Promise.reject(error);
    }
    return Promise.reject(error?.response?.data);
  }
);

export default axiosInstance;
