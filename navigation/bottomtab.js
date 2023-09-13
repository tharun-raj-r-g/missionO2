import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeStack from "./homestack";
import OrderStack from "./orderstack";
import ProfileStack from "./profilestack";
import LoginStack from "./loginstack";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: "#00B388",
          paddingHorizontal: 35,
        },
      }}
    >
      <Tab.Screen
        name="OrderStack"
        component={OrderStack}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={[
                  styles.tabView,
                  {
                    backgroundColor: focused ? "#00a079" : null,
                    elevation: focused ? 5 : null,
                  },
                ]}
              >
                <Ionicons name="earth" size={25} color="white" />
                <Text
                  style={{
                    color: "white",
                    margin: 2.5,
                    marginLeft: 5,
                  }}
                >
                  {focused ? "Order" : null}
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={[
                  styles.tabView,
                  {
                    backgroundColor: focused ? "#00a079" : null,
                    elevation: focused ? 5 : null,
                  },
                ]}
              >
                <Ionicons name="home" size={25} color="white" />
                <Text
                  style={{
                    color: "white",
                    margin: 2.5,
                    marginLeft: 5,
                  }}
                >
                  {focused ? "Home" : null}
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={[
                  styles.tabView,
                  {
                    backgroundColor: focused ? "#00a079" : null,
                    elevation: focused ? 5 : null,
                  },
                ]}
              >
                <Ionicons name="person" size={25} color="white" />
                <Text
                  style={{
                    color: "white",
                    margin: 2.5,
                    marginLeft: 5,
                  }}
                >
                  {focused ? "Profile" : null}
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default App;

const styles = {
  tabView: {
    borderRadius: 25,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tabIcon: {
    width: 25,
    height: 25,
  },
};
