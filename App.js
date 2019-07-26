import React from "react";
import HomeScreen from "./screens/HomeScreen";
import DialScreen from "./screens/DialScreen";
import { createStackNavigator, createAppContainer } from "react-navigation";

const MainNavigator = createStackNavigator({
  HomeScren: { screen: HomeScreen },
  DialScreen: { screen: DialScreen }
});

const App = createAppContainer(MainNavigator);

export default App;
