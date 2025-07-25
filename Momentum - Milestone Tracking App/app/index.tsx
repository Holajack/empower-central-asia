import { Redirect } from 'expo-router';

// This redirects to the tabs when accessed directly
export default function RootIndex() {
  return <Redirect href="/(tabs)" />;
}