import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Octicons from "@expo/vector-icons/Octicons";
import HomeStack from "./homestack";
import OrderStack from "./orderstack";
import ProfileStack from "./profilestack";
import LoginStack from "./loginstack";
import TextB from "../fonts/TextBold";
import OrderHistoryStack from "./Orderhistorystack";

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
                <TextB
                  style={{
                    color: "white",
                    margin: 2.5,
                    marginLeft: 5,
                  }}
                >
                  {focused ? "Home" : null}
                </TextB>
              </View>
            );
          },
        }}
      />
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
                <TextB
                  style={{
                    color: "white",
                    margin: 2.5,
                    marginLeft: 5,
                  }}
                >
                  {focused ? "Plants" : null}
                </TextB>
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="OrderHistoryStack"
        component={OrderHistoryStack}
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
                <Octicons name="history" size={23} color="white" />
                <TextB
                  style={{
                    color: "white",
                    margin: 2.5,
                    marginLeft: 5,
                  }}
                >
                  {focused ? "Orders" : null}
                </TextB>
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
                <TextB
                  style={{
                    color: "white",
                    margin: 2.5,
                    marginLeft: 5,
                  }}
                >
                  {focused ? "Profile" : null}
                </TextB>
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
    width: "120%",
    borderRadius: 25,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
};
