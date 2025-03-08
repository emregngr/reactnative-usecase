import { create } from "zustand";
import { ApiResponse } from "types";
import { endpoints } from "api/endpoints";
import axiosInstance from "api/axiosInstance";

interface CharacterApiStore {
  fetchCharacters: (page?: number, name?: string) => Promise<ApiResponse>;
}

export const useCharacterStore = create<CharacterApiStore>(() => ({
  fetchCharacters: async (page?: number, name?: string) => {
    const query = `?page=${page}&name=${name}`;
    const { data } = await axiosInstance.get<ApiResponse>(
      `${endpoints?.getCharacters}/${query}`
    );
    return data;
  },
}));
