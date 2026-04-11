
export const checkAuth = async (): Promise<boolean> => {
  // TODO: реализовать проверку авторизации
  try {
    const token = null;
    const isValid = false;
    
    return !!token && isValid;
  } catch {
    return false;
  }
};