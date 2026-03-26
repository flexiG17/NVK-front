import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ROUTES } from '@/shared/routes';

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = () => {
    //TODO: Реализовать логику аутентификации 
    router.replace(ROUTES.tabs.root);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вход в приложение</Text>
      <Button title="Войти" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  title: { 
    fontSize: 24, 
    marginBottom: 20 
  },
});