import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import DetailsScreen from "./src/components/details";
import HomeScreen from "./src/components/home";
import { Routes } from "./src/constants";

const RootStack = createStackNavigator(
  {
    [Routes.HOME]: {
      screen: HomeScreen,
      navigationOptions: {
        title: "Users"
      }
    },
    [Routes.DETAILS]: {
      screen: DetailsScreen
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#43A047"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

export default createAppContainer(RootStack);
