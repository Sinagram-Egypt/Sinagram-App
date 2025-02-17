import { forwardRef, Ref, useEffect, useState } from "react";
import {
  Pressable,
  TouchableOpacity,
  View,
  Text,
  Keyboard,
} from "react-native";
import Svg, {
  Path,
  Defs,
  Filter,
  FeOffset,
  FeGaussianBlur,
  FeMerge,
  FeMergeNode,
} from "react-native-svg";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TabTriggerSlotProps } from "expo-router/ui";

const TabBar = forwardRef(
  ({ children }: { children: React.ReactNode }, ref: Ref<View>) => {
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        () => {
          setKeyboardVisible(true);
        },
      );

      const keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        () => {
          setKeyboardVisible(false);
        },
      );

      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []);
    return (
        <View
          style={{
            display: isKeyboardVisible ? "none" : "flex",
          }}
          className="absolute bottom-0 left-0 right-0"
        >
          <View className="w-full flex-row justify-around">{children}</View>
        </View>
    );
  },
);

export const FabButton: React.FC<{ color?: string }> = ({ color = "#FFF" }) => {
  return (
    <View className="relative w-20 items-center" pointerEvents="box-none">
      <Svg
        width={75}
        height={61}
        viewBox="0 0 75 61"
        style={{ position: "absolute" }}
      >
        <Defs>
          <Filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <FeOffset result="offOut" in="SourceAlpha" dx="0" dy="3" />
            <FeGaussianBlur result="blurOut" in="offOut" stdDeviation="3" />
            <FeMerge>
              <FeMergeNode in="blurOut" />
              <FeMergeNode in="SourceGraphic" />
            </FeMerge>
          </Filter>
        </Defs>
        <Path
          d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
          fill={color}
          filter="url(#shadow)"
        />
      </Svg>

      <TouchableOpacity className="bottom-[20px]" onPress={() => {}}>
        <AntDesign name="pluscircle" size={48} color="#635A8F" />
      </TouchableOpacity>
    </View>
  );
};

export type TabButtonProps = TabTriggerSlotProps & {
  Icon: (props: { isFocused: boolean | undefined }) => JSX.Element;
};

export const TabButton = forwardRef(
  ({ Icon, children, isFocused, ...props }: TabButtonProps, ref: Ref<View>) => {
    return (
      <Pressable ref={ref} {...props} className="items-center flex-1 bg-white">
        <Icon isFocused={isFocused} />
        <Text>{children}</Text>
      </Pressable>
    );
  },
);

export default TabBar;
