import React from "react";
import { View, TextInput, Text, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Character } from "types";

interface SearchBarProps {
  setPage: (page: number) => void;
  name: string;
  setName: (text: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedCharacters: Character[];
  removeCharacter: (id: number) => void;
}

export const SearchBar = ({
  setPage,
  name,
  setName,
  isOpen,
  setIsOpen,
  selectedCharacters,
  removeCharacter,
}: SearchBarProps) => (
  <View className="min-h-10 border border-gray-200 rounded-lg p-2 flex-row">
    <View className="min-h-10 w-11/12 flex-row flex-wrap items-center">
      {selectedCharacters.map((char) => (
        <View
          key={char.id}
          className="bg-gray-100 rounded-lg m-1 flex-row items-center px-3 py-1"
        >
          <Text className="text-gray-800">{char.name}</Text>
          <Pressable
            hitSlop={{ left: 20, right: 20 }}
            onPress={() => removeCharacter(char.id)}
            className="ml-2"
          >
            <FontAwesome name="times" size={16} color="#FF453A" />
          </Pressable>
        </View>
      ))}
      <TextInput
        className="flex-1 h-10 min-w-[100px] p-2"
        placeholder={selectedCharacters.length ? "" : "Search characters..."}
        placeholderTextColor="#808080"
        value={name}
        onChangeText={(text) => {
          setPage(1);
          setName(text);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
      />
    </View>
    <Pressable
      hitSlop={20}
      onPress={() => setIsOpen(!isOpen)}
      className="min-h-10 w-1/12 justify-center items-center border-l border-gray-200 pl-2"
    >
      <FontAwesome name="chevron-down" size={16} color="#808080" />
    </Pressable>
  </View>
);
