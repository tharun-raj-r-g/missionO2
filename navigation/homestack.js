import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screen/homescreen";
import Cartscreen from "../screen/Cartscreen";
import Order from "../screen/orderscreen";
import OrderStack from "./orderstack";
import OrderConfirmedScreen from "../screen/OrderConfirmedScreen";
const Stack = createStackNavigator();
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Cart" component={Cartscreen}/>
      <Stack.Screen name="Order" component={Order}/>
      <Stack.Screen name="OrderConfirm" component={OrderConfirmedScreen}/>
    </Stack.Navigator>
  );
}

export default HomeStack;
