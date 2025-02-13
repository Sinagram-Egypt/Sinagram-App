import { Controller, useForm } from "react-hook-form";
import { Text } from "react-native";
import { loginInputSchema, LoginInput } from "@repo/api/inputSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, InputField } from "../../input";
import { trpc } from "@repo/api/client";
import { toast } from "sonner-native";
import { Button, ButtonText } from "../../button";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";
import { useSession } from "@/components/AuthContext";
import { router } from "expo-router";

export default function Login() {
  const { logIn } = useSession();
  const {
    control: loginControl,
    handleSubmit: loginHandleSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginInput>({
    values: {
      emailOrUsername: "Abdo.AlGhouul@gmail.com",
      password: "12345678",
    },
    resolver: zodResolver(loginInputSchema),
  });

  const loginMutation = trpc.auth.getSessionByEmailOrUsername.useMutation({
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      logIn(data);
      toast.success("Login was successful");
      router.replace("/");
    },
  });

  return (
    <Animated.View
      entering={SlideInRight}
      exiting={SlideOutLeft}
      className="gap-3"
    >
      <Controller
        control={loginControl}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input>
            <InputField
              id="emailOrUsername"
              className="w-full border border-gray-400 p-2 rounded-lg"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Email or Username"
            />
          </Input>
        )}
        name="emailOrUsername"
      />
      {loginErrors.emailOrUsername ? (
        <Text className="text-red-500 text-center">
          {loginErrors.emailOrUsername.message}
        </Text>
      ) : null}

      <Controller
        control={loginControl}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input>
            <InputField
              id="password"
              className="w-full border border-gray-400 p-2 rounded-lg"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              secureTextEntry
              placeholder="Password"
            />
          </Input>
        )}
        name="password"
      />
      {loginErrors.password ? (
        <Text className="text-red-500 text-center">
          {loginErrors.password.message}
        </Text>
      ) : null}

      <Button
        className="ml-auto"
        onPress={loginHandleSubmit((data) => loginMutation.mutateAsync(data))}
      >
        <ButtonText className="text-typography-0">Login</ButtonText>
      </Button>
    </Animated.View>
  );
}
