import React, { ChangeEvent, FormEvent } from "react";
import APIURL from "../../helpers/environment";

type AcceptedProps = {
  updateToken: (newToken: string) => void;
};

type UserState = {
  email: string;
  password: string;
};

export default class Login extends React.Component<AcceptedProps, UserState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    let url = `${APIURL}/user/login`;

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        //Userstate: this.state
        email: this.state.email,
        password: this.state.password,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.props.updateToken(data.token);
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
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
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
