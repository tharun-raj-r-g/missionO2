import { StyleSheet, Text, View } from "react-native";
import MainNavi from "./navigation/mainnavi";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <MainNavi />
    </NavigationContainer>
  );
}