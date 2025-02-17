import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useLocalSearchParams } from "expo-router";
import { trpc } from "@repo/api/client";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { ActivityIndicator, Text, View } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";

export default function HomeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: user, isLoading } = trpc.user.getById.useQuery({ id });

  if (isLoading) <ActivityIndicator />;

  if (!user) return null;

  return (
    <LinearGradient
      colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
      className="flex-1"
    >
      <Stack.Screen
        options={{
          title: user.username || "Profile",
        }}
      />
      <SafeAreaView className="">
        <View className="flex-row justify-center gap-12 my-4">
          <Avatar size="xl">
            <AvatarFallbackText>{`${user.firstName} ${user.lastName}`}</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: user.image,
              }}
            />
          </Avatar>
          <View className="gap-4">
            <Text className="text-white text-2xl">{user.username}</Text>
            <View className="flex-1 flex-row gap-2">
              <Button>
                <ButtonText>{user.isFollowing ? "Following" : "Follow"}</ButtonText>
              </Button>
              <Button>
                <ButtonText>Message</ButtonText>
              </Button>
            </View>
          </View>
        </View>
        <Divider className="my-0.5" />
        <View className="flex-row justify-around mx-4">
          <View className="items-center">
            <Text className="text-white">{user.followersCount}</Text>
            <Text className="text-white">Followers</Text>
          </View>
          <View className="items-center">
            <Text className="text-white">{user.followingCount}</Text>
            <Text className="text-white">Following</Text>
          </View>
        </View>
        <Divider className="my-0.5" />
      </SafeAreaView>
    </LinearGradient>
  );
}
