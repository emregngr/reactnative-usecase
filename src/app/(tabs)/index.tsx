import React, { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useSearchStore } from "store/searchStore";
import { fetchCharacters } from "api/characterApi";
import { SafeAreaView } from "react-native-safe-area-context";
import { Character, ApiResponse } from "types";
import { ApiError } from "api/apiClient";
import {
  CharacterItem,
  SkeletonLoading,
  NoResults,
  Pagination,
  SearchBar,
} from "components";
import { useCharacters } from "hooks/useCharacters";

export default function Home() {
  const [page, setPage] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { selectedCharacters, addCharacter, removeCharacter } =
    useSearchStore();

  const { data, isLoading, isError, error, refetch } = useCharacters(
    page,
    name
  );

  const isCharacterSelected = (id: number) => {
    return selectedCharacters.some((char) => char.id === id);
  };

  const handleCharacterSelect = (character: Character) => {
    if (isCharacterSelected(character.id)) {
      removeCharacter(character.id);
    } else {
      addCharacter(character);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (data?.info?.pages && page < data.info.pages) {
      setPage(page + 1);
    }
  };

  if (isError && error) {
    const noResults = error?.message?.includes("There is nothing here");
    if (!noResults) {
      Alert.alert(
        "Error",
        "Failed to load characters. Please try again.",
        [
          {
            text: "Retry",
            onPress: () => refetch(),
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ],
        { cancelable: true }
      );
    }
  }

  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm) return <Text>{text}</Text>;
    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return parts.map((part, i) => (
      <Text
        key={i}
        className={
          part.toLowerCase() === searchTerm.toLowerCase()
            ? "font-bold"
            : "font-normal"
        }
      >
        {part}
      </Text>
    ));
  };

  const renderContent = () => {
    if (isLoading) {
      return <SkeletonLoading />;
    }

    if (data?.results && data?.results?.length > 0) {
      return (
        <>
          {data?.results.map((character: Character) => (
            <CharacterItem
              key={character.id}
              character={character}
              name={name}
              isSelected={isCharacterSelected(character.id)}
              onSelect={() => handleCharacterSelect(character)}
              highlightText={highlightText}
            />
          ))}
          <Pagination
            page={page}
            totalPages={data?.info?.pages}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
          />
        </>
      );
    }

    return <NoResults />;
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <View className="relative">
        <SearchBar
          setPage={setPage}
          name={name}
          setName={setName}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedCharacters={selectedCharacters}
          removeCharacter={removeCharacter}
        />

        {isOpen && (
          <View className="absolute top-full left-0 right-0 mt-1 border border-gray-200 rounded-lg bg-white shadow-lg max-h-[280px]">
            <ScrollView>{renderContent()}</ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
