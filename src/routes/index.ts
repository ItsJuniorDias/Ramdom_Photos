// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FavoriteScreen, HomeScreen } from "../screens";

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
  },
  screens: {
    Home: {
      screen: HomeScreen,
    },
    Favorite: {
      screen: FavoriteScreen,
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);
