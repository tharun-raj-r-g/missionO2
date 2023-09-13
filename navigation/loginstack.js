import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import VerificationPage from "../screen/verficationpage";
import ProfileFirst from "../screen/profilefirst";

const Stack = createStackNavigator();
function LoginStack() {
  return (
    <Stack.Navigator
      initialRouteName="VerificationPage"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="VerificationPage" component={VerificationPage} />
      <Stack.Screen name="ProfileFirst" component={ProfileFirst} />
    </Stack.Navigator>
  );
}

export default LoginStack;
