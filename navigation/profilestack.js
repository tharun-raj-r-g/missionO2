import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../screen/profilescreen";
const Stack = createStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

export default ProfileStack;
