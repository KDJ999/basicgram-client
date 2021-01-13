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
    // this.state = {
    // editId: 0,
    // editFirstName: "",
    // editLastName: "",
    // editEmail: "",
    // editPassword: "",
    // userData: [],
    // results: {
    //     id: 0,
    //     firstname: "",
    //     lastname: "",
    //     email: "",
    //     password: "",
    //     admin: "",
  }
}

// fetchUser = () => {
//     console.log("Before User Fetch", this.props.sessionToken);
//     if (this.props.sessionToken) {
//         // fetch(`${APIURL}/user/`, {
//             method: "GET",
//             headers: new Headers({
//                 "Content-Type": "application/json",
//                 Authorization: this.props.sessionToken,
//             }),
//         })
//             .then((res) => res.json())
//             .then((results) => {
//                 this.state({ editId: results.id });
//                 this.state({ editFirstName: results.firstName });
//                 this.state({ editLastName: results.lastName });
//                 this.state({ editEmail: results.email });
//                 this.state({ editPassword: results.password });
//             })

//             .catch((err) => console.log(err));
//     }
// };

// handleSubmit = (event: any) => {
//     event.preventDefault();
//     fetch(`${APIURL}/user/`, {
//         method: "PUT",
//         body: JSON.stringify({
//             id: this.state.editId,
//             firstname: this.state.editFirstName,
//             lastname: this.state.editLastName,
//             email: this.state.editEmail,
//             password:this.state.editPassword
//         }),
//         headers: new Headers({
//             "Content-Type": "application/json",
//             Authorization: this.props.sessionToken,
//         }),
//     })
//         .then((response) => response.json())
//         .then((data) => {
//             console.log(data);
//         });
// };
// handleSubmitPassword = (event: any) => {
//     event.preventDefault();

//     fetch(`${APIURL}/user/`, {
//         method: "PUT",
//         body: JSON.stringify({
//             password: this.state.editPassword,
//         }),
//         headers: new Headers({
//             "Content-Type": "application/json",
//             Authorization: this.props.sessionToken,
//         }),
//     })
//         .then((response) => response.json())
//         .then((data) => {
//             console.log(data);
//         });
// };
// handleDelete = (id: number) => {
//     if (this.props.sessionToken) {
//         fetch(`${APIURL}/user/${id}`, {
//             method: "DELETE",
//             headers: new Headers({
//                 "Content-Type": "application/json",
//                 Authorization: this.props.sessionToken,
//             }),
//         })
//             .then((res) => {
//                 this.fetchUser();
//                 this.props.clearUser();
//             })
//             .catch((err) => alert(err));
//     }
// };

// handleFirstNameChange(event: any) {
//     const firstName = event.target.value;
//     this.state({ editFirstName: firstname });
// };
// handleLastNameChange(event: any) {
//     const lastName = event.target.value;
//     this.state({ editLastName: lastname });
// };
// handleUsernameChange(event: any) {
//     const username = event.target.value;
//     this.state({ editEmail: email });
// };

// componentDidMount() {
//     this.fetchUser();
