import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, InputField } from "@/components/ui/input";
import { useState } from "react";
import { trpc } from "@repo/api/client";
import { FlatList, View, Text, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Divider } from "@/components/ui/divider";

export default function Profile() {
  const [searchTerm, setSearchTerm] = useState("");
  const users = trpc.user.search.useQuery({ term: searchTerm });

  return (
    <LinearGradient
      colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
      className="flex-1"
    >
      <SafeAreaView className="flex-1">
        <Input className="mx-8 mt-8">
          <InputField
            id="search"
            className="w-full border border-gray-400 p-2 rounded-lg placeholder:text-white text-white"
            onChangeText={setSearchTerm}
            value={searchTerm}
            placeholder="Search for a user..."
          />
        </Input>
        {users.isLoading && <ActivityIndicator size="large" className="mt-4" />}
        {users.isError && (
          <View className="bg-black/50 self-center px-4 mt-2">
            <Text className="text-red-500 text-center">An error occurred</Text>
          </View>
        )}
        <FlatList
          className="mx-4"
          data={users.data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="m-4">
              <Link
                href={{
                  pathname: "/user/[id]/profile",
                  params: { id: item.id },
                }}
              >
                <View className="flex-row items-center gap-2">
                  <Avatar size="md">
                    <AvatarFallbackText>{`${item.firstName} ${item.lastName}`}</AvatarFallbackText>
                    <AvatarImage
                      source={{
                        uri: item.image,
                      }}
                    />
                  </Avatar>
                  <Text className="text-white">{item.username}</Text>
                </View>
              </Link>
              <Divider className="my-1" />
            </View>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
