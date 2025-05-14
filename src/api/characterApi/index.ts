import { ApiResponse } from "types";
import { CHARACTER_ENDPOINTS } from "api/endpoints";
import apiClient from "api/apiClient";

export const fetchCharacters = async (
  page?: number,
  name?: string
): Promise<ApiResponse> => {
  const query = `?page=${page}&name=${name}`;
  const data = await apiClient.get<ApiResponse>(
    `${CHARACTER_ENDPOINTS.GETCHARACTERS}${query}`
  );
  return data;
};
