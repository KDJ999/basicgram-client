import React, { FormEvent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import APIURL from "../../helpers/environment";

type AcceptedProps = {
  sessionToken: string;
  Comments: any;
  editcommentToUpdateComments: (comment: any) => void;
  updateOn: () => void;
  fetchComments: () => void;
};

type DeleteState = {};
export default class CommentDelete extends React.Component<AcceptedProps> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      Comments: [],
      // likes: 0,
    };
  }
  fetchComments = () => {
    //get comments by specific post id
    fetch(`${APIURL}/comment/getallcomments`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((commentData) => {
        this.setState({
          Comments: commentData,
        });
      })
      .catch((err) => console.log(err));
  };

  DeleteComment = (event: FormEvent) => {
    fetch(`${APIURL}/comment/delete/id`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    }).then(() => this.props.fetchComments());
  };

  componentDidMount() {
    this.fetchComments();
  }

  render() {
    return (
      <>
        <h3>Comments</h3>

        {/* <div>{this.PostMapper()}</div> */}
      </>
    );
  }
}
