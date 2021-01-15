import React from "react";
import APIURL from "../../helpers/environment";

type AcceptedProps = {
  sessionToken: string;
  // fetchComments: () => void;
  updateCommentOff: () => void;
  commentToUpdate: any;
  fetchTheComments(comment: any): void;
};

type CommentEditState = {
  editComment: string;
};

export default class CommentEdit extends React.Component<
  AcceptedProps,
  CommentEditState
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      editComment: this.props.commentToUpdate.comment,
    };
  }

  handleUpdate = (event: any) => {
    fetch(`${APIURL}/comment/update/${this.props.commentToUpdate.id}`, {
      method: "PUT",
      body: JSON.stringify({
        comment: this.state.editComment,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "handleUpdate");
        this.props.fetchTheComments(data);
        this.props.updateCommentOff();
      });
  };
  handleeditCommentInput = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ editComment: e.currentTarget.value });
  };
  // // editcommentToUpdateComments = (comment: React.SyntheticEvent) => {
  // //     this.setState({
  // //       commentToUpdate: comment,
  // //     });
  //   };
  render() {
    return (
      <div>
        {/* <Button
          onClick={() => {
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
        </Button> */}
        <h1>Edit Comment </h1>
        <form onSubmit={this.handleUpdate}>
          <input
            placeholder="editComment"
            value={this.state.editComment}
            onChange={(e) => this.setState({ editComment: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
