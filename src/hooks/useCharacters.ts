import { useQuery } from "@tanstack/react-query";
import { fetchCharacters } from "api/characterApi";
import { ApiResponse } from "types";
import { ApiError } from "api/apiClient";

export function useCharacters(page: number, name: string) {
  return useQuery<ApiResponse, ApiError>({
    queryKey: ["characters", page, name],
    queryFn: () => fetchCharacters(page, name),
    retry: 2,
    retryDelay: 1000,
  });
}
