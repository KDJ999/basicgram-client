import React from "react";

type Props = {
  sessionToken: string;
  email: string;
  userId: number;
  updateUserId: (newUserId: number) => void;
};

type UserDataState = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  // userData: UserDetails[];
  // results: UserDetails;
};

export default class AdminEditUser extends React.Component<
  Props,
  UserDataState
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      id: 0,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      role: "",
      // userData: [
      //     {
      //         id: 0,
      //         firstName: "",
      //         lastName: "",
      //         username: "",
      //         password: "",
      //         admin: "",
      //     },
      // ],
    };
  }
}
