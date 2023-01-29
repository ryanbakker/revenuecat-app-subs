import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text } from "react-native";

export default function App() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <Text>Blank app</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
