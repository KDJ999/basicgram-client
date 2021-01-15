import React from "react";
import CommentCreate from "./CommentCreate";
import CommentEdit from "./CommentEdit";
import CommentTable from "./CommentTable";
import APIURL from "../../helpers/environment";
import { Button } from "antd";

type AcceptedProps = {
  sessionToken: string;
  editpostToUpdatePosts: (post: any) => void;
  posts: [];
  PostId: any;
};

type IndexState = {
  Comments: any;
  commentToCreate: any;
  commentToCreateActive: boolean;
  commentToUpdate: any;
  updateActive: boolean;
  ShowTable: boolean;
  id: any;
  isModalVisible: boolean;
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
      isModalVisible: false,
      id: 0,
    };
  }
  fetchComments = () => {
    //get comments by specific post id
    fetch(`${APIURL}/comment/getallcomments/${this.state.id}`, {
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

  getId = (posts: any) => {
    console.log("RAN", posts);
    //trying to set the state of this.state.id = posts.id
    this.setState({ id: posts }, () => console.log(this.state.id));
  };
  showModal = () => {
    this.setState({
      isModalVisible: true,
    });
  };
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.createOn();
          }}
        >
          Create your Comments Here!
        </button>
        {/* <Button
          type="primary"
          onClick={() => {
            this.createOn();
          }}
        >
          Create Comment
        </Button> */}
        {this.state.commentToCreateActive ? (
          <CommentCreate
            // commentToCreate={this.state.commentToCreate}
            fetchComments={this.fetchComments.bind(this)}
            sessionToken={this.props.sessionToken}
            createOff={this.createOff.bind(this)}
            ShowTable={this.ShowTable}
            id={this.props.PostId}
            modal={this.state.isModalVisible}
          />
        ) : (
          <></>
        )}
        {/* {this.state.updateActive ? (
          <CommentEdit
            commentToUpdate={this.state.commentToUpdate}
            updateOff={this.updateOff.bind(this)}
            sessionToken={this.props.sessionToken}
            fetchComments={this.fetchComments.bind(this)}
          />
        ) : (
          <></>
        )} */}
        <CommentTable
          Comments={this.state.Comments}
          editcommentToUpdateComments={this.editcommentToUpdateComments.bind(
            this
          )}
          updateOn={this.updateOn.bind(this)}
          fetchComments={this.fetchComments.bind(this)}
          sessionToken={this.props.sessionToken}
          posts={this.props.posts}
          id={this.state.id}
        />
      </div>
    );
  }
}
