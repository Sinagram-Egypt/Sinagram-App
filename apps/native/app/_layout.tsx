import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Toaster } from "sonner-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SessionProvider } from "@/components/AuthContext";
import { TRPCNativeProvider } from "../components/ui/core/trpc/TRPCProvider";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <GluestackUIProvider mode={colorScheme as "light" | "dark"}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SessionProvider>
          <TRPCNativeProvider>
            <GestureHandlerRootView>
              <Stack
                screenOptions={{
                  headerStyle: { backgroundColor: "#3B21B7" },
                  headerTitleStyle: { color: "white" },
                  headerTintColor: "white",
                }}
              >
                <Stack.Screen name="(app)" options={{ headerShown: false }} />
                <Stack.Screen name="log-in" options={{ title: "Log In" }} />
                <Stack.Screen name="user/[id]/profile" />
              </Stack>
              <Toaster />
              <StatusBar style="auto" />
            </GestureHandlerRootView>
          </TRPCNativeProvider>
        </SessionProvider>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
