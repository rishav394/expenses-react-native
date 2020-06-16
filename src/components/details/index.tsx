import React from "react";
import { Clipboard, ScrollView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NavigationStackOptions } from "react-navigation-stack";
import { emptyString, rupees } from "../../constants";
import { ISingleUser, PropsWithNavigation } from "../../types/all";
import { capitalize, uuid } from "../../util";

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
    const user = navigation.getParam("user");
    const amount = user.records.reduce((a, b) => a + b.amount, 0).toFixed(2);

    return (
      <ScrollView style={styles.container}>
        {user.records.map(record => {
          return (
            <TouchableOpacity
              key={uuid()}
              activeOpacity={0.7}
              onLongPress={() => {
                Clipboard.setString(String(record.amount));
              }}
            >
              <View style={styles.row}>
                <Text style={styles.comment} numberOfLines={1}>
                  {record.comment || emptyString}
                </Text>
                <Text style={styles.amount}>
                  {rupees + " " + record.amount.toFixed(2)}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          activeOpacity={0.7}
          onLongPress={() => {
            Clipboard.setString(String(amount));
          }}
        >
          <View style={[styles.row, styles.total]}>
            <Text style={styles.amount}>Total</Text>
            <Text style={styles.amount}>{rupees + " " + amount}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

export default DetailsScreen;

const styles = StyleSheet.create({
  row: {
    marginLeft: 20,
    marginRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    display: "flex",
    flexDirection: "row",
    flex: 1
  },
  amount: {
    flex: 1,
    textAlign: "right"
  },
  comment: {
    flex: 2
  },
  total: {
    borderTopColor: "black",
    borderBottomColor: "black",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginBottom: 20
  },
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 10,
    paddingBottom: 50
  }
});
