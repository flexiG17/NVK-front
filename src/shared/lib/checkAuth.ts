import { isAuthSessionActive } from "@/shared/lib/authSession";

export const checkAuth = async (): Promise<boolean> => {
  try {
    return await isAuthSessionActive();
  } catch {
    return false;
  }
};