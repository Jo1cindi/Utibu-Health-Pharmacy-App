import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import App from "./App";

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={App} />
    </Tab.Navigator>
  );
};

export default TabNavigator;