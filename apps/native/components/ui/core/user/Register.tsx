import { Controller, useForm } from "react-hook-form";
import { Text } from "react-native";
import { createUserInputSchema, CreateUserInput } from "@repo/api/inputSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, InputField } from "../../input";
import { trpc } from "@repo/api/client";
import { toast } from "sonner-native";
import { Button, ButtonText } from "../../button";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";

export default function Register({ onSuccess }: { onSuccess: () => void }) {
  const {
    control: registerControl,
    handleSubmit: registerHandleSubmit,
    formState: { errors: registerErrors },
  } = useForm<CreateUserInput>({
    values: {
      email: "Abdo.AlGhouul@gmail.com",
      username: "Abdo.AlGhoul",
      firstName: "Abdulrahman",
      lastName: "AlGhoul",
      password: "12345678",
      confirmPassword: "12345678",
    },
    resolver: zodResolver(createUserInputSchema),
  });

  const registerMutation = trpc.user.add.useMutation({
    onError: (error) => toast.error(error.message),
    onSuccess: () => toast.success("Account was created successfully"),
  });

  return (
    <Animated.View
      entering={SlideInRight}
      exiting={SlideOutRight}
      className="gap-3"
    >
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
              id="firstName"
              className="w-full border border-gray-400 p-2 rounded-lg"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="First Name"
            />
          </Input>
        )}
        name="firstName"
      />
      {registerErrors.firstName ? (
        <Text className="text-red-500 text-center">
          {registerErrors.firstName.message}
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
              id="lastName"
              className="w-full border border-gray-400 p-2 rounded-lg"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Last Name"
            />
          </Input>
        )}
        name="lastName"
      />
      {registerErrors.lastName ? (
        <Text className="text-red-500 text-center">
          {registerErrors.lastName.message}
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
      {registerErrors.password ? (
        <Text className="text-red-500 text-center">
          {registerErrors.password.message}
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
              id="confirmPassword"
              className="w-full border border-gray-400 p-2 rounded-lg"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              secureTextEntry
              placeholder="Confirm Password"
            />
          </Input>
        )}
        name="confirmPassword"
      />
      {registerErrors.confirmPassword ? (
        <Text className="text-red-500 text-center">
          {registerErrors.confirmPassword.message}
        </Text>
      ) : null}

      <Button
        className="ml-auto"
        onPress={registerHandleSubmit((data) =>
          registerMutation.mutateAsync(data).then(() => onSuccess()),
        )}
      >
        <ButtonText className="text-typography-0">Register</ButtonText>
      </Button>
    </Animated.View>
  );
}
