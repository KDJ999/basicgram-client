import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Signup from "./Components/Auth/Signup";
import Login from "./Components/Auth/Login";
import PostIndex from "./Components/Post/PostIndex";
import CommentIndex from "./Components/Comment/CommentIndex";

type State = {
  sessionToken: string;
};

export default class App extends React.Component<{}, State> {
  constructor(props: State) {
    super(props);
    this.state = {
      sessionToken: "",
    };
  }
  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({
        sessionToken: localStorage.getItem("token") as string,
      });
    }
  }
  updateToken = (newToken: string) => {
    localStorage.setItem("token", newToken);
    this.setState({
      sessionToken: newToken,
    });
  };

  clearToken() {
    localStorage.clear();
    this.setState({
      sessionToken: "",
    });
    sessionStorage.clear();
  }

  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/postindex">PostIndex</Link>
            </li>
          </ul>
        </div>
        <hr />
        <Switch>
          <Route exact path="/">
            <Signup updateToken={this.updateToken} />
          </Route>
          <Route exact path="/login">
            <Login updateToken={this.updateToken} />
          </Route>
          <Route exact path="/postindex">
            <PostIndex sessionToken={this.state.sessionToken} />
          </Route>
        </Switch>
      </Router>
    );
  }
}
