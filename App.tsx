import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import DetailsScreen from "./components/details";
import HomeScreen from "./components/home";
import { Routes } from "./constants";

const RootStack = createStackNavigator({
  [Routes.HOME]: {
    screen: HomeScreen,
    navigationOptions: {
      title: "Users"
    }
  },
  [Routes.DETAILS]: {
    screen: DetailsScreen
  }
});

export default createAppContainer(RootStack);
