import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Order from "../screen/orderscreen";
import Cartscreen from "../screen/Cartscreen";
import OrderConfirmedScreen from "../screen/OrderConfirmedScreen";
const Stack = createStackNavigator();

function OrderStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Order" component={Order} />
      <Stack.Screen name="Cart" component={Cartscreen}/>
      <Stack.Screen name="OrderConfirm" component={OrderConfirmedScreen}/>
    </Stack.Navigator>
  );
}

export default OrderStack;
