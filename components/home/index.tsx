import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Routes } from "../../constants";
import { images } from "../../res";
import { ISingleUser, IUserState, PropsWithNavigation } from "../../types/all";

type State = {
  users?: IUserState[];
};

type Props = PropsWithNavigation<{}>;

class HomeScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setState({
      users: [
        {
          name: "rishabrishabrishabrishabrishabrishabrishabrishab",
          records: [
            {
              amount: 340,
              comment: "on"
            }
          ]
        },
        {
          name: "jatin",
          records: []
        },
        {
          name: "adit",
          records: [
            {
              amount: 340.11,
              comment: "on"
            },
            {
              amount: -1010.9,
              comment: "on"
            },
            {
              amount: 340,
              comment: "on"
            }
          ]
        }
      ]
    });
  }

  render() {
    return (
      <View>
        {this.state.users?.map(user => {
          const amount = Math.round(
            user.records.reduce((a, b) => a + b.amount, 0)
          );

          return (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate(Routes.DETAILS, {
                  user: {
                    name: user.name
                  }
                } as ISingleUser);
              }}
              key={user.name}
              style={styles.item}
            >
              <View style={styles.container}>
                <View style={styles.imagNode}>
                  <Image style={styles.avatar} source={images.avatar} />
                  <View style={styles.text}>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.name}
                    >
                      {user.name}
                    </Text>
                    <Text numberOfLines={1} style={styles.amount}>
                      {`$ ${amount}`}
                    </Text>
                  </View>
                </View>
                <View>
                  <Image source={images.right_arrow} style={styles.arrow} />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  item: {
    padding: 20
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  imagNode: {
    display: "flex",
    flexDirection: "row",
    flex: 1
  },
  avatar: {
    height: 35,
    width: 35,
    marginRight: 10
  },
  text: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center"
  },
  name: {
    textTransform: "capitalize"
  },
  amount: {
    color: "grey"
  },
  arrow: {
    height: 20,
    width: 20,
    margin: "auto"
  }
});
