import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  Alert
} from "react-native";
import { Routes, backendURL } from "../../constants";
import { images } from "../../res";
import { IUserState, PropsWithNavigation } from "../../types/all";

type Props = PropsWithNavigation<{}>;

const HomeScreen: React.FC<Props> = (props: Props) => {
  const [users, setUsers] = useState<IUserState[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchUsers = () => {
    return new Promise<IUserState[]>((resolve, reject) => {
      axios
        .get<IUserState[]>(backendURL)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => reject(err));
    });
  };

  useEffect(() => {
    fetchUsers()
      .then(res => setUsers(res))
      .catch(err => {
        Alert.alert("Something went wrong!", err.message);
      });
  }, []);

  useEffect(() => {
    if (!users || users.length === 0) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [users]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUsers()
      .then(res => {
        setUsers(res);
        setRefreshing(false);
      })
      .catch(() => {
        setRefreshing(false);
        Alert.alert("Unable to refresh");
      });
  };

  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.verticallyCenter} />;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {users?.map(user => {
        const amount = user.records
          .reduce((a, b) => a + b.amount, 0)
          .toFixed(2);

        return (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate(Routes.DETAILS, {
                user
              });
            }}
            key={user.name}
            style={styles.item}
          >
            <View style={styles.container}>
              <View style={styles.imagNode}>
                <Image style={styles.avatar} source={images.avatar} />
                <View style={styles.text}>
                  <Text numberOfLines={1} style={styles.name}>
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
    </ScrollView>
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
  },
  verticallyCenter: {
    marginTop: "auto",
    marginBottom: "auto"
  }
});
