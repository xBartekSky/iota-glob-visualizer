import React, { ComponentProps } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // Poprawny import
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme/Colors";
import GlobeScreen from "../screens/GlobeScreen";
import ValidatorsScreen from "../screens/ValidatorsScreen";
import CalculatorScreen from "../screens/CalculatorScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopWidth: 0,
          paddingTop: 10,

          height: 60 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
        },
        tabBarActiveTintColor: Colors.buttons,
        tabBarInactiveTintColor: "gray",

        tabBarIcon: ({ focused, color, size }) => {
          let iconName: ComponentProps<typeof Ionicons>["name"];

          if (route.name === "Globe") {
            iconName = focused ? "globe" : "globe-outline";
          } else if (route.name === "Validators") {
            iconName = focused ? "shield" : "shield-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Calculator") {
            iconName = focused ? "calculator" : "calculator-outline";
          } else {
            iconName = "help-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Globe" component={GlobeScreen} />
      <Tab.Screen name="Validators" component={ValidatorsScreen} />
      <Tab.Screen name="Calculator" component={CalculatorScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
