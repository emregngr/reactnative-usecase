import React from "react";
import { View } from "react-native";
import { Skeleton } from "moti/skeleton";
import { MotiView } from "moti";

const CharacterSkeletonLoading = () => {
  const skeletonProps = {
    backgroundColor: "#9CA3AF",
    highlightColor: "#D1D5DB",
  };

  return (
    <View className="flex-row items-center p-4 h-[70px] border-b border-gray-100">
      <Skeleton
        colorMode="light"
        height={24}
        width={24}
        radius={4}
        {...skeletonProps}
      />

      <View className="w-4" />

      <Skeleton
        colorMode="light"
        height={48}
        width={48}
        radius={4}
        {...skeletonProps}
      />

      <View className="ml-3">
        <Skeleton
          colorMode="light"
          height={18}
          width="60%"
          radius={4}
          {...skeletonProps}
        />

        <View className="h-1" />

        <Skeleton
          colorMode="light"
          height={15}
          width="60%"
          radius={4}
          {...skeletonProps}
        />
      </View>
    </View>
  );
};

export const SkeletonLoading = () => {
  return (
    <MotiView className="bg-white">
      {[...Array(4)].map((_, index) => (
        <CharacterSkeletonLoading key={index} />
      ))}
    </MotiView>
  );
};
