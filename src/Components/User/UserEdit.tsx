import React from "react";

type AcceptedProps = {
  clearUser: () => void;
  sessionToken: string;
};
type UserDataState = {
  editId: number;
  editfirstname: string;
  editlastname: string;
  editemail: string;
  editpassword: string;
  // userData: UserDetails[];
  // results: UserDetails;
};

export default class UserEdit extends React.Component<
  AcceptedProps,
  UserDataState
> {
  constructor(props: AcceptedProps) {
    super(props);
  }
}
