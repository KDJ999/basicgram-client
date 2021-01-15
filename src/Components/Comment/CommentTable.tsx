import React, { FormEvent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import APIURL from "../../helpers/environment";

type AcceptedProps = {
  sessionToken: string;
  Comments: any;
  editcommentToUpdateComments: (comment: any) => void;
  updateOn: () => void;
  fetchComments: () => void;
  id: any;
  posts: any;
};

type DeleteState = {
  Comments: [];
  newData: [];
  updateActive: Boolean;
  commentToUpdate: any;
};
export default class CommentDelete extends React.Component<
  AcceptedProps,
  DeleteState
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      Comments: [],
      newData: [],
      updateActive: false,
      commentToUpdate: {},
      // likes: 0,
    };
  }

  DeleteComment = (comments: any) => {
    fetch(`${APIURL}/comment/delete/`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    }).then(() => this.props.fetchComments());
  };
  fetchComments = () => {
    //get comments by specific post id
    console.log(this.props.id);

    fetch(`${APIURL}/comment/getallcomments/`, {
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

  itemMapper = () => {
    return this.props.posts.map((item: any, index: any) => {
      console.log("MAP DATA", item);
      item.comments.map((itemTwo: any) => {
        console.log(itemTwo);
        if (item.id == itemTwo.postId) {
          console.log("OK");
          this.setState(
            {
              newData: itemTwo,
            },
            () => console.log("NEWDATA", this.state.newData)
          );
        } else {
          console.log("NOPE");
        }
      });
    });
  };

  componentDidMount() {
    // this.itemMapper();
    this.fetchComments();
  }

  render() {
    return <>{/* <div>{this.PostMapper()}</div> */}</>;
  }
}
