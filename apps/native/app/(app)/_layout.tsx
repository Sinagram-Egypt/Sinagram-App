import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { Text } from "react-native";
import Fontisto from "@expo/vector-icons/Fontisto";
import TabBar, { FabButton, TabButton } from "@/components/ui/core/TabBar";
import { Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSession } from "@/components/AuthContext";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function TabsLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!session) return <Redirect href="/log-in" />;

  return (
    <Tabs>
      <TabSlot />
      <TabList asChild>
        <TabBar>
          <TabTrigger
            style={{
              flexDirection: "column",
            }}
            className="items-center flex-1 bg-white"
            name="index"
            href="/"
            asChild
          >
            <TabButton
              Icon={(props) => (
                <Fontisto
                  name="home"
                  size={24}
                  color={props.isFocused ? "gray" : "black"}
                />
              )}
              children="Home"
            />
          </TabTrigger>

          <FabButton />

          <TabTrigger
            style={{
              flexDirection: "column",
            }}
            name="search"
            href="/search"
            asChild
          >
            <TabButton
              Icon={(props) => {
                return (
                  <AntDesign
                    name="search1"
                    size={24}
                    color={props.isFocused ? "gray" : "black"}
                  />
                );
              }}
              children="Search"
            />
          </TabTrigger>
        </TabBar>
      </TabList>
    </Tabs>
  );
}
