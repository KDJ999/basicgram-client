import React, { DetailedHTMLProps, FormEvent } from "react";
import Button from "@material-ui/core/Button";
import { withStyles, createStyles } from "@material-ui/core";
import APIURL from "../../helpers/environment";

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
};

type DeleteState = {
  // Posts: any;
  //image
  // file: string;
  // description: string;
  Comments: [];
};

class PostTable extends React.Component<AcceptedProps, DeleteState> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      Comments: [],
      //   Posts: [],
      // file: "",
      // description: ""
    };
    //console.log(this.props);
  }

  DeletePost = (posts: any) => {
    ///delete/:id
    fetch(`${APIURL}/post/delete/${posts.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    }).then(() => this.props.fetchPosts());
  };

  //comments fetch/set comment state variable
  fetchComments(posts: any) {
    console.log("this Works", posts);
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
        console.log("works", commentData);
        this.setState(
          {
            Comments: commentData,
          },
          () => {
            console.log(this.state.Comments);
          }
        );
      })
      .catch((err) => console.log(err));
  }

  commentDisplay = (Posts: any, classes: any) => {
    console.log(Posts);
    if (Posts.comments) {
      if (Posts.comments.length > 0) {
        Posts.comments.map((comment: any, index: any) => {
          return (
            <div className={classes.comment} key={index}>
              <h3>{comment}</h3>
            </div>
          );
        });
      }
    } else {
      return null;
    }
  };

  PostMapper = (classes: any) => {
    //maps are just foreachs
    console.log(this.props.Posts);
    return this.props.Posts.map((Posts: any, index: number) => {
      console.log("POST DATA", Posts);
      return (
        <tr key={Posts.id}>
          <img className={classes.root} src={Posts.file} alt="Posts"></img>

          <td>{Posts.description}</td>
          <td>{Posts.likes}</td>
          <td>
            <Button
              // color="warning"
              onClick={() => {
                this.props.editpostToUpdatePosts(Posts);
                this.props.updateOn();
              }}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                // this.props.getPostId(Posts.id);
                {
                  this.fetchComments(Posts);
                }
                // this.commentDisplay(Posts.id, classes);
              }}
            >
              Comment
            </Button>
            <Button
              // color="danger"
              onClick={() => {
                this.DeletePost(Posts);
              }}
            >
              Delete
            </Button>
          </td>
          {this.commentDisplay(Posts, classes)}
        </tr>
      );
    });
  };

  // componentDidMount() {
  //   this.fetchComments();
  // }

  render() {
    const { classes } = this.props;
    return (
      <>
        <h3>Posts</h3>

        <div>{this.PostMapper(classes)}</div>
      </>
    );
  }
}
export default withStyles(styles)(PostTable);
