import React, { FormEvent } from "react";
import APIURL from "../../helpers/environment";

type AcceptedProps = {
  updateToken: (newToken: string) => void;
};

type UserState = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
};

export default class Signup extends React.Component<AcceptedProps, UserState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      role: "",
    };
  }

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    let url = `${APIURL}/user/signup`;

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        //Userstate: this.state
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        password: this.state.password,
        role: this.state.role,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // this.props.updateToken
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <h1>Signup</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="firstname"
            value={this.state.firstname}
            onChange={(e) => this.setState({ firstname: e.target.value })}
          />
          <input
            placeholder="lastname"
            value={this.state.lastname}
            onChange={(e) => this.setState({ lastname: e.target.value })}
          />
          <input
            placeholder="email"
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <input
            placeholder="password"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <input
            placeholder="role"
            value={this.state.role}
            onChange={(e) => this.setState({ role: e.target.value })}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
