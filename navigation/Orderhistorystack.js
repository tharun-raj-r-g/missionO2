import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OrderHistory from "../screen/OrderHistory";

const Stack = createStackNavigator();
function OrderHistoryStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="OrderHistory" component={OrderHistory} />
    </Stack.Navigator>
  );
}

export default OrderHistoryStack;
