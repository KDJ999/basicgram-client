import React, { FormEvent } from "react";
import { render } from "@testing-library/react";
import { integer } from "aws-sdk/clients/frauddetector";
import TextField from "@material-ui/core/TextField";

type AcceptedProps = {
  sessionToken: string;
  commentToCreate: any;
  fetchComments: () => void;
  createOff: () => void;
  ShowTable(): void;
};

type CommentState = {
  comment: string;
};

export default class CommentCreate extends React.Component<
  AcceptedProps,
  CommentState
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      comment: "",
    };
  }

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("please", this.state.comment);
    fetch("http://localhost:4000/comment/createcomment", {
      method: "POST",
      body: JSON.stringify({
        comment: this.state.comment,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          comment: "",
        });
        console.log(data);
        this.props.ShowTable();
        // this.props.fetchComments();
      })
      .catch((err) => console.log("This is where the error is" + err));
  };

  handleCommentInput = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ comment: e.currentTarget.value });
  };

  render() {
    return (
      <div>
        <h1>Create Comment </h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="comment"
            placeholder="comment"
            value={this.state.comment}
            onChange={(e) => this.setState({ comment: e.target.value })}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
