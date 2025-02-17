import { useSession } from "@/components/AuthContext";
import { Button, ButtonText } from "@/components/ui/button";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { logOut } = useSession();

  return (
    <LinearGradient
      colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
      className="flex-1"
    >
      <SafeAreaView>
        <Button onPress={logOut}>
          <ButtonText>Log out</ButtonText>
        </Button>
      </SafeAreaView>
    </LinearGradient>
  );
}
