import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  createUserInputSchema,
  createUserInput,
} from "@repo/api/src/db/types/inputSchemas";
import { View, Text } from "react-native";
import { Input, InputField } from "@/components/ui/input";
import { SafeAreaView } from "react-native-safe-area-context";
import { trpc } from "@repo/api/src/clients/client";
import { Button, ButtonText } from "@/components/ui/button";
import { toast } from "sonner-native";

export default function HomeScreen() {
  const register = trpc.register.useMutation({
    onError: (error) => {
      console.log(error.message);

      toast.error(error.message);
    },
  });

  const {
    control: registerControl,
    handleSubmit: registerHandleSubmit,
    formState: { errors: registerErrors },
    setError: setRegisterError,
  } = useForm<createUserInput>({
    values: {
      email: "Abdo.AlGhouul@gmail.com",
      username: "Abdo.AlGhoul",
      first_name: "Abdulrahman",
      last_name: "AlGhoul",
      password: "12345678",
      confirmPassword: "12345678",
    },
    resolver: zodResolver(createUserInputSchema),
  });

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center items-center gap-4 mx-4">
        <Controller
          control={registerControl}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input>
              <InputField
                id="email"
                className="w-full border border-gray-400 p-2 rounded-lg"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Email"
              />
            </Input>
          )}
          name="email"
        />
        {registerErrors.email ? (
          <Text className="text-red-500 text-center">
            {registerErrors.email.message}
          </Text>
        ) : null}

        <Controller
          control={registerControl}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input>
              <InputField
                id="username"
                className="w-full border border-gray-400 p-2 rounded-lg"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Username"
              />
            </Input>
          )}
          name="username"
        />
        {registerErrors.username ? (
          <Text className="text-red-500 text-center">
            {registerErrors.username.message}
          </Text>
        ) : null}

        <Controller
          control={registerControl}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input>
              <InputField
                id="first_name"
                className="w-full border border-gray-400 p-2 rounded-lg"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="First Name"
              />
            </Input>
          )}
          name="first_name"
        />
        {registerErrors.first_name ? (
          <Text className="text-red-500 text-center">
            {registerErrors.first_name.message}
          </Text>
        ) : null}

        <Controller
          control={registerControl}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input>
              <InputField
                id="last_name"
                className="w-full border border-gray-400 p-2 rounded-lg"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Last Name"
              />
            </Input>
          )}
          name="last_name"
        />
        {registerErrors.last_name ? (
          <Text className="text-red-500 text-center">
            {registerErrors.last_name.message}
          </Text>
        ) : null}

        <Button
          className="ml-auto"
          onPress={registerHandleSubmit((data) => register.mutate(data))}
        >
          <ButtonText className="text-typography-0">Register</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
}
