import React from "react";

type AcceptedProps = {
  sessionToken: string;
  userId: number;
  updateUserId: (newUserId: number) => void;
};

type UserDataState = {};

export class AdminUserTable extends React.Component<
  AcceptedProps,
  UserDataState
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      userData: [],
      results: {
        id: 0,
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        admin: "false",
      },
    };
  }

  render() {
    return (
      <div id="adminDiv">
        <div id="adminContainer">
          <div>
            <div style={{ width: "50%", display: "block" }}>
              <h5> Admin user functionality: </h5>
              <ul>
                <li>Pull a list of all registered users</li>
                <li>Edit & delete users</li>
                <li>Add, edit & delete Posts</li>
                <li>Add, edit & delete Comments</li>
              </ul>
            </div>
          </div>
        </div>
        {console.log("Admin Footer")}
      </div>
    );
  }
}
