import React from "react";
import { Text, View } from "react-native";
import { NavigationStackOptions } from "react-navigation-stack";
import { ISingleUser, PropsWithNavigation } from "../../types/all";
import { capitalize } from "../../util";

type Props = PropsWithNavigation<ISingleUser>;

class DetailsScreen extends React.Component<Props> {
  static navigationOptions = ({
    navigation
  }: Props): NavigationStackOptions => {
    return {
      title: capitalize(navigation.getParam("user").name)
    };
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
}

export default DetailsScreen;
