import React,  {Component, SyntheticEvent} from "react";
import Signup from "./Signup";
import Login from "./Login";

type AcceptedProps = {
    updateToken: (newToken: string) => void;
  };
  
  type UserState = {
    showLogin: boolean;
  };
  
export default class Auth extends Component<AcceptedProps, UserState> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            showLogin: true,
        };
    }
    
    
    render() {
        return (
            <div>
               {/* <Container maxWidth="sm"></Container>    */}
            </div>
        )
    }
    };
            