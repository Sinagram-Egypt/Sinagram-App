import {
  useContext,
  createContext,
  type PropsWithChildren,
  useEffect,
  useState,
} from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext<{
  logIn: (payload: JWTPayload) => void;
  logOut: () => void;
  session?: JWTPayload | null;
  isLoading: boolean;
}>({
  logIn: () => null,
  logOut: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value)
      throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);
  const [JWT, setJWT] = useState<JWTPayload | null>(null);

  useEffect(() => {
    const currSession = JSON.parse(
      SecureStore.getItem("Session") as string,
    ) as JWTPayload | null;

    if (currSession) setJWT(currSession);

    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        logIn: (payload: JWTPayload) => {
          saveJWT("Session", payload);
          setJWT(payload);
        },
        logOut: () => {
          saveJWT("Session", null);
          setJWT(null);
        },
        session: JWT,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export async function saveJWT(key: string, value: JWTPayload | null) {
  if (value === null) return await SecureStore.deleteItemAsync(key);
  SecureStore.setItem(key, JSON.stringify(value));
}

export function getJWT() {
  return JSON.parse(
    SecureStore.getItem("Session") as string,
  ) as JWTPayload | null;
}
