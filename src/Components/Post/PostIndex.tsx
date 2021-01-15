import React from "react";
import { createIndexedAccessTypeNode } from "typescript";
import PostCreate from "./PostCreate";
import PostEdit from "./PostEdit";
import PostTable from "./PostTable";
import CreateIndex from "../Comment/CommentIndex";
import APIURL from "../../helpers/environment";

type AcceptedProps = {
  sessionToken: string;
};

type IndexState = {
  Posts: any;
  postToCreate: any;
  postToCreateActive: boolean;
  postToUpdate: any;
  updateActive: boolean;
  ShowTable: boolean;
  Comments: any;
  id: any;
};
export default class PostIndex extends React.Component<
  AcceptedProps,
  IndexState
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      Posts: [],
      postToCreate: {},
      postToCreateActive: false,
      postToUpdate: {},
      updateActive: false,
      ShowTable: false,
      Comments: [],
      id: 0,
    };
  }
  fetchPosts = () => {
    fetch(`${APIURL}/post/getallposts`, {
      method: "GET",
      // body: JSON.stringify({}),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,

        // this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((postData) => {
        this.setState({
          Posts: postData,
        });
        console.log(postData);
      })
      .catch((err) => console.log(err));
  };

  DeletePost = (e: React.FormEvent<HTMLInputElement>) => {
    fetch(`${APIURL}/delete/id`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    }).then(() => this.fetchPosts());
  };

  componentDidMount() {
    this.fetchPosts();
  }

  //classes cannot have const keyword unlike workoutClient
  editpostToCreatePosts = (post: any) => {
    this.setState({
      postToCreate: post,
    });
  };
  editpostToUpdatePosts = (post: any) => {
    this.setState({
      postToUpdate: post,
    });
  };

  createOn = () => {
    this.setState({
      postToCreateActive: true,
    });
  };
  createOff = () => {
    this.setState({
      postToCreateActive: false,
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
        <button onClick={() => this.createOn()}>Create your Post Here!</button>
        {this.state.postToCreateActive ? (
          <PostCreate
            postToCreate={this.state.postToCreate}
            fetchPosts={this.fetchPosts.bind(this)}
            sessionToken={this.props.sessionToken}
            createOff={this.createOff.bind(this)}
            ShowTable={this.ShowTable}
          />
        ) : (
          <></>
        )}
        {/* {this.state.updateActive ? (
          <PostEdit
            postToUpdate={this.state.postToUpdate}
            updateOff={this.updateOff.bind(this)}
            sessionToken={this.props.sessionToken}
            fetchPosts={this.fetchPosts.bind(this)}
          />
        ) : (
          <></>
        )} */}
        {/* {this.state.ShowTable ? ( */}
        <PostTable
          Posts={this.state.Posts}
          editpostToUpdatePosts={this.editpostToUpdatePosts.bind(this)}
          updateOn={this.updateOn.bind(this)}
          fetchPosts={this.fetchPosts.bind(this)}
          sessionToken={this.props.sessionToken}
          Comments={this.state.Comments}
          // updateCommentOn={this.updateCommentOn.bind(this)}
          // editcommentToUpdateComments={this.editcommentToUpdateComments.bind(
          //   this
          // )}
          // fetchComments={this.fetchComments.bind(this)}
          // fetchTheComments={this.fetchTheComments.bind(this)}
        />
        {/* <CreateIndex
          sessionToken={this.props.sessionToken}
          editpostToUpdatePosts={this.editpostToUpdatePosts.bind(this)}
          posts={this.state.Posts}
          // PostId={this.state.PostId}
        /> */}
      </div>
    );
  }
}
