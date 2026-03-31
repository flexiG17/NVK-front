import { useEffect, useState } from "react";
import { router } from "expo-router";
import { checkAuth } from "@/shared/lib/checkAuth";

interface AuthGuardProps {
  children: React.ReactNode;
}
// TODO: Добавиить проверку валидности токена и его обновление при необходимости во время работы приложения
// Сейчас проверка происходит только при монтировании
export const AuthGuard = ({ children }: AuthGuardProps) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      const result = await checkAuth();
      setIsAuth(result);
      if (!result) {
        router.replace("/(auth)/login");
      }
    };

    verifyAuth();
  }, []);

  if (isAuth === null || !isAuth) return null;
  return <>{children}</>;
};
