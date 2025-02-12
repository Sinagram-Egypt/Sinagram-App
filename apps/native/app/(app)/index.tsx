import { useSession } from "@/components/AuthContext";
import { Button, ButtonText } from "@/components/ui/button";
import { trpc } from "@repo/api/client";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { logOut } = useSession();
  const hello = trpc.hello.useQuery();

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text>Home</Text>
      <Button onPress={logOut}>
        <ButtonText>Log out</ButtonText>
      </Button>
      <Text>{hello.data?.hello}</Text>
    </SafeAreaView>
  );
}
