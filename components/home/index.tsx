import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Routes } from "../../constants";
import { images } from "../../res";
import { ISingleUser, IUserState, PropsWithNavigation } from "../../types/all";

type Props = PropsWithNavigation<{}>;

const HomeScreen: React.FC<Props> = (props: Props) => {
  const [users, setUsers] = useState<IUserState[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setUsers([
      {
        name: "Rishav",
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
    ]);
  }, []);

  useEffect(() => {
    if (users?.length === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [users]);

  if (isLoading) {
    return (
      <ActivityIndicator
        size="large"
        style={{
          marginTop: "auto",
          marginBottom: "auto"
        }}
      />
    );
  }

  return (
    <View>
      {users?.map(user => {
        const amount = Math.round(
          user.records.reduce((a, b) => a + b.amount, 0)
        );

        return (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate(Routes.DETAILS, {
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
                <Image
                  source={images.right_arrow}
                  height={20}
                  width={20}
                  style={styles.arrow}
                />
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

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
    height: 50,
    width: 50,
    marginRight: 10,
    marginTop: "auto",
    marginBottom: "auto"
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
    marginTop: "auto",
    marginBottom: "auto"
  }
});
