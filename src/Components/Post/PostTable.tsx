import React, { DetailedHTMLProps, FormEvent } from "react";
import Button from "@material-ui/core/Button";
import { withStyles, createStyles } from "@material-ui/core";
import APIURL from "../../helpers/environment";
import CreateIndex from "../Comment/CommentIndex";
import PostEdit from "./PostEdit";
import CommentEdit from "../Comment/CommentEdit";
import PostIndex from "./PostIndex";
import { Card } from "antd";
import { LikeOutlined, DeleteOutlined, EditFilled } from "@ant-design/icons";

const styles = createStyles({
  root: {
    height: "100px",
    width: "100px",
  },
  comment: {
    backgroundColor: "red",
  },
});

type AcceptedProps = {
  Posts: [];
  sessionToken: string;
  editpostToUpdatePosts: (post: any) => void;
  updateOn: () => void;
  fetchPosts: () => void;
  // getPostId: (id: number) => void;
  classes: any;
  Comments: [];
  // updateCommentOn: () => void;
  // editcommentToUpdateComments: (post: any) => void;
  // fetchComments: () => void;
  // fetchTheComments: () => void;
};

type DeleteState = {
  // Posts: any;
  updateActive: boolean;
  postToUpdate: any;
  id: any;
  Comments: [];
  commentToUpdate: any;
  updateCommentActive: boolean;
};

class PostTable extends React.Component<AcceptedProps, DeleteState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      Comments: [],
      id: 0,
      postToUpdate: {},
      updateActive: false,
      commentToUpdate: {},
      updateCommentActive: false,
    };
  }

  DeletePost = (posts: any) => {
    fetch(`${APIURL}/post/delete/${posts.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    }).then(() => this.props.fetchPosts());
  };

  fetchComments(posts: any) {
    //get comments by specific post id
    fetch(`${APIURL}/comment/getallcomments/${posts.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      },
    })
      .then((res) => res.json())
      .then((commentData) => {
        this.setState(
          {
            Comments: commentData,
          },
          () => {}
        );
      })
      .catch((err) => console.log(err));
  }

  DeleteComment = (comments: any) => {
    fetch(`${APIURL}/comment/delete/${comments.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    }).then(() => this.fetchTheComments(comments));
  };
  fetchTheComments = (comments: any) => {
    //get comments by specific post id
    fetch(`${APIURL}/comment/getallcomments/${comments.id}`, {
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
  // Posts.comments.map((comment: any, index: any) => {
  //   console.log("LOOK", comment.comment);
  //   console.log("INDEX", comment.postId, comment.userId);
  //   return (
  //     <div key={comment.postId}>
  //       <h3>{comment.comment}</h3>
  //     </div>
  //   );
  // });
  commentDisplay = (Posts: any) => {
    return Posts.comments.map((comment: any, index: any) => {
      return (
        <>
          {Posts.comments.length > 0 ? (
            <div key={comment.postId}>
              <h3>{comment.comment}</h3>
              <Button
                onClick={() => {
                  console.log("editwasclicked");
                  this.editcommentToUpdateComments(comment);
                  this.updateCommentOn();
                }}
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  this.DeleteComment(comment);
                }}
              >
                Delete
              </Button>
            </div>
          ) : (
            ""
          )}
        </>
      );
    });
  };

  getId = (post: any) => {
    console.log(post);
    post.forEach((element: any) => {
      this.setState({
        id: element.id,
      });
    });
  };
  editpostToUpdatePosts = (post: any) => {
    this.setState({
      postToUpdate: post,
    });
  };
  editcommentToUpdateComments = (comment: React.SyntheticEvent) => {
    this.setState({
      commentToUpdate: comment,
    });
  };

  updateCommentOn = () => {
    this.setState({
      updateCommentActive: true,
    });
  };
  updateCommentOff = () => {
    this.setState({
      updateCommentActive: false,
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

  PostMapper = (classes: any) => {
    //maps are just foreachs
    console.log(this.props.Posts);
    return this.props.Posts.map((Posts: any, index: number) => {
      console.log("POST DATA", Posts);
      return (
        <>
          <tr key={Posts.id}>
            <Card hoverable>
              <img className={classes.root} src={Posts.file} alt="Posts"></img>
            </Card>
            <td>{Posts.description}</td>

            <td>
              {Posts.likes}{" "}
              <span className="icons-list">
                <LikeOutlined />
              </span>{" "}
            </td>
            <td>
              <Button
                // color="warning"
                onClick={() => {
                  this.editpostToUpdatePosts(Posts);
                  this.updateOn();
                }}
              >
                <span>
                  <EditFilled />
                </span>
              </Button>

              {/* <Button
                onClick={() => {
                  {
                    this.fetchComments(Posts);
                  }
                }}
              >
                Comment
              </Button> */}
              <Button
                onClick={() => {
                  this.DeletePost(Posts);
                }}
              >
                <span className="icons-list">
                  <DeleteOutlined />
                </span>
              </Button>
            </td>
            <td>
              <CreateIndex
                sessionToken={this.props.sessionToken}
                editpostToUpdatePosts={this.props.editpostToUpdatePosts}
                posts={this.props.Posts}
                PostId={Posts.id}
              />
            </td>
          </tr>
          {this.commentDisplay(Posts)}
        </>
      );
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <h3>Posts</h3>
        <div>{this.PostMapper(classes)}</div>
        {this.state.updateActive ? (
          <PostEdit
            postToUpdate={this.state.postToUpdate}
            updateOff={this.updateOff}
            sessionToken={this.props.sessionToken}
            fetchPosts={this.props.fetchPosts}
          />
        ) : (
          <></>
        )}
        {/* //comment edit ternary */}
        {this.state.updateCommentActive ? (
          <CommentEdit
            commentToUpdate={this.state.commentToUpdate}
            updateCommentOff={this.updateCommentOff}
            sessionToken={this.props.sessionToken}
            // fetchComments={this.props.fetchComments}
            fetchTheComments={this.fetchTheComments}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}
export default withStyles(styles)(PostTable);
