import { NavigationStackProp } from "react-navigation-stack";

export interface ISingleUser {
  user: IUserState;
}

export type IUserState = {
  name: string;
  records: {
    amount: number;
    comment?: string;
  }[];
};

export interface PropsWithNavigation<T> {
  navigation: NavigationStackProp<any, T>;
}
