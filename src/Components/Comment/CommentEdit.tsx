import React from "react";
import APIURL from "../../helpers/environment";

type AcceptedProps = {
  sessionToken: string;
  fetchComments: () => void;
  updateOff: () => void;
  commentToUpdate: any;
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
  handleUpdate = (posts: any) => {
    fetch(`${APIURL}/comment/update/${posts.id}`, {
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
        console.log("Works");
      })

      .catch((err) => console.log(err));
  };
  handleeditCommentInput = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ editComment: e.currentTarget.value });
  };

  render() {
    return (
      <div>
        <h1>Edit Comment </h1>
        <form onSubmit={this.handleUpdate}>
          <input
            placeholder="editComment"
            value={this.state.editComment}
            onChange={(e) => this.setState({ editComment: e.target.value })}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
