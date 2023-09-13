import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Navigation from "./bottomtab";
import MapScreen from "../screen/MapScreen";
import LoginStack from "./loginstack";
import { Provider as ReduxProvider } from "react-redux";
import store from "../redux/store";
const Stack = createStackNavigator();
function MainNavi() {
  return (
    <ReduxProvider store={store}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Navi" component={Navigation} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
      </Stack.Navigator>
    </ReduxProvider>
  );
}

export default MainNavi;
