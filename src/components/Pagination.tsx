import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

export const Pagination = ({
  page,
  totalPages,
  onPreviousPage,
  onNextPage,
}: PaginationProps) => {
  const isFirstPage = page <= 1;
  const isLastPage = !totalPages || page >= totalPages;

  return (
    <View className="flex-row justify-between items-center p-4 border-t border-gray-200">
      <TouchableOpacity
        onPress={onPreviousPage}
        disabled={isFirstPage}
        className={`px-4 py-2 rounded-lg ${
          isFirstPage ? "bg-gray-200" : "bg-blue-500"
        }`}
      >
        <Text className={`${isFirstPage ? "text-gray-500" : "text-white"}`}>
          Previous
        </Text>
      </TouchableOpacity>
      <Text className="text-gray-600">
        Page {page} of {totalPages || 1}
      </Text>
      <TouchableOpacity
        onPress={onNextPage}
        disabled={isLastPage}
        className={`px-4 py-2 rounded-lg ${
          isLastPage ? "bg-gray-200" : "bg-blue-500"
        }`}
      >
        <Text className={`${isLastPage ? "text-gray-500" : "text-white"}`}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};
