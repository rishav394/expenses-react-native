import React from "react";
import { Text, View } from "react-native";
import { NavigationStackOptions } from "react-navigation-stack";
import { ISingleUser, PropsWithNavigation } from "../../types/all";

type Props = PropsWithNavigation<ISingleUser>;

class DetailsScreen extends React.Component<Props> {
  static navigationOptions = ({
    navigation
  }: Props): NavigationStackOptions => {
    return {
      headerTitle: () => {
        return (
          <View
            style={{
              maxWidth: "90%"
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                textTransform: "capitalize"
              }}
            >
              {navigation.getParam("user").name}
            </Text>
          </View>
        );
      }
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
