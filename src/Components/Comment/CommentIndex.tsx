import React from "react";
import CommentCreate from "./CommentCreate";
import CommentEdit from "./CommentEdit";
import CommentTable from "./CommentTable";

type AcceptedProps = {
  sessionToken: string;
};

type IndexState = {
  Comments: any;
  commentToCreate: any;
  commentToCreateActive: boolean;
  commentToUpdate: any;
  updateActive: boolean;
  ShowTable: boolean;
};

export default class CommentIndex extends React.Component<
  AcceptedProps,
  IndexState
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      Comments: [],
      commentToCreate: {},
      commentToCreateActive: false,
      commentToUpdate: {},
      updateActive: false,
      ShowTable: false,
    };
  }
  fetchComments = () => {
    //get comments by specific post id
    fetch("http://localhost:4000/comment/getallcomments", {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      },
    })
      .then((res) => res.json())
      .then((commentData) => {
        this.setState({
          Comments: commentData.comments,
        });
        console.log("comments fetch");
      })
      .catch((err) => console.log(err));
  };

  // componentDidMount() {
  //   this.fetchComments();
  // }

  //classes cannot have const keyword unlike workoutClient
  editcommentToCreateComments = (comment: any) => {
    this.setState({
      commentToCreate: comment,
    });
  };
  editcommentToUpdateComments = (comment: React.SyntheticEvent) => {
    this.setState({
      commentToUpdate: comment,
    });
  };

  createOn = () => {
    this.setState({
      commentToCreateActive: true,
    });
  };
  createOff = () => {
    this.setState({
      commentToCreateActive: false,
    });
  };
  updateOn = () => {
    this.setState({
      updateActive: true,
    });
  };

  updateOff = () => {
    this.setState({
      updateActive: false,
    });
  };

  ShowTable = () => {
    this.setState({
      ShowTable: true,
    });
  };

  render() {
    return (
      <div>
        <button onClick={() => this.createOn()}>
          Create your Comments Here!
        </button>
        {this.state.commentToCreateActive ? (
          <CommentCreate
            commentToCreate={this.state.commentToCreate}
            fetchComments={this.fetchComments.bind(this)}
            sessionToken={this.props.sessionToken}
            createOff={this.createOff.bind(this)}
            ShowTable={this.ShowTable}
          />
        ) : (
          <></>
        )}
        {this.state.updateActive ? (
          <CommentEdit
            commentToUpdate={this.state.commentToUpdate}
            updateOff={this.updateOff.bind(this)}
            sessionToken={this.props.sessionToken}
            fetchComments={this.fetchComments.bind(this)}
          />
        ) : (
          <></>
        )}
        <CommentTable
          Comments={this.state.Comments}
          editcommentToUpdateComments={this.editcommentToUpdateComments.bind(
            this
          )}
          updateOn={this.updateOn.bind(this)}
          fetchComments={this.fetchComments.bind(this)}
          sessionToken={this.props.sessionToken}
        />
      </div>
    );
  }
}
