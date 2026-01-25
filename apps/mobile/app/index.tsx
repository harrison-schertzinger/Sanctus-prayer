import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to the readings tab as the default screen
  return <Redirect href="/(tabs)/readings" />;
}
