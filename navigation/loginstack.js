import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screen/Login";
import Signup from "../screen/Signup";

const Stack = createStackNavigator();
function LoginStack() {
  return (
    <Stack.Navigator
      initialRouteName="VerificationPage"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

export default LoginStack;
