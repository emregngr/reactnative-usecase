import { create } from "zustand";
import { Character } from "types";

interface SearchState {
  selectedCharacters: Character[];
  addCharacter: (character: Character) => void;
  removeCharacter: (id: number) => void;
}

export const useSearchStore = create<SearchState>()((set) => ({
  selectedCharacters: [],
  addCharacter: (character) =>
    set((state) => ({
      selectedCharacters: state.selectedCharacters.some(
        (c) => c.id === character.id
      )
        ? state.selectedCharacters
        : [...state.selectedCharacters, character],
    })),
  removeCharacter: (id) =>
    set((state) => ({
      selectedCharacters: state.selectedCharacters.filter(
        (char) => char.id !== id
      ),
    })),
}));
