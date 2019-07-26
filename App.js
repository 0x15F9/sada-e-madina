import React from "react";
import Home from "./pages/Home/Home";
import Dial from "./pages/Dial/Dial";
import { createStackNavigator, createAppContainer } from "react-navigation";

const MainNavigator = createStackNavigator({
  Home: { screen: Home },
  Dial: { screen: Dial }
});

const App = createAppContainer(MainNavigator);

export default App;
