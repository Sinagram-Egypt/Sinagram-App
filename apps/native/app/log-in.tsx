import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Login from "@/components/ui/core/user/Login";
import Register from "@/components/ui/core/user/Register";
import { useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function SignIn() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <LinearGradient
      colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 justify-center">
        <Card className="border border-gray-400 mx-4 gap-4 bg-[#D195EE]">
          <View className="flex-row gap-3 mx-4">
            <InputToggle
              title="Register"
              activeTab={activeTab}
              setActiveTab={() => setActiveTab("register")}
            />
            <InputToggle
              title="Login"
              activeTab={activeTab}
              setActiveTab={() => setActiveTab("login")}
            />
          </View>

          <Text className="text-2xl ml-2">
            {activeTab === "register" ? "Register" : "Login"}
          </Text>

          {activeTab === "register" ? (
            <Register onSuccess={() => setActiveTab("login")} />
          ) : null}

          {activeTab === "login" ? <Login /> : null}
        </Card>
      </SafeAreaView>
    </LinearGradient>
  );
}

function InputToggle({
  title,
  activeTab,
  setActiveTab,
}: {
  title: string;
  activeTab: "login" | "register";
  setActiveTab: () => void;
}) {
  return (
    <Button
      disabled={activeTab === title.toLowerCase()}
      className={`flex flex-[0.5] p-2 rounded
        ${activeTab === title.toLowerCase() ? "bg-black" : "bg-primary border border-primary"}`}
      onPress={() => setActiveTab()}
    >
      <ButtonText
        className={`text-center
          ${activeTab === title.toLowerCase() ? "text-white" : "text-primary"}`}
      >
        {title}
      </ButtonText>
    </Button>
  );
}
