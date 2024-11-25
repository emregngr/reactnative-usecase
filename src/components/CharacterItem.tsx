import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import { Character } from "types";

interface CharacterItemProps {
  character: Character;
  name: string;
  isSelected: boolean;
  onSelect: () => void;
  highlightText: (text: string, searchTerm: string) => React.ReactNode;
}

export const CharacterItem = ({
  character,
  name,
  isSelected,
  onSelect,
  highlightText,
}: CharacterItemProps) => (
  <View className="flex-row items-center p-4 h-[70px] border-b border-gray-100">
    <Pressable hitSlop={20} onPress={onSelect}>
      <FontAwesome
        name={isSelected ? "check-square" : "square-o"}
        size={24}
        color={isSelected ? "#1919e6" : "#808080"}
        className="w-6 mr-4"
      />
    </Pressable>
    <Image source={{ uri: character.image }} className="h-12 w-12 rounded" />
    <View className="ml-3">
      <Text className="text-base text-gray-900 flex-row">
        {highlightText(character.name, name)}
      </Text>
      <Text className="text-sm text-gray-500">
        {character.episode.length} Episodes
      </Text>
    </View>
  </View>
);
