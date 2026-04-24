// import { ROUTES } from '@/shared/lib/routes';
// import { clearAuthSession } from '@/shared/lib/authSession';
// import { useRouter } from 'expo-router';
import { StyleSheet, ScrollView } from 'react-native';
import { ProfileHeader } from '@/pages/profile/widgets/ProfileHeader';
import { ProfileInfo } from '@/pages/profile/widgets/ProfileInfo';

export default function ProfileScreen() {
  // const router = useRouter();

  // const handleLogout = async () => {
  //   await clearAuthSession();
  //   router.replace(ROUTES.auth.login);
  // };

  const userInfo = {
    fio: 'Иванов Иван Иванович',
    group: 'РИ-123456',
    institute: 'ИРИТ-РТФ',
    role: 'Студент',
  };

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader userName="Имя" level={5} currentPoints={1250} maxPoints={5000} />
      <ProfileInfo userInfo={userInfo} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
